<div align="center">

![banner](./public/icons/3.png)

![MIT License](https://img.shields.io/badge/license-MIT-%23fb7182)
![GitHub Stars](https://img.shields.io/github/stars/open-source-labs/Sveltool?color=%23fb7182)
![GitHub Forks](https://img.shields.io/github/forks/open-source-labs/Sveltool?color=%23fb7182)

# Introducing Sveltool, a dynamic visualization tool for all things Svelte.

[⚡ Getting Started](http://sveltool.com/) |
[📚 Documentation](http://sveltool.com/) |
[⌨️ Blog](mediumArticle) |
[💬 Twitter](https://twitter.com/sveltool) |
[💼 LinkedIn](https://www.linkedin.com/company/sveltool/)

</div>

## Sveltool Features

Sveltool parses your webpage and extracts the components, as well as their associated state and props.

The tool then displays your component structure in an easy-to-understand, tree-like visualization powered by the D3.js libray.

This allows you to view the hierarchical structure of your webpage and easily find the state and props of any component.

[[INSERT ANIMATION]]

## How to get started

Sveltool is in the process of being added to the Chrome Web Store. At that point, downloading Sveltool will automatically integrate it into your Chrome DevTools.

In the meantime, you can fork and clone this repository. From there open Sveltool in your IDE
in the terminal run

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

If your components are still not displaying make sure your application is in “dev mode”. This can be configured in your root component or in your Webpack/Vite config files.

If you're having trouble seeing Sveltool in the browser, double check that you have uploaded the “build” folder when clicking “Load Unpacked”.

If your components aren't displaying within the tool, simply refresh the page.

If none of these helped your problem, open an issue with us on our GitHub page!

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
[here](http://sveltool.com/)

Read our latest blog
[[insert medium article]]

Follow us on Twitter
@sveltool

Contact us
info@sveltool.com

## Contributors

- Daniel Aurand • [LinkedIn](https://www.linkedin.com/in/daniel-aurand/) • [Github](https://github.com/daurand)
- Jessica Davila• [LinkedIn](https://www.linkedin.com/in/jessica-davila-5a8380115/) • [Github](https://github.com/jessdvila)
- Micheal Grant • [LinkedIn](https://www.linkedin.com/in/michaelcolliergrant/) • [Github](https://github.com/MichaelCGrant)
- Adepeju Orefejo• [LinkedIn](https://www.linkedin.com/in/adepeju-orefejo/) • [Github](https://github.com/adepeju4)
- Meow Puttamadilok• [LinkedIn](https://www.linkedin.com/in/thasanee-p-686125243/) • [Github](https://github.com/Meowmerry)

## License

MIT
