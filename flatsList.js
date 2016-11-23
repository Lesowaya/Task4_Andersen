'use strict'

var flatsList = (function () {
  var listing_type;
  var price_min ;
  var price_max;
  var bedroom_min;
  var bedroom_max;
  var room_min;
  var room_max;
  var sort;
  var bathroom_min ;
  var bathroom_max;
  var has_photo;
  var url;
  var value;
  var page = 1;
  var favorite = true;

  var self = {
    init: init,
    loadMore: loadMore,
    loadFavorite: loadFavorite
  };
  return self;

  function init(_url, _value) {
    loadingAnimation(true);
    url = _url;
    value = _value;
    favorite = false;
    loadParametrs();
    load(createItems, errorOfLoad);
  }

  function loadParametrs() {
    listing_type = $('[name = type]:checked').val();
    price_min = $('[name = price_min]:first').val() || 0;
    price_max = $('[name = price_max]:first').val() || 999999999;
    bedroom_min = $('[name = bedroom_min]:first').val() || 0;
    bedroom_max = $('[name = bedroom_max]:first').val() || 99;
    room_min = $('[name = room_min]:first').val() || 0;
    room_max = $('[name = room_max]:first').val() || 99;
    bathroom_min = $('[name = bathroom_min]:first').val() || 0;
    bathroom_max = $('[name = bathroom_max]:first').val() || 99;
    has_photo = $('[name = has_photo]:checked').length == 1 ? 1 : 0;
    sort = $('[name = sort]:checked').val();
    $('.params')[0].reset();
  }
  
  function load(onSuccess, onError) {
    $.ajax({
      url: 'http://' + url + '/api',

      dataType: 'jsonp',

      data: {
        place_name: value,
        encoding: 'json',
        pretty: 1,
        number_of_results: 4,
        page: page,
        action: 'search_listings',
        listing_type: listing_type,
        price_min: price_min,
        price_max: price_max,
        bedroom_min: bedroom_min,
        bedroom_max: bedroom_max,
        room_min: room_min,
        room_max: room_max,
        bathroom_min: bathroom_min,
        bathroom_max: bathroom_max,
        has_photo: has_photo,
        sort: sort
      },

      success: onSuccess,
      error: onError

    });
  }

  function loadMore(_page) {
    page = _page;
    if (favorite) {
      items.init(loadMoreFavorite());
      $(".item i").addClass('i-color');
    } else {
      loadingAnimation(true);
      setTimeout(function(){
        load(successLoadMore, errorOfLoad)
      } , 1000);
    }
  }

  function errorOfLoad() {
    alert("Sorry. We couldn't connect to server. Please try later or check your request");
  }

  function createItems(response) {

    if (response.response.total_results == 0) {
      items.showMsgNotFound();
      return;
    }
    items.loadNewItems = loadMore;
    paginator.destroy();
    if (response.response.total_results > 4) {
      paginator.init(Math.ceil(response.response.total_results /4), response.response.page );
    }
  }

  function successLoadMore(response) {
    items.init(response.response.listings);
    loadingAnimation(false);
  }

  function loadFavorite(favoriteItems) {
    paginator.destroy();
    favorite = true;
    if (favoriteItems.length > 4) {
      paginator.init(Math.ceil(favoriteItems.length / 4), 1);
      paginationAnimation();
    }
    if (favoriteItems.length > 0) {
      items.init(favoriteItems.slice(0, 4));
    }
    $(".item i").addClass('i-color');

  }

  function loadMoreFavorite() {

    return favorites.get(page);
  }

})();
