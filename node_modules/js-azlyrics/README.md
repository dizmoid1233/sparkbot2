# js-azlyrics

[![NPM](https://nodei.co/npm/js-azlyrics.png)](https://nodei.co/npm/js-azlyrics/)

This uses [azlyrics](https://azlyrics.com/) and gets the song of your choice and returns a promise with song lyrics, title, and song.

This is intended for browser usage and depends on fetch. You can add a [polyfill](https://www.npmjs.com/package/whatwg-fetch) if you don't have it.

Usage:
```js
import azlyrics from 'js-azlyrics';

// optional, used for your own CORS proxy endpoint
const options = {
  searchEndpoint: '/azlyricssearch',
  mainEndpoint: '/azlyrics'
};

azlyrics.get('Allday You Always Know The DJ', options).then((song) => {
   console.log(`Lyrics for ${song.song} by ${song.artist}:\n${song.lyrics}`);
});
```
