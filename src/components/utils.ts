import { domToPng } from "modern-screenshot";

export const downloadImage = async (title: string) => {
  await domToPng(document.getElementById("imageContainer")!, { scale: 2 }).then(
    (dataUrl) => {
      const link = document.createElement("a");
      link.download = `${!!title ? title : "untitled"}.png`;
      link.href = dataUrl;
      link.click();
    }
  );
};
