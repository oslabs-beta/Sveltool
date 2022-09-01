const connections = {};

chrome.runtime.onInstalled.addListener((details)=>{
  //add Sveltool to Chrome Devtools context menu
  chrome.contextMenus.create({
      "id" : "Sveltool",
      "title" : "Sveltool",
      "contexts" : ["all"]
  })

})

console.log(' did this file call at all?') 

// const port = chrome.runtime.connect({});

// console.log(port, '<==== Port')

console.log('chrome====>', chrome)

chrome.runtime.onConnect.addListener((port) => {

  console.log('Port ===>',port)

  const extensionListener = (message, sender, sendResponse) => {
    // original connection event doesn't include tabID of the DevTools page,
    // so we need to send it explicitly
    console.log('message ===>',message)
    if (message.name === 'init') {
      connections[message.tabId] = port;
    }
    // other message handling
  };

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(extensionListener);

    const tabs = Object.keys(connections);
    for (let i = 0; i < tabs.length; i += 1) {
      if (connections[tabs[i]] === port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});


