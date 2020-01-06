import { parse } from 'node-html-parser';
const titleRegexp = /(.+) - (.+) Lyrics.+/;

export default class Lyrics {
  /**
    * Get some lyrics
    * @param {String} query Query you selected/searched
    * @param {String} options object containing the search/website endpoint for azlyrics
    * @returns {Promise<String>} The lyrics the API provided.
    **/
  static get(query, options) {
    const searchEndpoint = options && options.searchEndpoint || 'https://crossorigin.me/https://search.azlyrics.com';
    const mainEndpoint = options && options.mainEndpoint || 'https://crossorigin.me/https://www.azlyrics.com/';
    return fetch(`${searchEndpoint}/search.php?q=${query.replace(/\s/g, "+")}`)
      .then(response => response.text())
      .then(responseBody => {
        const parsedBody = parse(responseBody);
        const lyricUrl = parsedBody.querySelectorAll('a').map(item => item.attributes.href).filter(href => href.indexOf('/lyrics') > 0)[0];
        if (lyricUrl === undefined) return "No lyrics found.";

        return fetch(lyricUrl.replace('https://www.azlyrics.com', mainEndpoint))
          .then(response => response.text())
          .then(responseBody => {
            const parsedItemBody = parse(responseBody);
            const htmlTitle = parsedItemBody.querySelector('title').text;
            const titleComponent = titleRegexp.exec(htmlTitle);
            let artist = titleComponent[1].trim();
            let song =  titleComponent[2].trim();
            let lyrics = parsedItemBody.querySelectorAll('div.col-xs-12.col-lg-8.text-center div')[4].text.trim();

            const info = {
              lyrics,
              song,
              artist
            };

            return info;
          });
      });
  }
}
