'use strict'

var paginator = (function () {
  var element;

  var self = {
    init: init,
    destroy: destroy

  };
  return self;

  function init(countOfPages, currentPage) {
    element = $('#pagination-demo');
    element.twbsPagination({
      totalPages: countOfPages,
      startPage: 1,
      visiblePages: 10,
      onPageClick: changePage
    });
  }

  function changePage(event, page) {
    flatsList.loadMore(page);
  }

  function destroy() {
    if (element){
      element.twbsPagination('destroy');
    }

  }

})();