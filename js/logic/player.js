class Player extends Character {
  constructor({ ...data }) {
    super(data)

    this.hasAim = false
  }

  draw() {
    super.draw()

    this.drawAim()
  }

  drawAim(aimCoord) {
    if (aimCoord && this.hasAim) {
      const radian = direction(this.x, this.y, aimCoord.x, aimCoord.y)
      const { x, y } = toXY(Math.max(canvas.height, canvas.width), radian)

      ctx.save()
      ctx.beginPath()
      ctx.setLineDash([10, 10])
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(this.x - x, this.y - y)
      ctx.strokeStyle = "orange"
      ctx.stroke()
      ctx.restore()
    }
  }

  update() {
    super.update()

    this.eventCollision()
  }

  eventCollision() {
    level.events.forEach((event) => {
      this.bullets.forEach((bullet) => {
        if (circleCollision(bullet, event)) {
          event.hp--
          setTimeout(() => {
            this.bullets = this.bullets.filter(a => a !== bullet)
            if (event.hp <= 0) {
              event.capture()
              level.events = level.events.filter(a => a !== event)
              level.eventSchedule.find((a) => a.type === event.type).captured = true
            }
          })
        }
      })
    })
  }
}