WikiMap
=========
Created by [Kevin Lee](https://github.com/jhssttj) and [Curtis Wilson](https://github.com/curtis-wils0n) for Lighthouse Labs' full-time web development bootcamp midterm.
> This project is intended to be a proof of concept, and therefore should not be hosted or used as a stand-alone website.

## Summary

🗺️🧭 **WikiMap** is a bold, easy-to-use social map-making website that allows users to create, edit, and share custom maps with friends.

![](https://github.com/curtis-wils0n/midterm-project/blob/styling-tests/images/splash-example.png?raw=true)

WikiMap utilizes Sass, Ajax, and jQuery calls to display front-end content, while Node, Express, and PostgreSQL operate the back-end.

Design was inspired by neubrutalist sites such as [Gumroad](https://gumroad.com/), [Figma](https://www.figma.com/), and [Pizza Pizza Design Services](https://pizzapizza.io/)

## Screenshots

Users can access a list of diverse and creative maps.

![A screenshot of WikiMap's map display, with a light blue background and goldenrod yellow foreground](https://github.com/curtis-wils0n/midterm-project/blob/readme-creation/images/readme-screenshot-1.png?raw=true)

Contibute to existing maps by placing pins, or create your own map to gather input from others!

![A screenshot of a black-and-white Google Map with red markers, alongside a title reading 'Downtown Vancouver murals'](https://github.com/curtis-wils0n/midterm-project/blob/readme-creation/images/readme-screenshot-3.png?raw=true)

Each individual marker can hold detailed information about its location.

![A screen recording gif of an individual location being shown: a mural of a kraken on the side of a building.](https://github.com/curtis-wils0n/midterm-project/blob/readme-creation/images/readme-screenshot-2.gif?raw=true)

## Dependencies

- **Chalk** 2.4.2
- **cookie-parser** 1.4.6
- **dotenv** 2.0.0
- **EJS** 2.6.2
- **express** 4.17.1
- **morgan** 1.9.1
- **pg** 8.5.0
- **Sass** 1.35.1

## Setting up

1. Clone this repository onto your local device.
2. Install dependencies with `npm install`.
3. Create a [Google Maps Platform](https://mapsplatform.google.com/) account and generate an API key (free $200 credit).
4. In a .env file, define `MAP_API` with the value of your key.
6. Start the local web server by running `npm run local`, and navigate to http://localhost:8080/ on a browser of your choice.
