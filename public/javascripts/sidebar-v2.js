var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
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
        tab: '<i class="fa fa-scroll"></i>',
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
        // bizarre que l'initialisation du contenu prenne en compte la fiche sélectionnée : il faut dissocier
        // listContent += '<div class="button-6 fiche-title' + ((selectedFiche==building.Titre) ? ' visible' : '') + '" id="' + building.Titre + '">' + building.Titre + '<div class="fiche-adresse" style="color:red;">' + building.Adresse + '</div><button class="bouton-page-details">fermez la fiche de détail</button></div></div>'
        // listContent += '<div class="button-6 fiche-title" id="' + building.Titre + '"><h1>' + building.Titre + '</h1><div class="fiche-adresse">' + building.Adresse + ' 130' + building.arrondissement + ' Marseille' + '</div><img src="' + building.Image + '"><div class="fiche-info"><h3>Programme</h3><p>' + building.Programme +'</p></div><div class="fiche-info"><h3>Dates de construction</h3><p>' + building.Architecte +'</p></div><div class="fiche-info"><h3>Architecte</h3><p>' + building.Architecte +'</p></div><div class="fiche-info"><h3>Propriétaire</h3><p>' + building.Propriétaire +'</p></div><div class="fiche-info"><h3>Bâti</h3><p>' + building.Bâti +'</p></div><button class="bouton-page-details">fermez la fiche de détail</button></div>'
        // Remove img for now because of problems with the website
        listContent += '<div class="button-6 fiche-title" id="' + building.Titre + '"><h1>' + building.Titre + '</h1><div class="fiche-adresse">' + building.Adresse + ' 130' + building.arrondissement + ' Marseille' + '</div><div class="fiche-info"><h3>Programme</h3><p>' + building.Programme +'</p></div><div class="fiche-info"><h3>Dates de construction</h3><p>' + building.Architecte +'</p></div><div class="fiche-info"><h3>Architecte</h3><p>' + building.Architecte +'</p></div><div class="fiche-info"><h3>Propriétaire</h3><p>' + building.Propriétaire +'</p></div><div class="fiche-info"><h3>Bâti</h3><p>' + building.Bâti +'</p></div><div class="link-details"><a href="' + building['Lien détail'] + '" target="_blank">Lien vers la page de détail sur le site du Ministère de la Culture</a></div><button class="bouton-page-details">fermez la fiche de détail</button></div>'

        // listContent += '<div style="cursor:pointer;"><div class="fiche-title" id="' + building.Titre + '" value="' + building.toString() + '">' + building.Titre + '</div><div class="fiche-adresse" style="color:red;">' + building.Adresse +'</div></div>'
    });
    // Il faut seulement afficher le contenu si on est à la page de liste
    if (!selectedFiche) {
        console.log("initialisation de contenu");
        document.getElementById("ensembleinfo").innerHTML = listContent;
    };
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

// Il faut séparer le click sur un titre et le click sur un bouton de fermeture en fait / En fait non il faut juste remettre bien le display à none quand ça n'apparaît pas
document.getElementById("fiches").addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList.contains('fiche-title')) {
        showDetails(element.id);
        console.log(selectedFiche, element);
    }
    else if (element.classList.contains('bouton-page-details')) {
        console.log(selectedFiche, element);
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
    console.log(ficheId);
    document.getElementById(ficheId).classList.remove('button-6');
    if (selectedFiche) {
        document.getElementById(selectedFiche).classList.remove('visible');
        document.getElementById(selectedFiche).classList.add('button-6');
    }
    document.getElementById(ficheId).classList.remove('button-6');
    document.getElementById(ficheId).classList.add('visible');
    selectedFiche = ficheId;
    console.log(selectedFiche);
}

function goToList() {
    console.log(selectedFiche);
    document.getElementById(selectedFiche).classList.remove('visible');
    document.getElementById(selectedFiche).classList.add('button-6');
    markersObject[selectedFiche].setStyle(unclickStyle);
    selectedFiche = false;
    document.getElementById("ensembleinfo").innerHTML = listContent;
    // document.getElementById(selectedFiche).classList.remove('visible');
    console.log(selectedFiche);
}

function showSidebarInfo(markerId) {
    sidebar.open('fiches');
    showDetails(markerId);
}
