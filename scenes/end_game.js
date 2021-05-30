const LAYER_HEIGHT = 80
add([
  text(args.score),
  origin('center'),
  scale(5),
  pos(width()/2, height() /2)
])

add([
  text(args.message),
  origin('center'),
  scale(2),
  pos(width()/2, height() /2-LAYER_HEIGHT)
])