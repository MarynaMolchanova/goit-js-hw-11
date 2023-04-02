import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class NotifyMessage {
  success(count) {
    Notify.success(`Hooray! We found ${count} images.`);
  }
  info() {
    Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
  }
  failure() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
