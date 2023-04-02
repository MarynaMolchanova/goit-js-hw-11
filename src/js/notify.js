import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class NotifyMessage {
  success(count) {
    Notify.success(`Hooray! We found ${count} images.`);
  }

  failure() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
