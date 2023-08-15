var sidebar = L.control.sidebar({
    autopan: true,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(map);

var listContent='';

// add panels dynamically to the sidebar
sidebar
    .addPanel({
        id: 'home',
        tab: '<i class="fa fa-home"></i>',
        title: 'Accueil',
        pane: '<p>Description du projet<p>',
    })
    .addPanel({
        id: 'fiches',
        tab: '<i class="fa fa-list"></i>',
        title: 'Fiches',
        pane: '<div id="ensembleinfo">Aucun ensemble  sélectionné</div>',
    })
    .addPanel({
        id: 'about',
        tab: '<i class="fa fa-question"></i>',
        title: 'Contact',
        pane: '<p>Contact : XXX<p>',
    })
sidebar.open('home');

function initializeContentSidebar(dataArray) {
    // var htmlList = '';
    dataArray.forEach((building) => {
        listContent += '<div value="test" style="cursor:pointer;">' + building.Titre + '</p>'
    });
    document.getElementById("ensembleinfo").innerHTML = listContent;
    // listContent = htmlList;
};

document.getElementById("fiches").addEventListener('click', function (e) {
    console.log(e.target.getAttribute('value'));
    // e.id contains the id of the opened panel
});
