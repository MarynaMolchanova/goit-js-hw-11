import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import throttle from 'lodash.throttle';

import { SearchApiService } from './fetch';
import { renderGalleryCard } from './cardTemplate';
import { NotifyMessage } from './notify';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  photoCard: document.querySelector('.photo-card'),
  sentinel: document.querySelector('#sentinel'),
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchApiService = new SearchApiService();
const notify = new NotifyMessage();
const THROTTLE_DELAY = 300;

refs.form.addEventListener('submit', onSubmitForm);
window.addEventListener('scroll', throttle(checkPosition, THROTTLE_DELAY));

AOS.init();

async function onSubmitForm(event) {
  try {
    event.preventDefault();
    refs.gallery.innerHTML = '';
    searchApiService.query = event.currentTarget.searchQuery.value.trim();
    searchApiService.totalHits = 0;
    if (!searchApiService.query) {
      return;
    }
    searchApiService.resetPage();
    const fetch = await searchApiService.fetchSearchQuery();
    response(fetch);
  } catch (error) {
    notify.failure();
  }
}

function response(response) {
  if (searchApiService.page - 1 === 1 && response.totalHits !== 0) {
    notify.success(response.totalHits);
  }
  if (response.totalHits === 0) {
    notify.failure();
  } else if (response.hits.length === 0) {
    notify.info();
    return;
  } else if (response.totalHits <= searchApiService.par_page) {
    createGalleryCardList(response);
    notify.info();
  } else {
    createGalleryCardList(response);
    refs.sentinel.style.display = 'block';
  }
}
refs.sentinel.style.display = 'block';

function createGalleryCardList(items) {
  const galleryList = renderGalleryCard(items);
  refs.gallery.insertAdjacentHTML('beforeend', galleryList);
  gallery.refresh();
}

async function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;

  //   if (position >= threshold) {
  //     await searchApiService
  //       .fetchSearchQuery()
  //       .then(response)
  //       .catch(notify.info());
  //   }
  // }

  let obj;
  try {
    if (position >= threshold) {
      obj = await searchApiService.fetchSearchQuery();
      response(obj);
      // console.log(obj);
    }
  } catch (error) {
    notify.info();
  }
}
