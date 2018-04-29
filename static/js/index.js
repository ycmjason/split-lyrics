(() => {
  const elems = {
    url: document.getElementById('url'),
    splitareas: [].slice.apply(document.querySelectorAll('textarea')),
  };

  const populateTextboxes = (text) => split(text).forEach((half, i) => elems.splitareas[i].value = half);

  const submitUrl = (url) => {
    const query = `?url=${encodeURIComponent(url)}`;
    window.history.pushState({}, '', query);

    fetch(`api/grab${query}`)
      .then(res => res.json())
      .then(({ title, artist, lyrics }) => {
        // tracking
        if ('ga' in window) {
          window.ga('send', 'event', 'url', 'submit', url);
          window.ga('send', 'event', 'title', 'submit', title);
          window.ga('send', 'event', 'artist', 'submit', artist);
        }

        populateTextboxes(lyrics);
      });
  };

  const split = (s) => {
    const ps = s.split('\n\n');
    const half = Math.ceil(ps.length / 2);
    return [
      ps.slice(0, half).join('\n\n'),
      ps.slice(half).join('\n\n'),
    ];
  };

  const url = new URL(window.location.href).searchParams.get('url');
  if (url) {
    elems.url.value = url;
    submitUrl(url);
  }

  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    submitUrl(elems.url.value);
  });

})();
