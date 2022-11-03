<div align="center">

![banner](./public/icons/3.png)

# Introducing Sveltool, a dynamic visualization tool for all things Svelte.

[⚡ Getting Started](http://sveltool.com/) |
[📚 Documentation](http://sveltool.com/) |
[⌨️ Blog](mediumArticle) |
[💬 Twitter](https://twitter.com/svelvet_oslabs) |
[💼 LinkedIn](https://www.linkedin.com/company/sveltool/)

</div>

## Sveltool Features

<li>Sveltool parses your webpage and extracts the components, as well as their associated state and props.</li>
<li>The tool then displays your component structure in an easy-to-understand, tree-like visualization powered by the D3.js libray. </li>
<li>This allows you to view the hierarchical structure of your webpage and easily find the state and props of any component.</li>

<li>[[INSERT ANIMATION]]</li>
## How to get started

Sveltool is in the process of being added to the Chrome Web Store. At that point, downloading Sveltool will automatically integrate it into your Chrome DevTools.
<li>In the meantime, you can fork and clone this repository. From there open Sveltool in your IDE
in the terminal run</li>

```bash
cd [Sveltool/name of directory]
```

then run:

```bash
npm install
npm run build
```

After you run build, navigate to the Google Chrome Extensions page in your browser, turn developer mode on, and click “Load Unpacked” (in the top left). Go to the Sveltool file and upload the “build” folder into Chrome Extensions. When your Svelte app is open right click and go to “inspect”, where you will see the option to open Sveltool!



## Troubleshooting

<li>If your components are still not displaying make sure your application is in “dev mode”. This can be configured in your root component or in your Webpack/Vite config files.</li>
<li>If you're having trouble seeing Sveltool in the browser, double check that you have uploaded the “build” folder when clicking “Load Unpacked”.</li>
<li>If your components aren't displaying within the tool, simply refresh the page.</li>
<li>If none of these helped your problem, open an issue with us on our GitHub page!</li>

## How to contribute

Sveltool is currently in alpha, we would love to hear your feedback, encouragement, advice, suggestions, or problems! If you would like to contribute please contact us at info@sveltool.com

## What’s to Come in BETA

- **Developer settings:**
  Customize settings to meet needs based on project

- **Cache Snapshots of previous state:**
  As users interact with site, Sveltool will cache snapshots of previous states

- **Rank components by render-time:**
  Optimize application by tracking component render-time

- **Time Travel debugging:**
  Navigate backwards and forwards between previous and current state

## Learn More

Check out our website
sveltool.com

Read our latest blog
[[insert medium article]]

Follow us on Twitter
@sveltool

Contact us
info@sveltool.com

## Contributors

Daniel Aurand | linked in & github
Jessica Davila | linked in & github
Michael Grant | linked in & github
Adepeju Orefejo | linked in & github
Meow Puttamadilok | linked in & github

License
MIT
