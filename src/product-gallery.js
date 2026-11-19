export function initializeProductGallery() {
  const gallery = document.querySelector('[data-product-gallery]');
  if (!gallery) return;

  const stage = gallery.querySelector('.pedal-gallery-stage');
  const thumbnails = gallery.querySelector('.pedal-gallery-thumbnails');
  const initialPhoto = stage.querySelector('img');

  // Additional images use { type: 'image', src, label, thumbnail? }.
  // Videos use { type: 'video', src, label, thumbnail }.
  const media = [
    { type: 'image', src: initialPhoto.getAttribute('src'), label: initialPhoto.alt },
    { type: 'image', src: '/images/weltgeist-top.jpg', label: gallery.dataset.topLabel },
    { type: 'image', src: '/images/weltgeist-front.jpg', label: gallery.dataset.frontLabel },
    { type: 'image', src: '/images/weltgeist-low-angle.jpg', label: gallery.dataset.lowAngleLabel },
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
    display.src = item.src;
    if (item.type === 'video') {
      display.controls = true;
      display.playsInline = true;
      display.preload = 'metadata';
      display.poster = item.thumbnail;
      display.setAttribute('aria-label', item.label);
    } else {
      display.alt = item.label;
    }

    stage.querySelector('video')?.pause();
    stage.replaceChildren(display);
    buttons[selected].setAttribute('aria-pressed', 'false');
    buttons[index].setAttribute('aria-pressed', 'true');
    selected = index;
  }

  thumbnails.append(...buttons);
  thumbnails.hidden = false;
}
