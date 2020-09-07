'use strict';

function addIdeaLink() {
  const ranks = Array.from(document.querySelectorAll('.link-container.hover-item'));
  if (ranks.length === 0) {
      return;
  }

  for (const a of ranks.map(r => <HTMLAnchorElement>r)) {
    const li = a.parentElement;
    if (!li) {
      continue;
    }

    // ID を抽出
    const fields = a.style.backgroundImage.split('/');
    const id = fields[fields.length - 1].split('_')[0];

    // リンクがすでにあれば処理しない
    if (li.querySelector(`[data-testid="idea-link-${id}"]`) !== null) {
      continue;
    }

    // リンクを埋め込む
    const link = document.createElement('a');
    link.href = `https://www.pixiv.net/artworks/${id}`;
    link.setAttribute('data-testid', `idea-link-${id}`);

    link.style.position = 'absolute';
    link.style.top = (a.offsetHeight - 30) + 'px';
    link.style.width = a.offsetWidth.toString() + 'px';
    link.style.whiteSpace = 'inherit';
    link.style.color = '#ffffff';
    link.innerText = `👉 ${id}`;

    li.appendChild(link);
  }
}

new MutationObserver(addIdeaLink).observe(document.body, {childList: true, subtree: true});