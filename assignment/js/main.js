/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */


/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that,
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */


/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

var removeMarkers = function(x) {
  _.map(x,function(x){map.removeLayer(x);});
};


/* =====================
 PART 1: ENTER URL AND CLICK BUTTON TO PLOT DATA
===================== */

// Create Variables to Store Inputs

var url;

// The following is a huge function that will execute only when the button is clicked

$('button').click(function(){
  url = $("#text-input1").val();

  //url = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json";

  var LAT = $("#text-input2").val(); // e.g. City Hall: 39.952346
  var LNG = $("#text-input3").val(); // e.g. City Hall: -75.163685

  // Clean Data

  var downloadData = $.ajax(url);

  var parseData = function(raw_data) {
    var cleaned_data = JSON.parse(raw_data);
    return cleaned_data;
  };


  var makeMarkers = function(cleaned_data) {
    return _.map(cleaned_data, function(x){
      return L.marker([x.Lat,x.Lng]);
    });
  };

  var plotMarkers = function(x) {
    _.map(x,function(x){x.addTo(map);});
  };


  /* =====================
  CODE EXECUTED HERE!
  ===================== */

  downloadData.done(function(data) {
    var parsed = parseData(data);
    var markers = makeMarkers(parsed);
    plotMarkers(markers);
    L.marker([LAT,LNG]).addTo(map);
    //removeMarkers(markers);
  });

}); // end of huge function
