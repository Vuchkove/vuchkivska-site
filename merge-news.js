const fs = require("fs");

try {
	// 1. Читаємо свіжі новини, які щойно скачав робот
	if (!fs.existsSync("fresh_news.json")) {
		throw new Error("Файл fresh_news.json не знайдено! Робот не зміг скачати новини з Facebook.");
	}

	const freshData = JSON.parse(fs.readFileSync("fresh_news.json", "utf8"));
	const freshItems = freshData.items || [];
	console.log(`Скачано свіжих новин від генератора: ${freshItems.length}`);

	// 2. Читаємо старі новини, які вже були на сайті
	let existingData = { version: "https://jsonfeed.org/version/1.1", items: [] };
	if (fs.existsSync("news.json")) {
		try {
			const fileContent = fs.readFileSync("news.json", "utf8").trim();
			if (fileContent) {
				existingData = JSON.parse(fileContent);
				if (!existingData.items) existingData.items = [];
			}
		} catch (e) {
			console.log("Старий news.json був пошкоджений, створюємо з нуля.");
		}
	}

	// 3. Об'єднуємо списки (нові на початок)
	const combinedItems = [...freshItems, ...existingData.items];

	// 4. Фільтруємо дублікати за унікальним ID
	const uniqueItems = [];
	const seenIds = new Set();

	for (const item of combinedItems) {
		if (item && item.id && !seenIds.has(item.id)) {
			seenIds.add(item.id);
			uniqueItems.push(item);
		}
	}

	// Зберігаємо структуру та записуємо чистий результат назад в news.json
	existingData.items = uniqueItems;
	fs.writeFileSync("news.json", JSON.stringify(existingData, null, 2), "utf8");
	console.log(`Успішно об'єднано! Загальна кількість новин в архіві: ${uniqueItems.length}`);
} catch (error) {
	console.error("❌ Помилка під час обробки новин:", error.message);
	process.exit(1);
}
