'use strict'

var citiesList = (function () {
  var value;
  var template = '<option value="<%-value%>"></option>';
  var country;
  var language;


  var self = {
    init: init
  };
  return self;

  function init(_country, _language, _value) {
    value = _value;
    country =_country;
    language = _language;
    load(createItems ,errorOfLoad);
  }

  function load(onSuccess, onError) {
    var autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({
      input: value,
      types: ['(cities)'],
      componentRestrictions: {
        country: country
      }
    }, function (results, status){
      if ((status === google.maps.places.PlacesServiceStatus.OK) ||
        (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS)){
        if (status === google.maps.places.PlacesServiceStatus.OK)
        createItems(results);
      } else {
        errorOfLoad(status);
      }
    });
  }


  function errorOfLoad() {
    alert("Sorry. We couldn't connect to server. Please try later or check your request");
  }

  function createItems(response) {
    var options ='';
    response.forEach(function(item, i, arr){
      var option =_.template(template)({
        value: item.structured_formatting.main_text
      });
      options +=option;
    });
    $("#cities-list").prepend(options);
  }



})();

