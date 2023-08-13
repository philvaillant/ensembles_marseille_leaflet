// Creates a leaflet map binded to an html <div> with id "map"
// setView will set the initial map view to the location at coordinates
// 13 represents the initial zoom level with higher values being more zoomed in
var map = L.map('map').setView([43.2804765, 5.2154982], 12);
var dataPoints;
var infoContent = 'aucun ensemble sélectionné';

// Adds the basemap tiles to your web map
// Additional providers are available at: https://leaflet-extras.github.io/leaflet-providers/preview/
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

var clicked;

var clickStyle = {
  radius: 6,
  fillColor: "#ff0000",
  color: "#ff0000",
  opacity: 1,
  weight: 2,
  fillOpacity: 1,
}
var unclickStyle = {
  radius: 6,
  fillColor: "#09f9df",
  color: "#ff0000",
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
}

function clickOnMarker(e) {
  console.log("changement de style");
  if (clicked) {
    clicked.setStyle(unclickStyle);
  }
  e.target.setStyle(clickStyle);
  clicked = e.target;
}

fetch("../data/grands_ensembles_final.json")
  .then((response) => response.json())
  .then((responseData) => {
    dataPoints = responseData;
    //attention à ce qui arrive avant quoi;
    //initializeContentSidebar();
    console.log(dataPoints);
    // console.log(responseData);

    const layerGroup = L.featureGroup().addTo(map);

    // pour le style, utiliser quelque chose comme ça : https://gis.stackexchange.com/questions/386886/changing-leaflet-circle-marker-colour-and-size-when-clicked-upon
    responseData.forEach((building) => {
      layerGroup.addLayer(
        L.circleMarker([building.lat, building.lon], unclickStyle).on("click", function (e) {
          infoContent = '<p>' + building.Titre + '</p><p>' + building.Adresse + '</p>'; console.log("marker cliqué"); console.log(infoContent); sidebar.open('info'); clickOnMarker(e);
        })
        // .bindPopup(
        //   `Titre: ${building.Titre}, Addresse: ${building.Adresse}`
        // )
      );
    });

    map.fitBounds(layerGroup.getBounds());
  });
console.log(dataPoints);

// Adds a popup marker to the webmap for GGL address
// L.circleMarker([43.659752, -79.378161]).addTo(map)
// 	.bindPopup(
// 		'MON 304<br>' +
// 		'Monetary Times Building<br>' +
// 		'341 Victoria Street<br>' +
// 		'Toronto, Ontario, Canada<br>' +
// 		'M5B 2K3<br><br>' +
// 		'Tel: 416-9795000 Ext. 5192'
// 	)
// 	.openPopup();