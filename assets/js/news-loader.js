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

		// Форматування дати з "2026-06-17T12:46:59.000Z" у зручний вигляд "17.06.2026"
		let formattedDate = "";
		if (item.date_published) {
			const dateObj = new Date(item.date_published);
			formattedDate = dateObj.toLocaleDateString("uk-UA", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
		}

		// Обробка картинок (беремо головне зображення посту, якщо воно є)
		let imagesHTML = "";
		if (item.image) {
			imagesHTML = `<div class="news-images">
				<img src="${item.image}" alt="Фото новини" class="news-img" style="max-width: 100%; height: auto;" />
			</div>`;
		}

		// Формуємо фінальний HTML для кожної новини
		// Якщо заголовок дублює посилання або занадто довгий, робимо його коротшим або загальним
		const displayTitle = item.title && !item.title.startsWith("http") ? item.title.substring(0, 60) + (item.title.length > 60 ? "..." : "") : "Новина з Facebook";

		newsItem.innerHTML = `
			<h3>${displayTitle}</h3>
			<small>${formattedDate}</small>
			<p style="white-space: pre-line;">${item.content_text || ""}</p>
			${imagesHTML}
			<p><a href="${item.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.9em; color: #0066cc;">Читати оригінал на Facebook →</a></p>
		`;

		container.appendChild(newsItem);
	});
}
