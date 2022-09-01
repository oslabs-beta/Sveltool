//BUILD BACKGROUND.JS FILE FOR EXTENSION ACCESS --> https://developer.chrome.com/docs/extensions/mv2/background_pages/
console.log('Running Sveltool background script');

chrome.runtime.onInstalled.addListener(() => {
  //add Sveltool to Chrome Devtools context menu
  chrome.contextMenus.create({
    id: 'Sveltool',
    title: 'Sveltool',
    contexts: ['all'],
  });

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // Recieves msgs from devtool
    if (msg) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { header: msg },
          function (response) {}
        );
      });
    }
    return true;
  });
});
