var dataPoints = [];

var map = L.map('map').setView([43.2804765, 5.2154982], 12);
// const layerGroup = L.featureGroup().addTo(map);
var groupedLayer = new L.FeatureGroup();

//potentiellement faire logement social ou copro;
var arrondissement = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16']
// var allLayers = Array(16).fill(new L.FeatureGroup());
var allLayers = Array.from({length: 16}, () => { return new L.FeatureGroup();});
// allLayers.forEach((layer) => {
//     groupedLayer.addLayer(layer);
// });
groupedLayer.addTo(map);
// var allLayers = [new L.FeatureGroup(),new L.FeatureGroup()]
// var testLayer = new L.FeatureGroup();
console.log(allLayers);
// [new L.featureGroup(),new L.featureGroup()]
var overlayMaps = {
    "Tous arrondissements" : groupedLayer,
    "1er arrondissement": allLayers[0],
    "2ème arrondissement": allLayers[1],
    "3ème arrondissement": allLayers[2],
    "4ème arrondissement": allLayers[3],
    "5ème arrondissement": allLayers[4],
    "6ème arrondissement": allLayers[5],
    "7ème arrondissement": allLayers[6],
    "8ème arrondissement": allLayers[7],
    "9ème arrondissement": allLayers[8],
    "10ème arrondissement": allLayers[9],
    "11ème arrondissement": allLayers[10],
    "12ème arrondissement": allLayers[11],
    "13ème arrondissement": allLayers[12],
    "14ème arrondissement": allLayers[13],
    "15ème arrondissement": allLayers[14],
    "16ème arrondissement": allLayers[15]
};
var attribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
mapnikLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: attribution}
).addTo(map);
// var clouds = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
//     opacity: 0.5
// }).addTo(map);
// var overlayLayers = {
//     'Clouds': clouds
// }
var baseLayers = {
    'Mapnik': mapnikLayer
}
// var layerControl = L.control.layers(null,overlayMaps).addTo(map);
// var control = L.control.activeLayers(baseLayers, overlayMaps)
// control.addTo(map)
var layerControl = L.control.selectLayers(overlayMaps,baseLayers).addTo(map);

// console.log(allLayers[0].getLayers())
// allLayers[0].addTo(map);

// Adds the basemap tiles to your web map
// Additional providers are available at: https://leaflet-extras.github.io/leaflet-providers/preview/
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

fetch("../data/grands_ensembles_final.json")
    .then((response) => response.json())
    .then((responseData) => {
        initializeMap(responseData);
    });

function initializeMap(arrayPoints) {
    arrayPoints.forEach((point) => {
        // console.log(parseInt(point.arrondissement));
        addToProperLayer(point,parseInt(point.arrondissement));
    });
    // console.log(allLayers.length);
    // console.log(allLayers[0].getLayers())
    // console.log(allLayers[1].getLayers())
    // map.fitBounds(layerGroup.getBounds());
}

function addToProperLayer(point,arrondissement) {
    // if(arrondissement==1) {
    //     var building = L.marker([point.lat,point.lon]);
    //     building.addTo(testLayer);
    // }
    // if(arrondissement==2) {
    //     var building = L.marker([point.lat,point.lon]);
    //     building.addTo(allLayers[1]);
    // }
    // if (arrondissement < 6) {
        var building = L.marker([point.lat,point.lon]);
        building.addTo(allLayers[(arrondissement-1)]);
        building.addTo(groupedLayer);
    // }
}