// background.js

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    try {
      const { url } = details;

      if (url.includes("steampowered.com")) {
        console.log(`Detected Steam link: ${url}`);

        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ["redirect.js"],
        });
      }
    } catch (error) {

    }
  },
  {
    url: [{ urlMatches: "steampowered.com" }],
  }
);
