const form = document.querySelector("form");
const input = document.getElementById("input");
const select = document.getElementById("select");
const qrContainer = document.querySelector(".qr-container");
const generateButton = document.querySelector(".generate-button");

const qr = document.createElement("img");
qr.className = "qr";

const downloadButton = document.createElement("button");
downloadButton.className = "download-button";
downloadButton.textContent = "Download";

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

generateButton.addEventListener("click", () => {
  if (input.value) {
    getQr();
    showQrContainer();
  }
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = qr.src;
  link.download = "qr";
  fetch(qr.src)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url);
    });
});

input.addEventListener("keyup", () => {
  if (qrContainer.classList.contains("visible")) {
    hideQrContainer();
  }
});

select.addEventListener("change", () => {
  if (qrContainer.classList.contains("visible")) {
    getQr();
  }
});

const getQr = () => {
  qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=${select.value}&data=${input.value}`;
  qr.alt = "QR Code";
  downloadButton.href = qr.src;
};

const showQrContainer = () => {
  qr.addEventListener("load", () => {
    qrContainer.classList.remove("hidden");
    qrContainer.classList.add("visible");
    qrContainer.appendChild(qr);
    qrContainer.appendChild(downloadButton);
  });
};

const hideQrContainer = () => {
  qrContainer.classList.remove("visible");
  qrContainer.classList.add("hidden");

  setTimeout(() => {
    qrContainer.innerHTML = "";
  }, 300);
};
