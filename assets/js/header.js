fetch("/partials/header.html")
	.then((res) => res.text())
	.then((html) => {
		document.getElementById("header").innerHTML = html;

		const page = document.body.dataset.page;
		const title = document.body.dataset.title;

		initThemeToggle();

		if (title) {
			document.getElementById("page-title").textContent = title;
		}

		document.querySelectorAll("nav a").forEach((link) => {
			if (link.dataset.page === page) {
				link.classList.add("active");
			}
		});

		initTheme();
	});
