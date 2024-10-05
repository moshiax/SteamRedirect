const autoRedirectCheckbox = document.getElementById('autoRedirect');

chrome.storage.sync.get('autoRedirectEnabled', (data) => {
  autoRedirectCheckbox.checked = data.autoRedirectEnabled ?? true; 
});

autoRedirectCheckbox.addEventListener('change', () => {
  chrome.storage.sync.set({ autoRedirectEnabled: autoRedirectCheckbox.checked });
});
