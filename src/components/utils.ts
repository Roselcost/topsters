import { domToPng } from "modern-screenshot";

export const downloadImage = async (title: string) => {
  await domToPng(document.getElementById("imageContainer")!, {
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
    .catch((err) => console.error(err));
};
