// import { initializeLayersAndFlyTo } from "./flyto.js";

// initialisation de la carte
// Si je sélectionne autopan
// var map = L.map('map', { zoomControl: false }).setView([43.3104670508, 5.42204763845], 12);
// Si je désélectionne autopan
var map = L.map('map', { zoomControl: false }).setView([43.3151520061, 5.4014969511], 12);
// Ajouter un bouton zoom d'initialisation
// Il faudrait changer les coordonner du zoomhome en fonction de l'ouverture de la sidebar
var zoomHome = L.Control.zoomHome({ homecoordinates: [43.3104670508, 5.42204763845] });
zoomHome.addTo(map);
var allLayers = {};
var markersObject = {};
var selectedMarker = L.circleMarker();

// Hold data in a variable
var dataPoints;

// Objet pour donner un meilleur libellé aux arrondissements (ce serait mieux de changer les données source)
var libellesArrondissements = {
    "01": "1er arrondissement",
    "02": "2ème arrondissement",
    "03": "3ème arrondissement",
    "04": "4ème arrondissement",
    "05": "5ème arrondissement",
    "06": "6ème arrondissement",
    "07": "7ème arrondissement",
    "08": "8ème arrondissement",
    "09": "9ème arrondissement",
    "10": "10ème arrondissement",
    "11": "11ème arrondissement",
    "12": "12ème arrondissement",
    "13": "13ème arrondissement",
    "14": "14ème arrondissement",
    "15": "15ème arrondissement",
    "16": "16ème arrondissement"
};

// Ajout de la basemap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Style des marqueurs
var unclickStyle = {
    radius: 10,
    fillColor: "#344feb",
    color: "#344feb",
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8,
    stroke: false,
    zIndexOffset: 0
}

var clickStyle = {
    radius: 12,
    fillColor: '#990F02',
    color: '#990F02',
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
    stroke: false,
    zIndexOffset: 1000
}


var tooltipStyle = {
    direction: 'top',
    offset: [0, -5]
}

// Il faudra corriger les données où pour une ligne il y a 5 résidences
// fetch("data/grands_ensembles_final.json")
//     .then((response) => response.json())
//     .then((responseData) => {
//         // Il faut que je fasse en sorte que l'ordre d'ajout des arrondissements soient le bons, donc avant d'ordonner les données
//         const arrondissements = [...new Set(responseData.map(x => x.arrondissement))];
//         dataPoints = responseData.sort(function (a, b) {
//             if (a.Titre < b.Titre) {
//                 return -1;
//             }
//         });
//         // dataPoints = responseData;
//         initializeContentSidebar(responseData);
//         initializeLayersAndFlyTo(arrondissements);
//         drawMarkers(responseData, arrondissements);
//     });

document.addEventListener("DOMContentLoaded", (event) => {
    const arrondissements = [...new Set(data_grands_ensembles.map(x => x.arrondissement))];
    dataPoints = data_grands_ensembles.sort(function (a, b) {
        if (a.Titre < b.Titre) {
            return -1;
        }
    });
    // dataPoints = responseData;
    initializeContentSidebar(data_grands_ensembles);
    initializeLayersAndFlyTo(arrondissements);
    drawMarkers(data_grands_ensembles, arrondissements);
});

function drawMarkers(dataArray, catArray) {
    dataArray.forEach((building) => {
        // layerGroup.addLayer(
        var buildingMarker = L.circleMarker([building.lat, building.lon], unclickStyle).on("click", function (e) {
            highlightSelectedMarker(buildingMarker);
            showSidebarInfo(building.Titre);
        });
        buildingMarker.on("mouseover", function (e) {
            if (selectedMarker != buildingMarker) {
                buildingMarker.setStyle(clickStyle)
            }
        });
        buildingMarker.on("mouseout", function (e) {
            if (selectedMarker != buildingMarker) {
                buildingMarker.setStyle(unclickStyle);
            }
        });
        buildingMarker.on("focus", function (e) {
            buildingMarker.setStyle(clickStyle);
        });
        buildingMarker.bindTooltip(building.Titre, tooltipStyle);
        buildingMarker.addTo(allLayers[building.arrondissement]);
        markersObject[building.Titre] = buildingMarker;
    });
}

function highlightSelectedMarker(marker) {
    selectedMarker.setStyle(unclickStyle);
    marker.bringToFront();
    marker.setStyle(clickStyle);
    selectedMarker = marker;
}

map.on("moveend", function () {
    var newBounds = map.getBounds();
    filteredData = dataPoints.filter((item) => (item.lat > newBounds.getSouth() && item.lat < newBounds.getNorth() && item.lon < newBounds.getEast() && item.lon > newBounds.getWest()));
    initializeContentSidebar(filteredData);
})

function initializeLayersAndFlyTo(arrondissementsArray) {
    var htmlitemarrondissement = '';
    arrondissementsArray.forEach((item) => {
        allLayers[item] = new L.FeatureGroup().addTo(map);
        htmlitemarrondissement += '<a href="#" value="' + item + '">' + libellesArrondissements[item] + '</a>'
    });
    document.getElementById("menu-arrondissements").innerHTML = htmlitemarrondissement;
}

document.getElementById("menu-arrondissements").addEventListener('click', (event) => {
    arrondissementSelected = event.target.getAttribute('value');
    map.flyToBounds(allLayers[arrondissementSelected].getBounds(), { duration: 1 })
});
