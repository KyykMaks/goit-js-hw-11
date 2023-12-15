import { getPhoto } from './axiosApi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './createMarkup';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
  captionsPosition: 'bottom',
});
let page = 1;
let querry = null;

formEl.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', handleClick);

async function onSubmit(event) {
  event.preventDefault();
  loadMore.classList.add('is-hidden');
  page = 1;
  querry = event.target.elements.searchQuery.value;
  try {
    const {
      data: { total, hits },
    } = await getPhoto(querry, page);
    gallery.innerHTML = '';
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    gallery.innerHTML = createMarkup(hits);

    Notiflix.Notify.success(`Hooray! We found ${total} images`);
    if (total > 40) {
      loadMore.classList.remove('is-hidden');
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  } finally {
    event.target.reset();
    
  }
}

async function handleClick() {
  page += 1;

  try {
    const {
      data: { total, hits, totalHits },
    } = await getPhoto(querry, page);

    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    const maxPage = totalHits;
    maxPage = Math.ceil(totalHits / 40);

    if (maxPage === page) {
      loadMore.classList.add('is-hidden');
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  } 
}
