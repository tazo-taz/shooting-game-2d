class LevelEvent extends Object {
  static speed = 1.5
  constructor({ type }) {
    let x, y;

    const ran = Math.random()
    const isX = ran > 0.5

    if (isX) {
      x = Math.random() * canvas.width
      if (ran > 0.75) {
        y = 0
      } else {
        y = canvas.height
      }
    } else {
      y = Math.random() * canvas.height
      if (ran > 0.25) {
        x = 0
      } else {
        x = canvas.width
      }
    }

    let color = "pink"
    if (type === "infinite-shoot") color = "gray"

    super({
      x,
      y,
      color: "pink",
      hp: 5
    })

    this.type = type;
    this.velocity = {
      x: 0,
      y: 0
    }

    if (isX) {
      if (ran > 0.75) {
        this.velocity.y = 1
      } else {
        this.velocity.y = -1
      }
    } else {
      if (ran > 0.25) {
        this.velocity.x = 1
      } else {
        this.velocity.x = -1
      }
    }
  }


  update() {
    this.draw()

    this.x += this.velocity.x * LevelEvent.speed
    this.y += this.velocity.y * LevelEvent.speed
  }

  capture() {
    if (this.type === "aim") player.hasAim = true
    else if (this.type === "infinite-shoot") player.infiniteShoot = level.level + 1
  }
}