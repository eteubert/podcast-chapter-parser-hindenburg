# Podcast Chapter Parser for Hindenburg project files

Podcast Chapter Parser for [Hindenburg](https://hindenburg.com).

## Installation

```bash
npm install podcast-chapter-parser-hindenburg
```

## Example

```js
// for node, use xmldom; in a browser, pass window.DOMParser
var DOMParser = require('xmldom').DOMParser; 
var hindenburg = require('podcast-chapter-parser-hindenburg').parser(DOMParser);

var chapters = hindenburg.parse('<?xml version="1.0" encoding="utf-8"?>\n<Session Version="Hindenburg Journalist 1.15.1769" Samplerate="48000">\n  <Markers>\n\t  <Marker Id="1" Name="Intro" Time="1.200" Type="Chapter"/>\n\t  <Marker Id="2" Name="Say Hello" Time="2.400" URL="http://example.com" Type="Chapter"/>\n  </Markers>\n</Session>');
// =>
// [
//     { start: 1200, title: "Intro" },
//     { start: 2400, title: "Say Hello", href: "http://example.com" }
// ]
```

## Development

```
npm install
npm test
```
