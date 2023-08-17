// Creates a leaflet map binded to an html <div> with id "map"
// setView will set the initial map view to the location at coordinates
// 13 represents the initial zoom level with higher values being more zoomed in
var map = L.map('map').setView([43.2804765, 5.2154982], 12);
var dataPoints;
var filteredData;
var infoContent = 'aucun ensemble sélectionné';
var selectedMarker = false;

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

function createListItems(dataArray) {
  var htmlList = '';
  dataArray.forEach((building) => {
    htmlList += '<p>' + building.Titre + '</p>'
  });
  listContent = htmlList;
};

var Arrondissements = ['01','02','03'];

function initializeControls() {

  for (var arrondissement in Arrondissements) {
    var arrondissementLayer = L.geoJson(data, {
      filter: function (feat) { return feat.properties.team === team; }
    });
    var teamName = 'Team ' + team;
    allTeams.addLayer(teamLayer);
    teamLayers[teamName] = teamLayer;
  }
  L.control.layers(teamLayers).addTo(map);
}

// Attention : trouver une logique pour que le marker disparaisse quand on reclique
function clickOnMarker(e) {
  // console.log("changement de style");
  // if (clicked) {
  //   console.log("set style unclick")
  //   clicked.setStyle(unclickStyle);
  // }
  // e.target.setStyle(clickStyle);
  // clicked = e.target;
}

fetch("../data/grands_ensembles_final.json")
  .then((response) => response.json())
  .then((responseData) => {
    dataPoints = responseData;
    //attention à ce qui arrive avant quoi;
    //initializeContentSidebar();
    console.log(dataPoints);
    // console.log(responseData);
    createListItems(responseData);
    drawMarkers(responseData);
  });

function drawMarkers(dataArray) {
  const layerGroup = L.featureGroup().addTo(map);

  // pour le style, utiliser quelque chose comme ça : https://gis.stackexchange.com/questions/386886/changing-leaflet-circle-marker-colour-and-size-when-clicked-upon
  dataArray.forEach((building) => {
    layerGroup.addLayer(
      L.circleMarker([building.lat, building.lon], unclickStyle).on("click", function (e) {
        clickOnMarker(e);
        updateMarker(e, building);
      })
    )
  });
  map.fitBounds(layerGroup.getBounds());
}
console.log(dataPoints);

function updateMarker(e, building) {
  // selectedMarker = ((selectedMarker == building) ? false : building);
  if (clicked) {
    clicked.setStyle(unclickStyle);
  }
  if (selectedMarker == building) {
    e.target.setStyle(unclickStyle);
    selectedMarker = false;
  }
  else {
    e.target.setStyle(clickStyle);
    selectedMarker = building;
  }
  clicked = e.target;
  infoContent = '<p>' + building.Titre + '</p><p>' + building.Adresse + '</p>';
  sidebar.open('info');
}

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

map.on("moveend", function() {
  // console.log("mouvement fini");
  var newBounds = map.getBounds();
  // console.log(newBounds);
  // console.log(newBounds.getWest())
  filteredData = dataPoints.filter((item) => (item.lat > newBounds.getSouth() && item.lat < newBounds.getNorth() && item.lon < newBounds.getEast() && item.lon > newBounds.getWest()));
  createListItems(filteredData);
  document.getElementById("ensembleinfo").innerHTML = (selectedMarker ? '<h1>' + infoContent + '</h1>' : listContent);
})