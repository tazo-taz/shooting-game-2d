class Object {
  constructor({
    x, y, radius, color, hp
  }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.hp = hp
  }

  draw() {
    const radius = this.radius !== undefined ? this.radius : 10 + this.hp * 5

    if (radius < 0) return


    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  get isOutside() {
    return this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height
  }
}