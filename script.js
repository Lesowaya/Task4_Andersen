'use strict'

window.onload = function () {
  favorites.init();
  document.getElementsByClassName("choose-country")[0].onclick = changeActiveCountry;
  $(".arrow").click(changeActiveParametrs);
  $(".arrow-sort").click(changeActiveSort);
};

function changeActiveCountry(event) {
  if (event.target.hasAttribute('data-api')){
    document.getElementsByClassName('active-country')[0].classList.remove('active-country');
    event.target.classList.add('active-country');
  }
}

function showVariantsOfPlace() {
  var value = document.getElementById("city-variants").value;
  if (value.length>0){
    var country = document.getElementsByClassName('active-country')[0];
    var url = country.getAttribute('data-api');
    flatsList.init(url, value);
  } else showErrorEmptyRequest();
}

function showVariantsOfCities(event) {
  if ((event.keyCode >36) && (event.keyCode < 41)) return;
  if (event.keyCode == 13) {
    showVariantsOfPlace();
    return;
  }
  var value = document.getElementById("city-variants").value;
  $("#cities-list").empty();
  if (value.length>0){
    var country = document.getElementsByClassName('active-country')[0];
    var language = country.getAttribute('data-language');
    country = country.getAttribute('data-country');
    citiesList.init(country, language, value);
  }
}

function loadingAnimation(_switch) {
  $('.bg-load:first').toggleClass("show",  _switch);
}

 function openModal(event, index){
   if ($(event.target).hasClass("fa-star")) return;
    event.preventDefault();
   modalShowItem.init(index);
    $(".size-body:first").addClass("blur");
    $('#overlay').fadeIn(200,
      function(){
        $('#modal_form')
          .css('display', 'block')
          .animate({opacity: 1, top: '12vh'}, 150);
      });

  }


$(document).ready(function() {
  $('#modal_close, #overlay').click( closeModal);
});

function closeModal() {
  $(".size-body:first").removeClass("blur");
  $('#modal_form')
    .animate({opacity: 0, top: '7vh'}, 150,
      function(){
        $(this).css('display', 'none');
        $('#overlay').fadeOut(200);
      }
    );
}

function edit() {
  $.when($(".item-info").fadeToggle("fast")).then(function(){
    $(".item-info-change").fadeToggle("fast")
  });
}

function back() {
  $.when($(".item-info-change").fadeToggle("fast")).then(function(){
    $(".item-info").fadeToggle("fast")
  });
}

function submit() {
  var item = {title: $(".modal-h1:first").text()|| '',
      img_url: $(".modal-img").attr("src") || '',
      room_number: $("input[name ='rooms']").val() || $("input[name ='rooms']").attr("placeholder"),
      price_type: $("input[name ='priceType']").val() || $("input[name ='priceType']").attr("placeholder"),
      bedroom_number: $("input[name ='beds']").val() || $("input[name ='beds']").attr("placeholder"),
      bathroom_number: $("input[name ='bath']").val() || $("input[name ='bath']").attr("placeholder"),
      car_spaces: $("input[name ='cars']").val() || $("input[name ='cars']").attr("placeholder"),
      updated_in_days: $("input[name ='update']").val() || $("input[name ='update']").attr("placeholder"),
      price_formatted: $("input[name ='price']").val() || $("input[name ='price']").attr("placeholder"),
      property_type: $("input[name ='type']").val() || $("input[name ='type']").attr("placeholder")
  } || '';
  closeModal();
  addToFavoriteMsg();
  favorites.addFavorite(item);
}

function addToFavoriteMsg() {
  setTimeout(function(){$('.msg').fadeToggle('slow', "linear")},100);
  setTimeout(function(){$('.msg').fadeToggle('slow', "linear")},2000);
}

function itemsAnimation() {
  $('.item').fadeIn(500,
    function(){
      $('.item')
        .css('display', 'inline-block')
        .animate({opacity: 1, top: '0'}, 300);
    });
}

function paginationAnimation() {
  $('.pagination').fadeIn(500,
    function(){
      $('.pagination')
        .css('display', 'block')
        .animate({opacity: 1, bottom: '2.5vh'}, 300);
    });
}

function changeActiveParametrs() {
  $( ".arrow" ).hasClass( "fa-chevron-left" ) ? offParams() : onParams();
}

function onParams() {
  $(".parametrs-with-i").animate({left: '0'}, 300);
  $( ".arrow" ).addClass("fa-chevron-left")
    .removeClass("fa-chevron-right");
}


function offParams() {
  $(".parametrs-with-i").animate({left: '-16vw'}, 300);
  $( ".arrow" ).addClass("fa-chevron-right")
    .removeClass("fa-chevron-left");
}

function changeActiveSort() {
  $( ".arrow-sort" ).hasClass( "fa-chevron-left" ) ? onSort() : offSort();
}

function offSort() {
  $(".sort-with-i").animate({right: '-16vw'}, 300);
  $( ".arrow-sort" ).addClass("fa-chevron-left")
    .removeClass("fa-chevron-right");
}


function onSort() {
  $(".sort-with-i").animate({right: '0'}, 300);
  $( ".arrow-sort" ).addClass("fa-chevron-right")
    .removeClass("fa-chevron-left");
}

function showErrorEmptyRequest() {
  $("#city-variants").addClass('error');
  setTimeout(function(){
    $("#city-variants").removeClass('error');
  } , 1000);
}