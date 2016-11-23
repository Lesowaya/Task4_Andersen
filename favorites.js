'use strict'

var favorites = (function () {
  var favoriteItems = [];

  var self = {
    init: init,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite,
    get: get
  };
  return self;

  function init() {
    load();
    if (favoriteItems.length > 0) flatsList.loadFavorite(favoriteItems);
  }

  function load() {
    var str = localStorage.getItem('favoriteItems');
    if (str) {
      favoriteItems = JSON.parse(str) || [];
    }

  }

  function addFavorite(newObj) {
    favoriteItems.push(newObj);
    saveFavorite();
  }

  function saveFavorite() {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }

  function deleteFavorite(position) {
    if (favoriteItems[position]) {
      localStorage.removeItem('favoriteItems');
      favoriteItems.splice(position, 1);
      saveFavorite();
    }
  }

  function get(page) {
    return favoriteItems.slice(page * 4 - 4, page * 4);
  }

})();