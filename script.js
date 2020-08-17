const searchValue = document.getElementById('searchValue');
const searchButton = document.getElementById('searchButton');
const apiLink = 'https://api.lyrics.ovh/suggest/';
const resultItem = document.getElementById('resultItem');
const lyric = 'https://api.lyrics.ovh/v1/';
const showLyricItem = document.getElementById('showLyric');

const getSearchResult = () => { // api call for search result
    fetch(`${apiLink}${searchValue.value}`)
        .then(res => res.json())
        .then(data => {
            createDivBySearchResult(data.data);
        })
}

searchButton.addEventListener('click', () => { // search button event handler
    resultItem.innerHTML = '';
    showLyricItem.innerHTML = '';
    getSearchResult();
});

const createDivBySearchResult = (totalResult) => {// Take first 10 result item from the total search result
    for (let i = 0; i < totalResult.length; i++) {
        if (i > 9) {
            break;
        } else {
            //console.log(totalResult[i]);
            createElements(totalResult[i].title, totalResult[i].album.title, totalResult[i].artist.name, totalResult[i].artist.picture);
        }
    }
}

const createElements = (title, album, artist, artistPicture) => {// create element for result item
    resultItem.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                              <div class="col-md-6">
                              <h3 class="lyrics-name">${title}</h3>
                              <p class="author lead">Artist: <span>${artist}</span></p>
                              <p class="author lead"> Album: <span>${album}</span></p>
                              </div>
                              <div class="col-md-3">
                              <h4>${artist}</h4>
                              <img src="${artistPicture}" height="100" >
                              </div>
                              <div class="col-md-3 text-md-right text-center">
                              <button onclick="getLyric('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                              </div>                         
                              </div>`;
}

const getLyric = (artist, title) => { // api call when get lyrics button click
    fetch(`${lyric}/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
           // console.log(data);
            showLyric(title, artist, data.lyrics);
        })
}

const showLyric = (title, artist, lyric = 'Lyric not available! Please try another one.') => {// show lyrics for selected item
    showLyricItem.innerHTML = ` <button class="btn go-back">&lsaquo;</button>
                            <h2 class="text-success mb-4">${title} - ${artist}</h2>
                            <pre class="lyric text-white">${lyric}</pre>
                          `;
}
