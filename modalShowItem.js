'use strict'

var modalShowItem = (function () {
  var item = {};
  var template = '<div class="item-info"><h1 class="modal-h1"><%-title%></h1><i class="fa fa-3x fa-pencil" ';
  template += 'aria-hidden="true" onclick="edit()"></i><img src="<%-src%>" class="modal-img"><br>';
  template += '<p>Rooms: <%-rooms%></p><p>Type: <%-type%></p><p>Price: <%-price%></p><p>Price type: <%-priceType%></p>';
  template += '<p>Bedrooms: <%-beds%></p><p>Bathrooms: <%-bath%></p><p>Car spaces: <%-cars%></p><p>Update: .<%-update%></p></div>';

  template += '<div class="item-info-change"><h1 class="modal-h1"><%-title%></h1><form class="form-change"><label>Rooms: <input ';
  template += 'type="number" name="rooms" min="0" max="100" placeholder="<%-rooms%>"></label><label>Type: <input type="text" name="type" placeholder="<%-type%>"></label>';
  template += '<label>Price: <input type="text" name="price" placeholder="<%-price%>"></label><label>Price type: <input type="text" name="priceType"';
  template += 'placeholder="<%-priceType%>"></label><label>Bedrooms: <input type="number" name="beds" min="0" max="100" placeholder="<%-beds%>"></label>';
  template += '<label>Bathrooms: <input type="number" name="bath" min="0" max="100" placeholder="<%-bath%>"></label><label>Car spaces:';
  template += '<input type="number" name="cars" min="0" max="100" placeholder="<%-cars%>"></label> <label>Update: <input type="number" name="update" min="0"';
  template += 'placeholder="<%-update%>"></label><div class="modal-i"><i class="fa fa-3x fa-check" id="close-modal"';
  template += 'onclick ="submit()" aria-hidden="true"></i>';
  template += '<i class="fa fa-3x fa-chevron-left"  onclick="back()" aria-hidden="true"></i></div></form></div>';


  var self = {
    init: init
  };
  return self;

  function init(index) {
    item = items.get(index);
    createItemsFromTemplate();

  }

  function createItemsFromTemplate() {

    var itemOnThePage = _.template(template)({
      title: item.title || '',
      src: item.img_url || '',
      rooms: item.room_number || '',
      priceType: item.price_type || '',
      beds: item.bedroom_number || '',
      bath: item.bathroom_number || '',
      cars: item.car_spaces || '',
      update: item.updated_in_days || '',
      price: item.price_formatted || '',
      type: item.property_type || ''
      });
    $('.item-info').remove();
    $('.item-info-change').remove();
    $(".modal-info:first").prepend(itemOnThePage);
  }

})();

