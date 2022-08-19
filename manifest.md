{
  "name": "Sveltetool",
  "version": "1.0",
  "description": "Dynamic visualization for all things Svelte.",
  "manifest_version": 3,
  "minimum_chrome_version": "10.0",
  "devtools_page": "devtools.html",
  
  "action": {
    "default_icon": {
      "16": "icon-16.png",
      "48": "icon-48.png",
      "128": "icon-128.png"
      // upload icon files
    },
    "default_title": "Sveltetool"
  },
  
  "background": {
    "service_worker": "background.js"
  },
  
  "permissions": ["tabs", "devtools", "contextMenus"],
  
  "web_accessible_resources": [{
    // "resources": [RESOURCE_PATHS],
    // "matches": [MATCH_PATTERNS],
    // "extension_ids": [EXTENSION_IDS],
    // "use_dynamic_url": boolean //optional
  }],

  "externally_connectable": {
    "matches": ["http://localhost/*"]
},

  "content_security_policy": {
      "extension pages": "script-src 'self' https://d3js.org/d3.v7.min.js; object-src 'self'" //see documentation, seems like we need this for D3
},


  "content_scripts": [{
      "matches": ["https://*/*", "http://*/*"], //specifies which page script will be injected to
      "js": [], //list of JS files to be injected
      "css": [], //list of CSS filest to be injected
      "run_at": "document_start" //when JS files are injected, webpage is controlled by run_at
      //insert file path to scripts as needed
}]

}
