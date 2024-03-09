class Enemy extends Character {
  constructor(enemy) {
    let x, y;

    const ran = Math.random()
    const isX = ran > 0.5

    if (isX) {
      x = Math.random() * canvas.width
      y = ran > 0.75 ? 0 : canvas.height
    } else {
      y = Math.random() * canvas.height
      x = ran > 0.25 ? 0 : canvas.width
    }

    const hp = Math.ceil(Math.random() * 3)

    super({
      x,
      y,
      color: random(colors),
      hp
    })

    this.addEnemies([enemy])
  }

  update() {
    super.update();

    const dir = direction(this.x, this.y, canvas.width / 2, canvas.height / 2)
    const { x, y } = toXY(0.5, dir);

    this.x -= x;
    this.y -= y;


    // if (Math.random() < 0.0005) {
    //   const enemy = random(this.enemies)
    //   this.shoot(enemy.x, enemy.y)
    // }
  }
}