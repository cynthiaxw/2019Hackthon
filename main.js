
var locations = [
    {"id": "0001", "position": [51.081018, -114.122202], "status": "unsolved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0002", "position": [51.071493, -114.215829], "status": "unsolved", "video": "https://www.youtube.com/embed/wAEzpwvrveg" },
    {"id": "0003", "position": [51.018190, -114.174806], "status": "solved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0004", "position": [51.078117, -114.039783], "status": "solved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0005", "position": [51.103241, -114.080574], "status": "in progress", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" },
    {"id": "0006", "position": [51.076982, -113.991578], "status": "in progress", "video": "https://www.youtube.com/embed/aEzZLXBH3rU" }
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


function myMap() {
    let myCenter = new google.maps.LatLng(calgaryPosition[0], calgaryPosition[1]);

    let mapProp= {
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
    let map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    var infowindow = new google.maps.InfoWindow;

    for(let i=0; i<locations.length; i++){
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

        marker.setMap(map);
    }

};
