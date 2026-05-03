function injectProfessionalCRM() {
	if (document.getElementById("linkedin-crm-pro")) return;

	const sidebar = document.createElement("div");
	sidebar.id = "linkedin-crm-pro";

	sidebar.style.cssText = `
        position: fixed; top: 85px; right: 25px; width: 330px;
        background: #ffffff; border-radius: 14px; padding: 0;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        z-index: 9999; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        border: 1px solid #e5e7eb; overflow: hidden;
        transition: all 0.3s ease;
    `;

	sidebar.innerHTML = `
        <div style="background: linear-gradient(135deg, #0a66c2 0%, #004182 100%); padding: 18px 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; text-transform: uppercase;">Profile Context</span>
            </div>
            <span id="crm-timestamp" style="font-size: 10px; color: rgba(255,255,255,0.8); font-weight: 500; background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 20px;">Live</span>
        </div>
        
        <div style="padding: 24px; background: #f9fafb;">
            <div style="background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; padding: 2px; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);">
                <textarea id="crm-input" style="width: 100%; height: 160px; border: none; background: transparent; border-radius: 8px; padding: 12px; font-size: 14px; color: #1f2937; outline: none; resize: none; box-sizing: border-box; line-height: 1.6; font-family: inherit;" placeholder="Start typing context about this connection..."></textarea>
            </div>
            
            <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <button id="crm-save" style="background: #0a66c2; color: #ffffff; border: none; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.1s, background 0.2s; box-shadow: 0 4px 6px -1px rgba(10, 102, 194, 0.3);">Save Entry</button>
                <button id="crm-copy" style="background: #ffffff; color: #4b5563; border: 1px solid #d1d5db; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s;">Copy</button>
                
                <button id="crm-delete" style="grid-column: span 2; background: #e11d48; color: #fff1f2; border: 1.5px solid #fecdd3; padding: 10px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; margin-top: 4px; transition: all 0.2s;">Discard Notes</button>
                

            </div>

            <div id="crm-status-box" style="height: 20px; margin-top: 15px; text-align: center;">
                <span id="crm-status" style="font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 12px;"></span>
            </div>
        </div>
    `;

	document.body.appendChild(sidebar);

	const saveBtn = document.getElementById("crm-save");
	saveBtn.onmouseover = () => (saveBtn.style.background = "#004182");
	saveBtn.onmouseout = () => (saveBtn.style.background = "#0a66c2");
	saveBtn.onmousedown = () => (saveBtn.style.transform = "scale(0.96)");
	saveBtn.onmouseup = () => (saveBtn.style.transform = "scale(1)");

	const copyBtn = document.getElementById("crm-copy");
	copyBtn.onmouseover = () => {
		copyBtn.style.background = "#f3f4f6";
		copyBtn.style.borderColor = "#9ca3af";
	};
	copyBtn.onmouseout = () => {
		copyBtn.style.background = "#ffffff";
		copyBtn.style.borderColor = "#d1d5db";
	};

	const profileId = window.location.pathname.split("/")[2];
	const input = document.getElementById("crm-input");
	const timestamp = document.getElementById("crm-timestamp");

	chrome.storage.local.get([profileId], (res) => {
		if (res[profileId]) {
			input.value = res[profileId].text || "";
			if (res[profileId].date) {
				timestamp.innerText = res[profileId].date;
			}
		}
	});

	document.getElementById("crm-save").addEventListener("click", () => {
		const now = new Date()
			.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
			.toUpperCase();
		chrome.storage.local.set(
			{ [profileId]: { text: input.value, date: now } },
			() => {
				timestamp.innerText = now;
				const status = document.getElementById("crm-status");
				status.style.color = "#047857";
				status.style.background = "#d1fae5";
				status.innerText = "CONTEXT SYNCED";
				setTimeout(() => {
					status.innerText = "";
					status.style.background = "transparent";
				}, 2500);
			},
		);
	});

	document.getElementById("crm-copy").addEventListener("click", () => {
		navigator.clipboard.writeText(input.value).then(() => {
			const status = document.getElementById("crm-status");
			status.style.color = "#1d4ed8";
			status.style.background = "#dbeafe";
			status.innerText = "COPIED TO CLIPBOARD";
			setTimeout(() => {
				status.innerText = "";
				status.style.background = "transparent";
			}, 2000);
		});
	});

	document.getElementById("crm-delete").addEventListener("click", () => {
		if (confirm("Permanently erase this profile data?")) {
			chrome.storage.local.remove([profileId], () => {
				input.value = "";
				timestamp.innerText = "CLEARED";
				const status = document.getElementById("crm-status");
				status.style.color = "#be123c";
				status.style.background = "#ffe4e6";
				status.innerText = "ENTRY REMOVED";
				setTimeout(() => {
					status.innerText = "";
					status.style.background = "transparent";
				}, 2000);
			});
		}
	});
}

setInterval(() => {
	if (
		window.location.pathname.includes("/in/") &&
		!document.getElementById("linkedin-crm-pro")
	) {
		injectProfessionalCRM();
	}
}, 2000);
