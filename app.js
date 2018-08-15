//Display map tiles
var mymap = L.map('mapid').setView([51.505, -0.09], 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGV2ZGhyZXkiLCJhIjoiY2prdGd2cHRuMDUyZjNxcXF5d2dpMDl4MiJ9.ZpqGtvzy81aO1ahSJdsQrg'
}).addTo(mymap);

// add latlong to UI
let points = L.popup();
function showMapPoint(e) {
    const point = points.setLatLng(e.latlng).setContent(e.latlng.toString());
    const result = document.querySelector('#result'); 
    const div = document.createElement('ul');
    div.classList.add('p-2');
    div.innerHTML = `
      <li onclick ="deletePoint()">${point._content}<i class="fas fa-trash-alt text-danger"></i></li>
    `
    result.appendChild(div);
     
}
mymap.on('click', showMapPoint);

//show marker on Map
let marker = L.marker()
function onMapClick(e) {
    const latitude = e.latlng.lat;
    const longitude = e.latlng.lng;
    marker = L.marker([latitude,longitude]).addTo(mymap);  
}
mymap.on('click', onMapClick);


//Delete latlong point
function deletePoint(){
    console.dir(event.target)
    event.target.parentElement.remove()
}