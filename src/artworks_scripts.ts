'use strict';

const observer = new MutationObserver(addModeButton);

function addModeButton() {
    // いいね、ブックマークなどのボタンのコンテナを取得する
    const section = document.querySelector('.sc-181ts2x-0.jPZrYy');

    if (!section) {
        return;
    }

    if (document.querySelector(`[data-testid="grayscale-button"]`)) {
        return;
    }

    // ボタン埋め込み
    const button = document.createElement('button');
    button.innerText = 'グレースケール';
    button.setAttribute('data-testid', `grayscale-button`);
    button.onclick = onGrayScaleButtonClick;

    section.appendChild(button);

    observer.disconnect();
}

/**
 * グレースケールボタンが押されたときの処理
 * @param evt 
 */
async function onGrayScaleButtonClick(evt: Event) {
    const image = document.createElement('img');
    image.crossOrigin = "Anonymous";

    try {
        const source = <HTMLImageElement>document.querySelector('figure.sc-1yvhotl-3.jFNHIP img');
        const a = <HTMLAnchorElement>source.parentElement;
        const response = await fetch(a.href, { mode: 'no-cors' });

        // blob のサイズが 0 なので何かが間違っている。
        const blob = await response.blob();
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        image.src = url;
    } catch (error) {
        console.log(error);    
    }

    /*
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    ctx.drawImage(image, 0, 0, image.width, image.height);
    
    // ここでCORS
    let src = ctx.getImageData(0, 0, image.width, image.height);
    let dst = ctx.createImageData(image.width, image.height);

    for (let i = 0; i < src.data.length; i += 4) {
        let y = 0.2126 * src.data[i] + 0.7152 * src.data[i + 1] + 0.0722 * src.data[i + 2];
        y = parseInt(y.toString(), 10);
        dst.data[i] = y;
        dst.data[i + 1] = y;
        dst.data[i + 2] = y;
        dst.data[i + 3] = src.data[i + 3];
    }
    ctx.putImageData(dst, 0, 0);
    */
    
    document.querySelector('figure.sc-1yvhotl-3.jFNHIP')?.appendChild(image);
}

observer.observe(document.body, {childList: true, subtree: true});