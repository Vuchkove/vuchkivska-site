const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTtJN0stiz0KwoBPSPyYUl1Hil1Hf9Ha3-8pMGZvOm5cVEd4QHpbCeln31zI6XtZyfiZqhkhNyyEUVR/pub?gid=0&single=true&output=csv";

fetch(SHEET_URL)
	.then((res) => res.text())
	.then((csv) => {
		const lines = csv.trim().split("\n").slice(1);
		const container = document.getElementById("documents");

		lines.forEach((line) => {
			if (!line.trim()) return;

			const [id, name, title, meta] = line.split(",");

			const link = `https://drive.google.com/file/d/${id}/view`;

			const card = document.createElement("a");
			card.className = "document-card";
			card.href = link;
			card.target = "_blank";

			card.innerHTML = `
				<div class="doc-title">${title}</div>
				<div class="doc-meta">${meta}</div>
			`;

			container.appendChild(card);
		});
	});
