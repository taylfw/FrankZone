"use strict";

function makePalette() {
  const PALLETTE = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "white",
    "black",
  ];

  for (let i = 0; i < PALLETTE.length; i++) {
    const nextColor = PALLETTE[i];
    const newButton = $('<button></button>')
    newButton.css('background', nextColor)
  
    $('.palette').append(newButton)
    
  }
  $('.palette button').first().addClass('active');
}

makePalette();

function makeGrid(){
  for (let i = 0; i < 64; i++) {
    $(".grid").append('<div class="cell"></div>');
  }
}

makeGrid();

function onPaletteClick(){
  let paletteButtons = $('.palette button')
  let x = $(this)
  
  paletteButtons.removeClass('active')
  x.addClass('active')

  $('.palette').click
}

$('.palette button').click(onPaletteClick)


function onGridClick(){

  let brush = $('.palette .active').attr('style')
  let x = $(this)
  
  if($(x).attr('style') === brush) {
    $(x).css('background-color', 'rgba(0, 0, 0, 0')
  } else {
    $(x).attr('style', brush)
  }
  
  $('.grid').click
}

$('.grid .cell').click(onGridClick)

function onClearClick(){

  $('.grid .cell').css('background-color', '');

  $('.controls .clear').click
}
$('.controls .clear').click(onClearClick)

function onFillAllClick(){
  let brush = $('.palette .active').attr('style')
  $('.grid div').attr('style', brush)
  $('.controls .fill-all').click
}
$('.controls .fill-all').click(onFillAllClick)

function onFillEmptyClick(){
  
  const elements = $('.grid .cell')
  let brush = $('.palette .active').attr('style')
  
  for(let i = 0; i < elements.length; i++){
    let nextElement = $(elements[i])
    if(nextElement.css('background-color') === 'rgba(0, 0, 0, 0)'){
      $(nextElement).attr('style', brush)
    }
    
  }

  $('.controls .fill-empty').click

}


$('.controls .fill-empty').click(onFillEmptyClick)