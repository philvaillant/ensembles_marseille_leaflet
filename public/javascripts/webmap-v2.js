// import { initializeLayersAndFlyTo } from "./flyto.js";

// initialisation de la carte
var map = L.map('map').setView([43.3104670508, 5.42204763845], 12);
var allLayers = {};

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
    fillColor: "#09f9df",
    color: "#ff0000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1,
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
            // clickOnMarker(e);
            // updateSelectedPoint(e, building);
        });
        buildingMarker.addTo(allLayers[building.arrondissement])
    });
}


