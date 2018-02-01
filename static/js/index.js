(() => {
  const elems = {
    url: document.getElementById('url'),
    splitareas: [].slice.apply(document.querySelectorAll('textarea')),
  };

  const submitUrl = (e) => {
    e.preventDefault();
    if ('ga' in window) window.ga('send', 'event', 'lyrics', 'submit', elems.url.value);
    fetch(`api/grab?url=${encodeURIComponent(elems.url.value)}`)
      .then(res => res.json())
      .then(({ title, artist, lyrics }) => {
        console.log(title, artist);
        populateTextboxes(lyrics);
      });
  };

  const populateTextboxes = (text) => split(text).forEach((half, i) => elems.splitareas[i].value = half);

  const split = (s) => {
    const ps = s.split('\n\n');
    const half = Math.ceil(ps.length / 2);
    return [
      ps.slice(0, half).join('\n\n'),
      ps.slice(half).join('\n\n'),
    ];
  };

  document.querySelector('form').addEventListener('submit', submitUrl);
})();
