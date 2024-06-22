import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();
//! Form gönderildiği anda api'ye istek at ve gelen cevabı ekrana yazdır.
elements.form.addEventListener("submit", (e) => {
  e.preventDefault(); //! form gönderildiği anda sayfanın yenilemesini engeller.
  const query = e.target[0].value; //! inputun içerisindeki değere ulaştık.

  //! inputa girilen değer boş ise fonksiyonu burda durdur.
  if (!query) {
    alert("Lütfen bir müzik ismi giriniz!");
    return;
  }

  updateTitle(`${query} İçin Sonuçlar`);
  api.searchMusic(query);
});

//! sayfa yüklendiği anda api'ye istek atıp popüler müzikleri getir.
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) => {
  //! müziğin url ini html e aktarma
  elements.audioSource.src = url;
  //! audio elementinin müziği yüklemesini sağladık
  elements.audio.load();
  //! audio elementinin müziği oynatmasını sağlar.
  elements.audio.play();
};

//! Liste de tıklamalarda çalışır.
const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card"); //! parent element yerine kullanırız en yakın ebeveyne götürür.
    renderPlayingInfo(parent.dataset);
    console.log(parent.dataset);
    //! müziği çalar
    playMusic(parent.dataset.url);
  }
};
//! Liste alanındaki tıklamaları izler
document.addEventListener("click", handleClick);

//!Fotoğrafı dönderir
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

//! img etiketine eklediğimiz animate clasını kaldırır
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};

//! müziği çalma ve durdurma olaykarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
