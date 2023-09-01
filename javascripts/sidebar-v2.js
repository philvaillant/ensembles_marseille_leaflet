var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(map);

var listContent;
var selectedFiche;
var reloadContent;

// add panels dynamically to the sidebar
sidebar
    .addPanel({
        id: 'home',
        tab: '<i class="fa fa-scroll"></i>',
        title: 'Accueil',
        pane: '<div class="texte-accueil"><p>Cette carte interactive donne à voir 80 grands ensembles de plus de 100 logements construits à Marseille entre 1955 et 1975. </p><p><strong>Les données utilisées (dont les photographies) sont issues d’une étude commanditée par la direction régionale des affaires culturelles Provence-Alpes-Côte d’Azur (DRAC PACA), et réalisée en 2005 par Thierry Durousseau, architecte et urbaniste. </strong>L\'objectif de ce projet est simplement de valoriser, sous une forme cartographique, les résultats très riches de cette étude qui ont par ailleurs été mis en ligne sur le <a href="https://www.culture.gouv.fr/Regions/Drac-Provence-Alpes-Cote-d-Azur/Politique-et-actions-culturelles/Architecture-contemporaine-remarquable-en-Paca/Les-etudes/Marseille-ensembles-et-residences-de-la-periode-1955-1975" target="_blank">site de la DRAC PACA</a> . </p><p>Les 80 résidences représentées sur la carte constituent un échantillon des 480 ensembles construits entre 1955 et 1975 répertoriés par l’étude. Il s’agit d’ensembles de logements sociaux, privés ou mixtes.</p> <p><strong>Notre volonté, en créant ce site, était de pouvoir faciliter l’identification de ces grands ensembles pour mieux apprivoiser le paysage urbain atypique et unique qu’ils forment.</strong></p> <p>Les noms des cités qui s’affichent dans la liste déroulante, à gauche, sont ceux qui sont affichés à l’écran. La liste change donc à mesure que vous vous déplacez sur la carte.</p></div>',
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
        pane: '<div class="texte-contact"><p>Nous sommes Mégane Aussedat (<a href="https://www.linkedin.com/in/m%C3%A9gane-aussedat-90aa63164/" target="_blank">Linkedin</a>) et Philippe Vaillant (<a href="https://twitter.com/Phil_Vaillant" target="_blank">X</a> et <a href="https://www.linkedin.com/in/philippe-vaillant-836b3793/" target="_blank">Linkedin</a>), deux passionnés des sciences urbaines travaillant dans le domaine du logement. N\'hésitez pas à nous contacter pour toute remarque concernant ce projet.</p></div>',
    })
sidebar.open('home');

function initializeContentSidebar(dataArray) {
    // var htmlList = '';
    listContent = '';
    dataArray.forEach((building) => {
        listContent += '<div class="button-6 fiche-title" id="' + building.Titre + '"><h1>' + building.Titre + '</h1><button type="button" class="close" aria-label="Close"><span class="back-to-list" aria-hidden="true">&times;</span></button><div class="fiche-adresse">' + building.Adresse + ' 130' + building.arrondissement + ' Marseille' + '</div><img src="' + building.Image + '"><div class="fiche-info"><h3>Programme</h3><p>' + building.Programme +'</p></div><div class="fiche-info"><h3>Dates de construction</h3><p>' + building['Dates de construction'] +'</p></div><div class="fiche-info"><h3>Architecte</h3><p>' + building.Architecte +'</p></div><div class="fiche-info"><h3>Propriétaire</h3><p>' + building.Propriétaire +'</p></div><div class="fiche-info"><h3>Bâti</h3><p>' + building.Bâti +'</p></div><div class="link-details"><a href="' + building['Lien détail'] + '" target="_blank">Lien vers la page de détail sur le site du Ministère de la Culture</a><p>© Thierry Durousseau, 2004-2005</p></div><button class="bouton-page-details back-to-list">Fermer la fiche de détail</button></div>'
    });
    // Il faut seulement afficher le contenu si on est à la page de liste
    if (!selectedFiche) {
        document.getElementById("ensembleinfo").innerHTML = listContent;
    }
    else {
        // besoin d'avoir une variable pour savoir s'il faut relancer le contenu lorque je clique sur un autre ensemble
        reloadContent = true;
    };
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
    const element = e.target;
    console.log(element);
    if (element.classList.contains('fiche-title')) {
        showDetails(element.id);
    }
    else if (element.classList.contains('back-to-list')) {
        goToList();
    }
});

function showDetails(ficheId) {
    if (reloadContent) {
        document.getElementById("ensembleinfo").innerHTML = listContent;
        reloadContent = false;
    }
    else if (selectedFiche) {
        document.getElementById(selectedFiche).classList.remove('visible');
        document.getElementById(selectedFiche).classList.add('button-6');
    }
    document.getElementById('ensembleinfo').classList.add('see-details');
    document.getElementById(ficheId).classList.remove('button-6');
    document.getElementById(ficheId).classList.add('visible');
    selectedFiche = ficheId;
}

function goToList() {
    document.getElementById('ensembleinfo').classList.remove('see-details');
    document.getElementById(selectedFiche).classList.remove('visible');
    document.getElementById(selectedFiche).classList.add('button-6');
    markersObject[selectedFiche].setStyle(unclickStyle);
    selectedFiche = false;
    document.getElementById("ensembleinfo").innerHTML = listContent;
}

function showSidebarInfo(markerId) {
    sidebar.open('fiches');
    showDetails(markerId);
}