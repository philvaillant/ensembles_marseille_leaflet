// export
function initializeLayersAndFlyTo(layersdict,arrondissementsArray) {
    arrondissementsArray.forEach((item) => {
        layersdict[item]= new L.FeatureGroup().addTo(map);
        // htmlfilterarrondissements += '<button class="default-button" value="' + item + '">Arrondissement ' + item + '</button>'
    });
}