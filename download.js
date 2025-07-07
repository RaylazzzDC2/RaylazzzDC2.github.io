const downloadBtn = document.querySelector("#install");
const developBtn = document.querySelector("#more");
const selectedOSlogo = document.querySelector("#selected-os-logo");

let callback = new Function();

let selected = "Windows";

if (navigator.appVersion.indexOf("Win") != -1) selected = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) selected = "Mac";

developBtn.addEventListener("click", function () {
    const contextualMenu = document.createElement("div");
    contextualMenu.classList.add("contextualMenu");

    const x = downloadBtn.offsetLeft;
    const y = downloadBtn.offsetTop + 48;

    contextualMenu.style.left = `${x}px`;
    contextualMenu.style.top = `${y}px`;

    document.body.appendChild(contextualMenu);

    const width = contextualMenu.clientWidth;
    const height = contextualMenu.clientHeight;

    const supportedOS = ["Windows", "Mac"];

    supportedOS.forEach((os, index) => {
        const button = document.createElement("button");

        if (os == selected) button.classList.add("os-option-selected");

        const image = document.createElement("img");
        image.src = `./assets/${os.toLowerCase()}-icon.png`;
        button.appendChild(image);

        button.innerHTML += os;
        button.classList.add("os-option");
        button.classList.add("eagle-lake-regular");

        button.onclick = function () {
            [...contextualMenu.childNodes].forEach((osBtn) => {
                osBtn.classList.remove("os-option-selected");
            });

            selected = os;
            selectedOSlogo.src = `./assets/${os.toLowerCase()}-icon.png`;

            button.classList.add("os-option-selected");
        };

        contextualMenu.appendChild(button);
    });

    setTimeout(() => {
        callback = function (mousex, mousey) {
            if (!(mousex >= x && mousex <= x + width && mousey >= y && mousey <= y + height)) {
                contextualMenu.remove();
            }
        };
    }, 100);
});

document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    callback(x, y);
});
