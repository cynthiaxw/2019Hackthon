
var locations = [
    {"id": "0001", "position": [51.081018, -114.122202], "status": "unsolved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0002", "position": [51.071493, -114.215829], "status": "unsolved", "video": "https://www.youtube.com/embed/wAEzpwvrveg" },
    {"id": "0003", "position": [51.018190, -114.174806], "status": "unsolved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0004", "position": [51.078117, -114.039783], "status": "unsolved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0005", "position": [51.103241, -114.080574], "status": "unsolved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0006", "position": [51.076982, -113.991578], "status": "unsolved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" }
];

const calgaryPosition = [51.048615,-114.070847];
const initSize = 10.7;

var markers;

function popInfo(i) {
    $('#caseId').append(locations[i].id);
    $('#caseLoc').append(locations[i].position[0] + "," + locations[i].position[1]);
    $('#caseStatus').append(locations[i].status);

    let videoSrc = locations[i].video + "?autoplay=1&loop=1";
    $('.videoClip').append("<iframe width=\"auto\" height=\"400px\" src="+ videoSrc +" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
    $('.hover_bkgr_fricc').show();
}

var map;
var myCenter;
var mapProp;
var markers = [];

function setMarkers(i, map){
    let urlstr = "http://maps.google.com/mapfiles/ms/icons/";
    if(locations[i].status === "solved") {
        urlstr += "green-dot.png";
    }
    else if(locations[i].status === "unsolved") urlstr += "red-dot.png";
    else urlstr += "yellow-dot.png";

    let marker = new google.maps.Marker({   // set the markers
        position: new google.maps.LatLng(locations[i].position[0], locations[i].position[1]),
        icon: {
            url: urlstr
        }
    });

    if(locations[i].status === "unsolved"){ // add the animation
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    google.maps.event.addListener(marker, 'click', function() {

        map.setZoom(16);
        map.setCenter(marker.getPosition());
        popInfo(i);
    });

    marker.setMap(map);

    markers.push(marker);
}

function clearMarkers(){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function updateMarkers(i, flag){
    clearMarkers();
    for(let j=0; j<locations.length; j++){
        setMarkers(j, map);
    }
}

$(window).load(function () {
    $('.hover_bkgr_fricc').click(function(){
        map.panTo(myCenter);
        map.setZoom(initSize);
        $('#caseId').empty();
        $('#caseLoc').empty();
        $('#caseStatus').empty();
        $('.videoClip').empty();
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        map.panTo(myCenter);
        map.setZoom(initSize);
        $('#caseId').empty();
        $('#caseLoc').empty();
        $('#caseStatus').empty();
        $('.videoClip').empty();
        $('.hover_bkgr_fricc').hide();
    });
});

function myMap() {
    myCenter = new google.maps.LatLng(calgaryPosition[0], calgaryPosition[1]);

    mapProp= {
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
        center: myCenter,
        zoom: initSize
    };
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

};

var _index=0;
function addFunction() {
    if(_index > 5) return;
    createRow(locations[_index].id, locations[_index].position[0], locations[_index].position[1], locations[_index].status);
    setMarkers(_index, map);
    _index++;
}

function locateMark(i) {    // index of locations
    map.setZoom(16);
    map.setCenter(markers[i].getPosition());
    popInfo(i);
}


function createRow(id, pos0, pos1, sts){
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var ceil5 = row.insertCell(4);


    cell1.innerHTML = id;
    cell2.innerHTML = pos0 + "," + pos1;
    cell3.innerHTML = sts;
    cell4.innerHTML = "2019-02-17";
    ceil5.innerHTML = ' <button type="button" class="btn btn-success disabled" value="delete" >Resolve</button> <button type="button" class="btn btn-warning" value="delete" onclick="actionFunction(this)">Action</button> <button type="button" class="btn btn-danger" value="location" onclick="findLocation(this)">Location</button>'


}

function deleteFunction(r){
    var j = r.parentNode.parentNode.rowIndex;
    var idName = document.getElementById("myTable").rows[j].cells[0].innerText;
    document.getElementById("myTable").deleteRow(j);

    for(let i=0; i<locations.length; i++){
        if(locations[i].id === idName){
            locations[i].status = "solved";
            console.log(idName+"??????"+i);
            updateMarkers(i, false);
            break;
        }
    }


}

function findLocation(m){
    var j = m.parentNode.parentNode.rowIndex;
    var idName = document.getElementById("myTable").rows[j].cells[0].innerText;

    for(let i=0; i<locations.length; i++){
        if(locations[i].id === idName){
            locateMark(i);
            break;
        }
    }
}

function actionFunction(m){
    var j = m.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").rows[j].cells[4].innerHTML = '<button type="button" class="btn btn-success" value="delete" onclick="deleteFunction(this)">Resolve</button> <button type="button" class="btn btn-secondary disabled" value="delete">Action</button> <button type="button" class="btn btn-danger" value="location" onclick="findLocation(this)">Location</button>';
    var idName = document.getElementById("myTable").rows[j].cells[0].innerText;

    for(let i=0; i<locations.length; i++){
        if(locations[i].id === idName){
            locations[i].status = "in progress";
            updateMarkers(i, false);
            break;
        }
    }
}
