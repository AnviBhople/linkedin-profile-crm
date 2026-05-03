chrome.storage.local.get(null, (data) => {
	const container = document.getElementById("notes-container");
	if (Object.keys(data).length === 0) {
		container.innerHTML = "<p>No notes saved yet.</p>";
		return;
	}
	for (const [id, note] of Object.entries(data)) {
		const div = document.createElement("div");
		div.style.padding = "10px; border-bottom: 1px solid #eee";
		div.innerHTML = `<strong>${id}</strong><br><small>${note}</small>`;
		container.appendChild(div);
	}
});
