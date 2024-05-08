import domtoimage from "dom-to-image";

export const downloadImage = async (title: string) => {
  const elem = document.getElementById("imageContainer")!;
  const scale = 4;
  await domtoimage
    .toPng(elem, {
      width: elem.scrollWidth * scale,
      height: elem.scrollHeight * scale,
      style: { transform: `scale(${scale})`, transformOrigin: "top left" },
    })
    .then(function (dataUrl) {
      const img = new Image();
      img.src = dataUrl;
      const link = document.createElement("a");
      link.download = `${!!title ? title : "untitled"}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};
