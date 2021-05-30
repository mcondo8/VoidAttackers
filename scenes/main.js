// Constants
const MOVE_SPEED = 200
const INVADER_SPEED = 80
const TIME_LEFT = 50
const LEVEL_DOWN = 80
const BULLET_SPEED = 300
const MAX_BULLETS = 4
//Global Variables
let CURRENT_INV_SPEED = INVADER_SPEED
let CURR_BULLETS = 0


//Layers
layer(['obj', 'ui'], 'obj')
//Map Setup

addLevel([
  '!^^^^^^^^^     &', 
  '!^^^^^^^^^     &',
  '!^^^^^^^^^     &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &',
  '!              &'

], {
  width: 30,
  height: 22,
  '^' : [sprite('space_invader'), 'space-invader', scale(0.7)],
  '!' : [sprite('wall-left'), 'left-wall'],
  '&' : [sprite('wall-right'), 'right-wall']

})



// Player Interactions
keyDown('right', () =>{
  player.move(MOVE_SPEED, 0)
})

keyDown('left', () =>{
  player.move(-MOVE_SPEED, 0)
})

keyPress('space', () => {
  spawn_bullet(player.pos.add(0, 0))
})

//Functions
function spawn_bullet(p){
  if(CURR_BULLETS < MAX_BULLETS){
    add([rect(6, 18), 
    pos(p),
    origin('center'),
    color(.5, 0.5, 1), 
    'bullet'
    ])
    CURR_BULLETS++
  }
}

// Object Setup
const player = add([
  sprite('space-ship'), 
  pos(width()/2, height()-LEVEL_DOWN), 
  origin('center')
])

const score = add([
  text('0'),
  pos(400, 10), 
  layer('ui'),
  scale(3),
  {
    value: 0
  }
])

const timer = add([
  text("0"),
  pos(400, 40), 
  scale(2), 
  layer('ui'), 
  {
    time: TIME_LEFT
  }
])

timer.action(() =>{
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)

  if (timer.time <= 0) {
    go('end_game', {score: score.value, message: "Time Up!"})
  }
})

action('space-invader', (s) => {
  s.move(CURRENT_INV_SPEED, 0)
})

collides('space-invader', 'right-wall', () => {
  CURRENT_INV_SPEED = -CURRENT_INV_SPEED
  every('space-invader', (s) =>{
    s.move(0, LEVEL_DOWN)
  })
})

collides('space-invader', 'left-wall', () => {
  CURRENT_INV_SPEED = -CURRENT_INV_SPEED
  every('space-invader', (s) =>{
    s.move(0, LEVEL_DOWN)
  })
})

player.overlaps('space-invader', () => {
  go('end_game', {score: score.value, message: "Game Over Man..."} )
})

action('space-invader', (s) => {
  if (s.pos.y >= height()) {
    go('end_game', {score: score.value, message: "Game Over Man..."} )
  }
})

action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if(b.pos.y < 0){
    destroy(b)
    CURR_BULLETS--
  }
})

collisdes('bullet', 'space-invader', (b,s) => {
  score++
  destroy(b)
  destroy(s)
})