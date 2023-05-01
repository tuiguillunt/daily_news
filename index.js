import fetch from 'node-fetch';

const apiKey = 'cda2bb8e993d4e91bbfd450659da709e';

export function fetchData() {
  return fetch(`https://newsapi.org/v2/top-headlines?country=fr&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      return new Blob([JSON.stringify(data)], {type: 'application/json'});
    });
}


