const body = document.body;

function applyTheme(theme) {
	if (theme === "dark") {
		body.classList.add("dark");
	} else {
		body.classList.remove("dark");
	}
	localStorage.setItem("theme", theme);
}

function initThemeToggle() {
	const btn = document.getElementById("theme-toggle");
	if (!btn) return;

	btn.addEventListener("click", () => {
		const current = body.classList.contains("dark") ? "dark" : "light";
		applyTheme(current === "dark" ? "light" : "dark");
	});
}

(function () {
	const saved = localStorage.getItem("theme");
	if (saved) {
		applyTheme(saved);
	} else {
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		applyTheme(prefersDark ? "dark" : "light");
	}
})();
