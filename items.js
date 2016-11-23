'use strict'

var items = (function () {
  var items = [];
  var template = '<a href="#modal_form" class="link-modal" onclick="openModal(event, <%-index%>)"><div class="item"><h1><%-header%></h1><img src=<%-url%>><div>';
  template += '<p>Rooms: <%-rooms%></p><p>Price:<%-price%></p><p>Type: <%-type%> </p></div><i class="fa fa-2x';
  template += ' fa-star" onclick="items.addOrRemoveFavorite(<%-index%> , event)" aria-hidden="true"></i></div></a>';

  var self = {
    init: init,
    addOrRemoveFavorite: addOrRemoveFavorite,
    get: get,
    showMsgNotFound:showMsgNotFound,
    loadNewItems: function () { }
  };
  return self;

  function init(response) {
    items = response;
    createItemsFromTemplate();

  }

  function showMsgNotFound() {
    var itemsOnThePage = '<div class="item sorry-item">Sorry, no matches were found for your request.</div>';
    $('.item').remove();
    $(".results:first").prepend(itemsOnThePage);
    paginator.destroy();
    itemsAnimation();

  }

  function createItemsFromTemplate() {

    var itemsOnThePage = "";
    for (var i = 0; i < items.length; i++) {
      var div = _.template(template)({
        header: items[i].title.length>35 ?
          items[i].title.slice(0,35).toLowerCase() + "..." : items[i].title.toLowerCase(),
        url: items[i].img_url,
        price: items[i].price_formatted,
        rooms: items[i].room_number,
        type: items[i].property_type,
        index: i
      });
      itemsOnThePage += div;
    }
    $('.item').remove();
    $(".results:first").prepend(itemsOnThePage);
    itemsAnimation();
  }

  function addOrRemoveFavorite(index, event) {

    if (!$(event.target).hasClass( "i-color" )){
      favorites.addFavorite(items[index]);
    } else {
      favorites.deleteFavorite(index);
    }
    event.target.classList.toggle('i-color');
  }

  function get(index) {
    return items[index];
  }



})();

