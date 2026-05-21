import { downloadImage } from "./utils";

jest.mock("modern-screenshot", () => ({
  domToPng: jest.fn(),
}));

const { domToPng } = require("modern-screenshot");

describe("downloadImage", () => {
  let mockOrigElement: any;
  let mockCloneElement: any;
  let mockLink: any;
  let mockDomToPng: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDomToPng = domToPng as jest.Mock;

    mockCloneElement = {
      id: "",
      style: { transform: "" },
      remove: jest.fn(),
    };

    mockOrigElement = {
      id: "checkerboard",
      cloneNode: jest.fn().mockReturnValue(mockCloneElement),
    };

    mockLink = {
      download: "",
      href: "",
      click: jest.fn(),
    };

    const mockBody = {
      appendChild: jest.fn(),
    };

    (global.document as any) = {
      getElementById: jest.fn((id: string) => {
        if (id === "checkerboard") return mockOrigElement;
        if (id === "copy") return mockCloneElement;
        return null;
      }),
      createElement: jest.fn((tag: string) => {
        if (tag === "a") return mockLink;
        return {};
      }),
      body: mockBody,
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should clone the checkerboard element and append to body", async () => {
    mockDomToPng.mockResolvedValue("data:image/png;base64,mockdata");

    await downloadImage("test");

    expect(mockOrigElement.cloneNode).toHaveBeenCalledWith(true);
    expect(document.body.appendChild).toHaveBeenCalledWith(mockCloneElement);
  });

  it("should set clone id to 'copy' and transform to 'unset'", async () => {
    mockDomToPng.mockResolvedValue("data:image/png;base64,mockdata");

    await downloadImage("test");

    expect(mockCloneElement.id).toBe("copy");
    expect(mockCloneElement.style.transform).toBe("unset");
  });

  it("should call domToPng with the cloned element and correct options", async () => {
    mockDomToPng.mockResolvedValue("data:image/png;base64,mockdata");

    await downloadImage("test");

    expect(domToPng).toHaveBeenCalledWith(
      mockCloneElement,
      expect.objectContaining({
        scale: 2,
        fetch: expect.objectContaining({
          requestInit: expect.objectContaining({
            cache: "no-cache",
            mode: "cors",
          }),
          bypassingCache: true,
        }),
      })
    );
  });

  it("should create a link with the correct filename when title is provided", async () => {
    mockDomToPng.mockResolvedValue("data:image/png;base64,mockdata");

    await downloadImage("my-image");

    expect(mockLink.download).toBe("my-image.png");
  });

  it("should use 'untitled' as filename when title is empty", async () => {
    mockDomToPng.mockResolvedValue("data:image/png;base64,mockdata");

    await downloadImage("");

    expect(mockLink.download).toBe("untitled.png");
  });

  it("should set the link href to the dataUrl from domToPng", async () => {
    const mockDataUrl = "data:image/png;base64,testdata";
    mockDomToPng.mockResolvedValue(mockDataUrl);

    await downloadImage("test");

    expect(mockLink.href).toBe(mockDataUrl);
  });

  it("should click the link to trigger download", async () => {
    mockDomToPng.mockResolvedValue("data:image/png;base64,mockdata");

    await downloadImage("test");

    expect(mockLink.click).toHaveBeenCalled();
  });

  it("should remove the cloned element after download", async () => {
    mockDomToPng.mockResolvedValue("data:image/png;base64,mockdata");

    await downloadImage("test");

    expect(mockCloneElement.remove).toHaveBeenCalled();
  });

  it("should handle errors from domToPng gracefully", async () => {
    const mockError = new Error("screenshot failed");
    mockDomToPng.mockRejectedValue(mockError);
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    await expect(downloadImage("test")).resolves.not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });

  it("should remove the cloned element even when domToPng fails", async () => {
    mockDomToPng.mockRejectedValue(new Error("fail"));
    jest.spyOn(console, "error").mockImplementation();

    await downloadImage("test");

    expect(mockCloneElement.remove).toHaveBeenCalled();
  });
});
