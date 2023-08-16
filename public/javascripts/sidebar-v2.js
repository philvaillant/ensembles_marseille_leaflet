var sidebar = L.control.sidebar({
    autopan: true,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(map);

var listContent;
var selectedFiche;

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
    listContent = '';
    dataArray.forEach((building) => {
        // console.log(building);
        listContent += '<div style="cursor:pointer;" class="fiche-title" id="' + building.Titre + '">' + building.Titre + '<div class="fiche-adresse" style="color:red;">' + building.Adresse + '</div><button class="bouton-page-details">fermez la fiche de détail</button></div></div>'
        // listContent += '<div style="cursor:pointer;"><div class="fiche-title" id="' + building.Titre + '" value="' + building.toString() + '">' + building.Titre + '</div><div class="fiche-adresse" style="color:red;">' + building.Adresse +'</div></div>'
    });
    document.getElementById("ensembleinfo").innerHTML = listContent;
    // listContent = htmlList;
};

document.getElementById("fiches").addEventListener('mouseover', function (e) {
    if (markersObject[e.target.id]) {
        markersObject[e.target.id].setStyle(clickStyle);
    }
});

document.getElementById("fiches").addEventListener('mouseout', function (e) {
    if (markersObject[e.target.id]) {
        markersObject[e.target.id].setStyle(unclickStyle);
    }
});

document.getElementById("fiches").addEventListener('click', function (e) {
    console.log(e.target.className);
    console.log(e);
    const element = e.target;
    if (element.className == 'fiche-title') {
        console.log("montrer les détails")
        showDetails(element.id);
    }
    else if (element.className == 'bouton-page-details') {
        goToList();
    }
    // console.log(e.target.id);
    // console.log(e.target);
    // e.target.classList.add('visible');
    // console.log(e.target.getAttribute("value"));
    // selectedFiche = e.target.id;
    // e.id contains the id of the opened panel
});

function showDetails(ficheId) {
    document.getElementById(ficheId).classList.add('visible');
    selectedFiche = ficheId;
}

function goToList() {
    document.getElementById(selectedFiche).classList.remove('visible');
}

function showSidebarInfo(markerId) {
    sidebar.open('fiches');
    showDetails(markerId);
}
