// var htmlfilterarrondissements = '';
// htmlfilterarrondissements = '<select class="form-select" aria-label="Default select example"><option selected>Open this select menu</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select>'

// document.getElementById("filters").innerHTML = htmlfilterarrondissements;

var arrondissementSelected;

// function initializeFilterArrondissement(arrondissementsArray) {
//     var htmlfilterarrondissements = ''
//     arrondissementsArray.forEach((item) => {
//         newallLayers[item]= new L.FeatureGroup().addTo(map);
//         // console.log(parseInt(point.arrondissement));
//         console.log("item");
//         htmlfilterarrondissements += '<option value="' + item + '">Arrondissement ' + item + '</option>'
//     });
//     document.getElementById("filters").innerHTML = '<select aria-label="Tous les arrondissements"><option selected value="All">Tous les arrondissements</option>' + htmlfilterarrondissements + '</select>';
// }

function initializeFilterArrondissement(arrondissementsArray) {
    var htmlfilterarrondissements = ''
    arrondissementsArray.forEach((item) => {
        newallLayers[item]= new L.FeatureGroup().addTo(map);
        // console.log(parseInt(point.arrondissement));
        console.log("item");
        htmlfilterarrondissements += '<button class="default-button" value="' + item + '">Arrondissement ' + item + '</button>'
    });
    document.getElementById("filters").innerHTML = htmlfilterarrondissements ;
}

document.getElementById("filters").addEventListener('click', (event) => {
    // console.log(event.target.value);
    // map.eachLayer(function (layer) {
    //     map.removeLayer(layer);
    // });
    // map.addLayer(mapnikLayer).addLayer(newallLayers[event.target.value]);
    // peut-être mettre dans une autre couleur les points de l'arrondissement vers lequel on va
    arrondissementSelected = event.target.value;
    map.flyToBounds(newallLayers[event.target.value].getBounds(), { duration: 1 } )
 });