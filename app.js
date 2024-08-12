const page1 = `<div class="content" id="page-1">
        <div class="logo">
          <img src="./assets/logo-qr-generator.svg" alt="logo" />
        </div>
        <div class="input">
          <input id="input" type="text" placeholder="Enter an url" />
          <button class="button" id="button">QR code</button>
        </div>
      </div>`;

const page2 = `<div class="content" id="page-2">
        <div class="top">
          <img src="./assets/logo-qr-generator.svg" alt="logo" />
        </div>
        <div class="main">
          <div class="qr-quote-container">
            <div class="qr-quote">
              <div class="bg">
                <div id="qr-code"></div>
              </div>
            </div>
          </div>
          <div class="buttons">
            <a class="download" id="download" download="qrcode.png">
              Download
              <img class="icon" src="./assets/download.svg" alt="download" />
            </a>
            <a class="share" id="share">
              Share
              <img class="icon" src="./assets/link.svg" alt="share" />
            </a>
          </div>
        </div>
      </div>`;

const container = document.getElementById("container");
container.innerHTML = page1;

const input = document.getElementById("input");
const button = document.getElementById("button");

let value = "";

button.addEventListener("click", (event) => {
  value = input.value.trim();
  if (value) {
    container.innerHTML = page2;
    const qrcode = new QRCode(document.getElementById("qr-code"), {
      text: value,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#f2f5f9",
      correctLevel: QRCode.CorrectLevel.H,
    });
    document.getElementById("download").addEventListener("click", downloadQR);
    document.getElementById("share").addEventListener("click", copyToClipboard);
  }
});

function downloadQR() {
  const qrCanvas = document.querySelector("#qr-code canvas");
  const qrImage = qrCanvas.toDataURL("image/png");
  const downloadLink = document.getElementById("download");
  downloadLink.href = qrImage;
}

async function copyToClipboard() {
  await navigator.clipboard.writeText(value);
}
