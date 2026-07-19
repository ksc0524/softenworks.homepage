(() => {
  'use strict';

  const container = document.querySelector('[data-markdown]');
  if (!container) return;

  const count = document.querySelector('[data-release-count]');
  const markdownUrl = new URL(container.dataset.markdown, document.baseURI);

  const escapeHtml = value => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const safeUrl = (value, type = 'link') => {
    try {
      const url = new URL(value, markdownUrl);
      const allowed = type === 'image'
        ? ['http:', 'https:', 'file:']
        : ['http:', 'https:', 'mailto:', 'file:'];

      if (!allowed.includes(url.protocol)) return '#';
      if (url.protocol === 'file:' && window.location.protocol !== 'file:') return '#';
      return url.href;
    } catch {
      return '#';
    }
  };

  const renderInline = source => {
    const tokens = [];
    const stash = html => {
      const token = `\uE000${tokens.length}\uE001`;
      tokens.push(html);
      return token;
    };

    let value = String(source);

    value = value.replace(/`([^`\n]+)`/g, (_, code) =>
      stash(`<code>${escapeHtml(code)}</code>`));

    value = value.replace(/\[([^\]\n]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
      (_, label, href, title) => {
        const safeHref = escapeHtml(safeUrl(href));
        const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
        return stash(`<a href="${safeHref}"${titleAttribute}>${escapeHtml(label)}</a>`);
      });

    value = escapeHtml(value)
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

    return value.replace(/\uE000(\d+)\uE001/g, (_, index) => tokens[Number(index)]);
  };

  const isBlockStart = line =>
    /^(#{3,4})\s+/.test(line) ||
    /^\*\*\s*[^*]+?\s*\*\*$/.test(line) ||
    /^>\s?/.test(line) ||
    /^[ \t]*(?:[-*]|\d+\.)\s+/.test(line) ||
    /^!\[[^\]]*\]\(/.test(line) ||
    /^-{3,}$/.test(line.trim());

  const parseListItem = source => {
    const match = String(source).match(/^([ \t]*)([-*]|\d+\.)\s+(.+)$/);
    if (!match) return null;

    const indent = Array.from(match[1]).reduce((width, character) =>
      width + (character === '\t' ? 4 : 1), 0);

    return {
      indent,
      ordered: /^\d+\.$/.test(match[2]),
      text: match[3]
    };
  };

  const renderList = (lines, startIndex, baseIndent) => {
    const first = parseListItem(lines[startIndex]);
    if (!first) return { html: '', nextIndex: startIndex };

    const ordered = first.ordered;
    const tag = ordered ? 'ol' : 'ul';
    const items = [];
    let index = startIndex;

    while (index < lines.length) {
      const item = parseListItem(lines[index]);
      if (!item || item.indent !== baseIndent || item.ordered !== ordered) break;

      index += 1;
      let children = '';

      while (index < lines.length) {
        const child = parseListItem(lines[index]);
        if (!child || child.indent <= baseIndent) break;

        const nested = renderList(lines, index, child.indent);
        children += nested.html;
        index = nested.nextIndex;
      }

      items.push(`<li><span>${renderInline(item.text)}</span>${children}</li>`);
    }

    return {
      html: `<${tag}>${items.join('')}</${tag}>`,
      nextIndex: index
    };
  };

  const renderBlocks = lines => {
    const output = [];
    let index = 0;

    while (index < lines.length) {
      const line = lines[index].trim();

      if (!line) {
        index += 1;
        continue;
      }

      const heading = line.match(/^(#{3,4})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        const label = escapeHtml(heading[2]);
        output.push(`<h${level}><span aria-hidden="true"></span>${label}</h${level}>`);
        index += 1;
        continue;
      }

      const standaloneBold = line.match(/^\*\*\s*([^*]+?)\s*\*\*$/);
      if (standaloneBold) {
        output.push(`<h3><span aria-hidden="true"></span>${escapeHtml(standaloneBold[1])}</h3>`);
        index += 1;
        continue;
      }

      if (/^>\s?/.test(line)) {
        const quote = [];
        while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
          quote.push(lines[index].trim().replace(/^>\s?/, ''));
          index += 1;
        }
        output.push(`<blockquote>${renderInline(quote.join(' '))}</blockquote>`);
        continue;
      }

      const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
      if (image) {
        const alt = escapeHtml(image[1]);
        const src = escapeHtml(safeUrl(image[2], 'image'));
        const caption = image[3] ? `<figcaption>${escapeHtml(image[3])}</figcaption>` : '';
        output.push(`<figure class="release-image"><img src="${src}" alt="${alt}" loading="lazy" decoding="async">${caption}</figure>`);
        index += 1;
        continue;
      }

      const listItem = parseListItem(lines[index]);
      if (listItem) {
        const list = renderList(lines, index, listItem.indent);
        output.push(list.html);
        index = list.nextIndex;
        continue;
      }

      if (/^-{3,}$/.test(line)) {
        output.push('<hr>');
        index += 1;
        continue;
      }

      const paragraph = [line];
      index += 1;
      while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
        paragraph.push(lines[index].trim());
        index += 1;
      }
      output.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
    }

    return output.join('');
  };

  const parseReleases = markdown => {
    const releases = [];
    const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
    let release = null;

    lines.forEach(line => {
      const title = line.match(/^##\s+(.+)$/);
      if (title) {
        if (release) releases.push(release);
        release = { title: title[1].trim(), lines: [] };
        return;
      }
      if (release) release.lines.push(line);
    });

    if (release) releases.push(release);
    return releases;
  };

  const renderRelease = (release, index) => {
    const tagLine = release.lines.findIndex(line =>
      /^(?:\s*`[^`]+`\s*)+$/.test(line));
    const tags = tagLine >= 0
      ? Array.from(release.lines[tagLine].matchAll(/`([^`]+)`/g), match => match[1])
      : [];
    const body = release.lines.filter((_, lineIndex) => lineIndex !== tagLine);
    const tagHtml = tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
    const latest = index === 0 ? '<span class="release-latest">Latest</span>' : '';

    return `
      <details class="release-entry"${index === 0 ? ' open' : ''}>
        <summary>
          <span class="release-order" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <span class="release-summary">
            <span class="release-title-line">${latest}<strong>${escapeHtml(release.title)}</strong></span>
            <span class="release-tags">${tagHtml}</span>
          </span>
          <span class="release-toggle" aria-hidden="true"></span>
        </summary>
        <div class="release-body">${renderBlocks(body)}</div>
      </details>`;
  };

  const showError = () => {
    container.classList.remove('is-loading');
    container.setAttribute('aria-busy', 'false');
    container.innerHTML = `
      <div class="release-error" role="status">
        <strong>릴리즈 노트를 불러오지 못했습니다.</strong>
        <span>잠시 후 다시 시도하거나 Markdown 원문을 확인해 주세요.</span>
        <a href="${escapeHtml(markdownUrl.href)}">Markdown 원문 열기</a>
      </div>`;
    if (count) count.textContent = '불러오기 실패';
  };

  fetch(markdownUrl)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then(markdown => {
      const releases = parseReleases(markdown);
      if (!releases.length) throw new Error('No release entries');

      container.innerHTML = releases.map(renderRelease).join('');
      container.classList.remove('is-loading');
      container.setAttribute('aria-busy', 'false');
      if (count) count.textContent = `${releases.length} Releases`;

      container.querySelectorAll('.release-entry').forEach(entry => {
        entry.addEventListener('toggle', () => {
          if (!entry.open) return;
          entry.classList.remove('is-opening');
          window.requestAnimationFrame(() => entry.classList.add('is-opening'));
        });
      });
    })
    .catch(showError);
})();
