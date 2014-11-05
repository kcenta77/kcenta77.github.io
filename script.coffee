colours = [
           'blue'
           'green'
           'pink'
           'moreblue'
           'black'
]
coloursStar = [
           'purple'
           'pink'
           'yellow'
]

dog = document.querySelector('dog')
star = document.querySelector('star')

dog.onclick = ->
  colour = colours.shift()
  dog.classList.remove(colours[colours.length - 1])
  dog.classList.add(colour)
  colours.push(colour)

star.onclick = ->
  colour = coloursStar.shift()
  star.classList.remove(coloursStar[coloursStar.length - 1])
  star.classList.add(colour)
  coloursStar.push(colour)
