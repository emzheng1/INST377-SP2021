function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const map = L.map('mapid').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZW16aDE4IiwiYSI6ImNrbTc4MmRiZjB2cDQyd3VzZjR1ODN5OGgifQ.QWyG0V4swziR6-echon7sQ'
  }).addTo(map);
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
  const request = await fetch(endpoint);
  const food_info = await request.json();

  function findMatches(wordToMatch, food_info) {
    return food_info.filter(result => {
        const regex = new RegExp(wordToMatch, 'gi');
        return result.category.match(regex);
  });
}

async function windowActions() {
  //const map = mapInit();
  //await dataHandler(map);
}

window.onload = windowActions;