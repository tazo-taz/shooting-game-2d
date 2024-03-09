const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const player = new Player({
  x: canvas.width / 2,
  y: canvas.height / 2,
  color: "white",
  bulletSpeed: 10,
  name: "Player1",
  hp: 10
})

const level = new Level()

let aimCoord = null

function animate() {
  requestAnimationFrame(animate)

  if (player.hp <= 0) return

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fill()

  for (const enemy of player.enemies) {
    enemy.update()
  }

  player.drawAim(aimCoord)
  player.update()

  if (player.infiniteShootEnable) {
    player.shoot(aimCoord?.x, aimCoord?.y)
  }

  level.update()

}

animate()


addEventListener("mousemove", ({ x, y }) => {
  aimCoord = { x, y }
})

addEventListener("click", ({ x, y }) => {
  player.shoot(x, y)
})

addEventListener("keydown", ({ key }) => {
  if (["w", "W", "ArrowUp"].includes(key)) {
    player.y -= 4
  } else if (["s", "S", "ArrowDown"].includes(key)) {
    player.y += 4
  } else if (["a", "A", "ArrowLeft"].includes(key)) {
    player.x -= 4
  } else if (["d", "D", "ArrowRight"].includes(key)) {
    player.x += 4
  }
})