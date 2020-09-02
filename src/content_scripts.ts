'use strict';

function addLink() {
  const artworks = Array.from(document.querySelectorAll('.gtm-search-box-popular-artwork'));

  for (const art of artworks) {

    const a = art.parentElement;
    if (!a || !a.parentElement) {
      continue;
    }

    const tags = a.parentElement;

    const img = art.querySelector('img');

    if (img !== null) {
      // ID を抽出
      const fields = img.src.split('/');
      const id = fields[fields.length - 1].split('_')[0];

      // リンクがすでにあれば処理しない
      if (tags.querySelector(`[data-testid="direct-link-${id}"]`) !== null) {
        continue;
      }

      // リンクを埋め込む
      const link = document.createElement('a');
      link.href = `https://www.pixiv.net/artworks/${id}`;
      link.innerText = "👉";
      link.setAttribute('data-testid', `direct-link-${id}`);

      const altDiv = document.createElement('div');

      tags.removeChild(a);
      altDiv.appendChild(a);
      altDiv.appendChild(link);
      tags.appendChild(altDiv);
    }
  }
}

const observer = new MutationObserver(addLink);
observer.observe(document.body, {childList: true, subtree: true});