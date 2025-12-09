fetch('news.json')
  .then(res => res.json())
  .then(newsList => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    newsList.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';

      // Картинки
      let imagesHTML = '';
      if (item.images && item.images.length) {
        imagesHTML = '<div class="news-images">';
        item.images.forEach(src => {
          imagesHTML += `<img src="${src}" alt="Фото новини" class="news-img" />`;
        });
        imagesHTML += '</div>';
      }

      // Відео
      let videoHTML = '';
      if (item.video) {
        videoHTML = `<div class="news-video">
                       <iframe src="${item.video}" allowfullscreen></iframe>
                     </div>`;
      }

      newsItem.innerHTML = `
        <h3>${item.title}</h3>
        <small>${item.date}</small>
        <p>${item.content}</p>
        ${imagesHTML}
        ${videoHTML}
      `;

      newsContainer.appendChild(newsItem);
    });
  })
  .catch(err => {
    console.error('Помилка завантаження новин:', err);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>Не вдалося завантажити новини. Спробуйте пізніше.</p>';
  });
