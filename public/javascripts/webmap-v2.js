// import { initializeLayersAndFlyTo } from "./flyto.js";

// initialisation de la carte
var map = L.map('map').setView([43.3104670508, 5.42204763845], 12);
var allLayers = {};
var markersObject = {};

// Hold data in a variable
var dataPoints;

// Ajout de la basemap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Style des marqueurs
var unclickStyle = {
    radius: 6,
    fillColor: "#344feb",
    color: "#344feb",
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8,
}

var clickStyle = {
    radius: 8,
    fillColor: '#990F02',
    color: '#990F02',
    weight: 1,
    opacity: 1,
    fillOpacity: 1,
}

var tooltipStyle = {
    direction:'top',
    offset:[0,-5]
}

fetch("../data/grands_ensembles_final.json")
    .then((response) => response.json())
    .then((responseData) => {
        dataPoints = responseData;
        const arrondissements = [...new Set(responseData.map(x => x.arrondissement))];
        initializeContentSidebar(responseData);
        initializeLayersAndFlyTo(allLayers, arrondissements);
        drawMarkers(responseData, arrondissements);
    });

function drawMarkers(dataArray, catArray) {
    catArray.forEach((item) => {
        allLayers[item] = new L.FeatureGroup().addTo(map);
    });
    dataArray.forEach((building) => {
        // layerGroup.addLayer(
        var buildingMarker = L.circleMarker([building.lat, building.lon], unclickStyle).on("click", function (e) {
            showSidebarInfo(building.Titre);
            buildingMarker.setStyle(clickStyle);
            // clickOnMarker(e);
            // updateSelectedPoint(e, building);
        });
        buildingMarker.on("mouseover",function(e){
            buildingMarker.setStyle(clickStyle)
        });
        buildingMarker.on("mouseout",function(e){
            buildingMarker.setStyle(unclickStyle)
        });
        buildingMarker.bindTooltip(building.Titre,tooltipStyle);
        buildingMarker.addTo(allLayers[building.arrondissement]);
        markersObject[building.Titre]=buildingMarker;
    });
}

map.on("moveend", function() {
    var newBounds = map.getBounds();
    filteredData = dataPoints.filter((item) => (item.lat > newBounds.getSouth() && item.lat < newBounds.getNorth() && item.lon < newBounds.getEast() && item.lon > newBounds.getWest()));
    initializeContentSidebar(filteredData);
    // document.getElementById("ensembleinfo").innerHTML = (selectedMarker ? '<h1>' + infoContent + '</h1>' : listContent);
  })
