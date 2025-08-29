import { domToPng } from "modern-screenshot";

export const downloadImage = async (title: string) => {
  const orig = document.getElementById("checkerboard")!;
  const clone = orig.cloneNode(true) as HTMLElement;
  clone.id = "copy";
  clone.style.transform = "unset";
  document.body.appendChild(clone);
  await domToPng(clone, {
    scale: 2,
    fetch: {
      requestInit: {
        cache: "no-cache",
        mode: "cors",
      },
      bypassingCache: true,
    },
  })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${!!title ? title : "untitled"}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.error(err))
    .finally(() => document.getElementById("copy")!.remove());
};
