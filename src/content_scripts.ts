'use strict';

function addDirectLink() {
  const topPages = Array.from(document.querySelectorAll('.gtm-toppage-tag-popular-tag-illustration'));
  const searchBoxes = Array.from(document.querySelectorAll('.gtm-search-box-popular-artwork'));

  const artworks = topPages.concat(searchBoxes);

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
      link.setAttribute('data-testid', `direct-link-${id}`);
      link.classList.add('hegAwd');

      link.style.width = a.offsetWidth.toString() + 'px';
      link.style.whiteSpace = 'inherit';

      const match = img.alt.match(/(\S+) (?<title>\S+) \- (\S+)のイラスト/);
      if (match && match.groups) {
        link.innerText = `👉 ${match.groups.title}`;
      } else {
        link.innerText = `👉 ${id}`;
      }

      const altDiv = document.createElement('div');
      if (art.classList.contains('gtm-toppage-tag-popular-tag-illustration')) {
        altDiv.style.marginLeft = '24px';
      }

      tags.removeChild(a);
      altDiv.appendChild(a);
      altDiv.appendChild(link);
      tags.appendChild(altDiv);
    }
  }
}

(new MutationObserver(addDirectLink)).observe(document.body, {childList: true, subtree: true});