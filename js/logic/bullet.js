class Bullet extends Object {
  constructor({ from: { x: fromX, y: fromY }, to: { x: shootX, y: shootY }, speed }) {
    const radian = direction(fromX, fromY, shootX, shootY)
    const { x, y } = toXY(20, radian)

    super({
      x: fromX - x,
      y: fromY - y,
      color: "yellow",
      radius: 3,
    })

    this.radian = radian;
    this.speed = speed || 1
  }

  update() {
    this.draw()

    const { x, y } = toXY(this.speed, this.radian)

    this.x -= x
    this.y -= y
  }
}