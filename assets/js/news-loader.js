fetch("news.json")
	.then((res) => res.json())
	.then((feed) => {
		// Оскільки сервіс повертає структуру JSON Feed, самі пости лежать в feed.items
		const newsList = feed.items || [];

		// Визначаємо, на якій ми сторінці, щоб знайти правильний контейнер
		const newsContainer = document.getElementById("news-container");
		const latestNewsContainer = document.getElementById("latest-news");

		// Якщо ми на головній сторінці (index.html)
		if (latestNewsContainer) {
			latestNewsContainer.innerHTML = "";
			// Покажемо лише 3 останні новини для головної сторінки
			const latestItems = newsList.slice(0, 3);
			renderNews(latestItems, latestNewsContainer);
		}

		// Якщо ми на сторінці всіх новин (news.html)
		if (newsContainer) {
			newsContainer.innerHTML = "";
			renderNews(newsList, newsContainer);
		}
	})
	.catch((err) => {
		console.error("Помилка завантаження новин:", err);
		const containers = [document.getElementById("news-container"), document.getElementById("latest-news")];
		containers.forEach((container) => {
			if (container) {
				container.innerHTML = "<p>Не вдалося завантажити новини. Спробуйте пізніше.</p>";
			}
		});
	});

// Функція для створення HTML-структури новин
function renderNews(items, container) {
	if (items.length === 0) {
		container.innerHTML = "<p>Наразі новин немає.</p>";
		return;
	}

	items.forEach((item) => {
		const newsItem = document.createElement("div");
		newsItem.className = "news-item";

		// Перевіряємо, чи є ця новина відеороликом (Reel або Video)
		const isVideo = item.url && (item.url.includes("reel") || item.url.includes("video"));

		// Форматування дати
		let formattedDate = "";
		if (item.date_published) {
			const dateObj = new Date(item.date_published);
			formattedDate = dateObj.toLocaleDateString("uk-UA", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
		}

		// Обробка медіа (картинка або обкладинка відео)
		let mediaHTML = "";
		if (item.image) {
			if (isVideo) {
				// Якщо це відео, обгортаємо картинку в посилання і додаємо іконку Play
				mediaHTML = `
					<div class="news-images" style="position: relative; display: inline-block; cursor: pointer;">
						<a href="${item.url}" target="_blank" rel="noopener noreferrer">
							<img src="${item.image}" alt="Обкладинка відео" class="news-img" style="max-width: 100%; height: auto; display: block;" />
							<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: #fff; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">▶</div>
						</a>
					</div>`;
			} else {
				// Якщо це звичайне фото
				mediaHTML = `
					<div class="news-images">
						<img src="${item.image}" alt="Фото новини" class="news-img" style="max-width: 100%; height: auto;" />
					</div>`;
			}
		}

		const displayTitle = item.title && !item.title.startsWith("http") ? item.title.substring(0, 60) + (item.title.length > 60 ? "..." : "") : "Новина з Facebook";

		// Кнопка знизу теж підлаштовується під тип контенту
		const buttonText = isVideo ? "Дивитися відео на Facebook 🎬 →" : "Читати оригінал на Facebook →";

		newsItem.innerHTML = `
			<h3>${displayTitle}</h3>
			<small>${formattedDate}</small>
			<p style="white-space: pre-line;">${item.content_text || ""}</p>
			${mediaHTML}
			<p><a href="${item.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.9em; color: #0066cc; font-weight: bold;">${buttonText}</a></p>
		`;

		container.appendChild(newsItem);
	});
}
