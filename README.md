# linkedin-profile-crm
# LinkedIn Profile Intelligence 



### Problem
During high-volume networking (placements, sales, recruiting), it's easy to lose the context of WHY you connected with someone. This tool injects a private intelligence layer directly into the LinkedIn UI.

### Features
*   **Persistent Context:** Notes are mapped to unique LinkedIn profile IDs using `chrome.storage`.
*   **Temporal Tracking:** Automatically logs the date of the last interaction for networking follow-ups.
*   **Native-Grade UI:** A sleek, gradient-header sidebar designed to match modern SaaS aesthetics.
*   **Utility Suite:** Integrated "Copy to Clipboard" and "Permanent Deletion" logic.

### Technical Implementation
*   **DOM Injection:** Engineered a polling-based injection script to handle LinkedIn's Single Page Application (SPA) navigation.
*   **Asynchronous Storage:** Utilizes the Chrome Local Storage API for non-blocking data persistence.
*   **UI/UX:** Responsive CSS-in-JS design with hover-state feedback and badge-based status indicators.

### Installation (Developer Instructions)
1. **Clone/Download** this repository.
2. Open **Chrome** and go to `chrome://extensions/`.
3. Toggle **Developer mode** to ON.
4. Click **Load unpacked** and select the folder containing these files.
5. Open any LinkedIn profile and start logging context!
