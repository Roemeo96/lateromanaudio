export function initializeProductGallery() {
  const gallery = document.querySelector('[data-product-gallery]');
  if (!gallery) return;

  const stage = gallery.querySelector('.pedal-gallery-stage');
  const thumbnails = gallery.querySelector('.pedal-gallery-thumbnails');
  const initialPhoto = stage.querySelector('img');
  const photoSizes = initialPhoto.sizes.replace(/^auto,\s*/, '');

  // These four photos share the exported -thumb and -720 WebP variants.
  const photo = (src, label) => {
    const stem = src.replace(/\.jpg$/, '');
    return {
      type: 'image', src, label,
      thumbnail: `${stem}-thumb.webp`,
      srcset: `${stem}-720.webp 720w, ${src} 1200w`,
    };
  };
  // Additional images can provide { type: 'image', src, label, thumbnail?, srcset? }.
  // Videos use { type: 'video', src, label, thumbnail }.
  const media = [
    photo(initialPhoto.getAttribute('src'), initialPhoto.alt),
    photo('/images/weltgeist-top.jpg', gallery.dataset.topLabel),
    photo('/images/weltgeist-front.jpg', gallery.dataset.frontLabel),
    photo('/images/weltgeist-low-angle.jpg', gallery.dataset.lowAngleLabel),
  ];

  let selected = 0;
  const buttons = media.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pedal-gallery-thumbnail';
    button.setAttribute('aria-label', item.label);
    button.setAttribute('aria-pressed', String(index === selected));
    button.classList.toggle('pedal-gallery-thumbnail--video', item.type === 'video');

    const preview = document.createElement('img');
    preview.src = item.thumbnail ?? item.src;
    preview.alt = '';
    preview.loading = 'lazy';
    button.append(preview);
    button.addEventListener('click', () => select(index));
    return button;
  });

  function select(index) {
    if (index === selected) return;
    const item = media[index];
    const display = item.type === 'video' ? document.createElement('video') : new Image();
    display.className = 'pedal-showcase-image';
    if (item.type === 'video') {
      display.controls = true;
      display.playsInline = true;
      display.preload = 'metadata';
      display.poster = item.thumbnail;
      display.setAttribute('aria-label', item.label);
    } else {
      display.alt = item.label;
      if (item.srcset) {
        display.sizes = photoSizes;
        display.srcset = item.srcset;
      }
    }
    display.src = item.src;

    stage.querySelector('video')?.pause();
    stage.replaceChildren(display);
    buttons[selected].setAttribute('aria-pressed', 'false');
    buttons[index].setAttribute('aria-pressed', 'true');
    selected = index;
  }

  thumbnails.append(...buttons);
  thumbnails.hidden = false;
}
