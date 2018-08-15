//Display map tiles
var mymap = L.map('mapid').setView([51.505, -0.09], 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGV2ZGhyZXkiLCJhIjoiY2prdGd2cHRuMDUyZjNxcXF5d2dpMDl4MiJ9.ZpqGtvzy81aO1ahSJdsQrg'
}).addTo(mymap);

 
// add latlong to UI
var liIndex = 0;
function showMapPoint(e) {
    const latitude = e.latlng.lat.toFixed(4);
    const longitude = e.latlng.lng.toFixed(4);
    const result = document.querySelector('#result'); 
    const div = document.createElement('ul');
    // console.log(latitude, longitude);
    div.classList.add('show-result')
    div.innerHTML = `
     <li onclick ="deletePoint()" id="liPoints" "numIndex" = ${liIndex} >${latitude},${longitude}<i class="fas fa-trash-alt text-danger" style ="float:right"></i></li>
     `
     liIndex +=1;
    result.appendChild(div);    
}
mymap.on('click', showMapPoint);

//show cicle on map click
let circle = L.circle();
function onMapClick(e) {
    const latitude = e.latlng.lat;
    const longitude = e.latlng.lng;
    circle = L.circle([latitude,longitude], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 40}).addTo(mymap);
}
mymap.on('click', onMapClick);



document.getElementById('latlong-form').addEventListener('click', onButtonClick )
    
var marker = L.marker();
function onButtonClick(){
    const markerPoints = document.querySelectorAll('#liPoints');
    for (let i = 0; i < markerPoints.length; i++) { 
        var showMarkPoint = markerPoints[i].textContent;
        const marks =  showMarkPoint.split(',');
        const lat = marks[0]; const lng = marks[1]
        marker = L.marker([lat, lng]).addTo(mymap);     
    }           
}

//Delete latlong point
function deletePoint(){
    event.target.parentElement.remove();

    onButtonClick();   
}






















