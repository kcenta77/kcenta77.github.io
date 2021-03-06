// Generated by CoffeeScript 1.8.0
(function() {
  var colours, coloursStar, dog, star;

  colours = ['blue', 'green', 'pink', 'moreblue', 'black'];

  coloursStar = ['purple', 'pink', 'yellow'];

  dog = document.querySelector('dog');

  star = document.querySelector('star');

  dog.onclick = function() {
    var colour;
    colour = colours.shift();
    dog.classList.remove(colours[colours.length - 1]);
    dog.classList.add(colour);
    return colours.push(colour);
  };

  star.onclick = function() {
    var colour;
    colour = coloursStar.shift();
    star.classList.remove(coloursStar[coloursStar.length - 1]);
    star.classList.add(colour);
    return coloursStar.push(colour);
  };

}).call(this);
