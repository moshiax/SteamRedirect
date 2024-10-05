const actionDelay = 1300;

function getSteamLink() {
  const url = window.location.href;
  if (url.includes("store.steampowered.com/app/")) {
    return `steam://openurl/${url}`;
  }
  return url.replace(/^https?:\/\//, 'steam://openurl/');
}

function createLaunchButton() {
  const button = document.createElement('button');
  button.textContent = 'Open in Steam';
  button.style.position = 'fixed';
  button.style.top = '10px';
  button.style.right = '10px';
  button.style.padding = '15px 30px';
  button.style.backgroundColor = '#1b2838';
  button.style.color = '#fff';
  button.style.border = 'none';
  button.style.borderRadius = '10px';
  button.style.cursor = 'pointer';
  button.style.zIndex = '1000';
  button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  button.style.transition = 'all 0.3s ease';
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#2a475e';
    button.style.transform = 'scale(1.05)';
  });
  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#1b2838';
    button.style.transform = 'scale(1)';
  });

  button.addEventListener('click', () => {
    window.location.href = getSteamLink();
  });

  document.body.appendChild(button);
}

function attemptRedirect() {
  chrome.storage.sync.get('autoRedirectEnabled', (data) => {
    const autoRedirectEnabled = data.autoRedirectEnabled ?? true; 
    if (autoRedirectEnabled) {
      try {
        const steamLink = getSteamLink();
        if (window.location.href.includes("store.steampowered.com/app/")) {
          window.location.href = steamLink;
        }
      } catch (error) {
        console.warn('Automatic redirect failed:', error);
      }
    }
  });
}

setTimeout(() => {
  createLaunchButton(); 
  attemptRedirect();  
}, actionDelay);
