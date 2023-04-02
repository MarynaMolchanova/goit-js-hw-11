export function renderGalleryCard(items) {
  return items.hits
    .map(item => {
      return `<div class="photo-card" data-aos="fade-up">
                <div class="photo">
                  <a href="${item.largeImageURL}">
                    <img
                      class="gallery__image"
                      src="${item.webformatURL}"
                      alt="${item.tags}"
                      loading="lazy"
                    />
                  </a>
                </div>
                <div class="info">
                  <p class="info-item"><b>Likes</b> ${item.likes}</p>
                  <p class="info-item"><b>Views</b> ${item.views}</p>
                  <p class="info-item"><b>Comments</b> ${item.comments}</p>
                  <p class="info-item"><b>Downloads</b> ${item.downloads}</p>
                </div>
              </div>`;
    })
    .join('');
}
