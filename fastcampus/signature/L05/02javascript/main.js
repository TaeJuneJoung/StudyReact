const loadImg = (url, callback) => {
  const imgEl = document.createElement("img");
  imgEl.src = url;
  imgEl.addEventListener("load", () => {
    setTimeout(() => {
      callback(imgEl);
    }, 1000);
  });
};

const $containerEl = document.querySelector(".container");
const url = "https://www.gstatic.com/webp/gallery/4.jpg";
loadImg(url, (imgEl) => {
  $containerEl.innerHTML = "";
  $containerEl.append(imgEl);
});
