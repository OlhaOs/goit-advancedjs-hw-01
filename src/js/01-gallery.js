import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
renderMarkup();

gallery.addEventListener('click', handleClick);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'bottom',
  fadeSpeed: 500,
  animationSlide: true,
  widthRatio: 1,
});

function handleClick(e) {
  e.preventDefault();
  const clickedImg = e.target.closest('.gallery__item');

  if (!clickedImg) {
    return;
  }
  const index = galleryItems.findIndex(
    item => item.preview === clickedImg.querySelector('img').src
  );
  lightbox.open(index);
}

function createMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href=${original}>
                <img class="gallery__image" src=${preview} alt=${description}/>
            </a>
        </li>
`
    )
    .join('');
}

function renderMarkup() {
  gallery.insertAdjacentHTML('afterbegin', createMarkup(galleryItems));
}
