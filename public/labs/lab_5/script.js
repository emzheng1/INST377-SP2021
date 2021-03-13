function mapInit() {
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

async function dataHandler(mapFromLeaflet) {
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {
    targetList.innerText = '';
    event.preventDefault();
    const filtered = data.filter((record) => record.zip.includes(search.value)
    && record.geocoded_column_1);
    const firstFive = filtered.slice(0, 5);

    firstFive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
      targetList.append(appendItem);
    });
    const {coordinates} = firstFive[0]?.geocoded_column_1;
    mapFromLeaflet.panTo([coordinates[1], coordinates[0]], 0);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;