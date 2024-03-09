class Character extends Object {
  constructor({ bulletSpeed, ...data }) {

    super(data)

    this.bullets = []
    this.enemies = []
    this.bulletSpeed = bulletSpeed
    this.infiniteShoot = undefined
  }

  get infiniteShootEnable() {
    return this.infiniteShoot >= level.level
  }

  shoot(x, y) {
    const { x: fromX, y: fromY } = this
    this.bullets.push(new Bullet({ from: { x: fromX, y: fromY }, to: { x: x, y }, speed: this.bulletSpeed }))
    // this.bullets.push(new Bullet({ from: { x: fromX, y: fromY }, to: { x: x + 4, y: y + 4 }, speed: this.bulletSpeed }))
    // this.bullets.push(new Bullet({ from: { x: fromX, y: fromY }, to: { x: x + 8, y: y + 8 }, speed: this.bulletSpeed }))
    // this.bullets.push(new Bullet({ from: { x: fromX, y: fromY }, to: { x: x + 12, y: y + 12 }, speed: this.bulletSpeed }))
  }

  update() {
    this.draw()

    this.bullets.forEach((bullet) => {
      bullet.update()

      if (bullet.isOutside) {
        setTimeout(() => {
          this.bullets = this.bullets.filter(a => a !== bullet)
        })
      }

      this.enemies.forEach((enemy) => {
        this.bullets.forEach((bullet) => {
          if (circleCollision(bullet, enemy)) {
            enemy.hp--
            setTimeout(() => {
              this.bullets = this.bullets.filter(a => a !== bullet)
              if (enemy.hp <= 0)
                this.enemies = this.enemies.filter(a => a !== enemy)
            })
          }
        })
      })
    })

    this.enemies.forEach((enemy) => {
      if (circleCollision(enemy, this)) {
        setTimeout(() => {
          const enemyHp = enemy.hp
          this.enemies = this.enemies.filter(a => a !== enemy)

          this.hp -= enemyHp
        })
      }
    })
  }

  addEnemies(enemies) {
    this.enemies = [...this.enemies, ...enemies]
  }
}