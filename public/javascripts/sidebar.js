var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(map);

//pas encore chargé les points dans l'objet;
console.log(dataPoints);
//var infoBuilding = '<h1>' + dataPoints[0].Titre + '</h1>'

// add panels dynamically to the sidebar
sidebar
.addPanel({
    id:   'js-api',
    tab:  '<i class="fa fa-gear"></i>',
    title: 'JS API',
    pane: '<p>The Javascript API allows to dynamically create or modify the panel state.<p/><p><button onclick="sidebar.enablePanel(\'mail\')">enable mails panel</button><button onclick="sidebar.disablePanel(\'mail\')">disable mails panel</button></p><p><button onclick="addUser()">add user</button></b>',
})
// add a tab with a click callback, initially disabled
.addPanel({
    id:   'mail',
    tab:  '<i class="fa fa-envelope"></i>',
    title: 'Messages',
    button: function() { alert('opened via JS callback') },
    disabled: true,
})
.addPanel({
    id:   'info',
    tab:  '<i class="fa fa-user"></i>',
    title: 'Messages',
    disabled: false,
    pane: '<div id="ensembleinfo">Aucun ensemble  sélectionné</div>'
    //pane : '<h1>' + dataPoints[0].Titre + '</h1>'
    //pane: infoBuilding
})

sidebar.on('content', function(e) {
    console.log("on content");
    document.getElementById("ensembleinfo").innerHTML = '<h1>' + infoContent + '</h1>';
    // e.id contains the id of the opened panel
})

sidebar.on('open', function(e) {
    console.log("on content");
    // e.id contains the id of the opened panel
})

sidebar.open('js-api');

// / create the sidebar instance and add it to the map
//         var sidebar = L.control.sidebar({ container: 'sidebar' })
//             .addTo(map)
//             .open('home');