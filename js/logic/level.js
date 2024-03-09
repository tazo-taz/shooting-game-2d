class Level {
  constructor() {
    this._level = 0
    this.startDate = new Date()
    this.eventSchedule = [
      {
        level: [2, 9],
        type: 'aim',
        once: true,
        captured: false,
      },
      {
        level: [8],
        type: 'infinite-shoot',
        once: true
      },
    ]
    this.events = []
  }

  get level() {
    return this._level === -1 ? 0 : this._level
  }

  thrown(type) {
    const event = this.eventSchedule.find((event) => event.type === type)
    event.level = event.level.filter((lvl) => lvl !== this.level)
  }

  handleSpawnEnemies() {
    const first = enemiesSpawnTime.find(a => !a.used) || enemiesSpawnTime.at(-1)
    if (first && new Date() - this.startDate > first.ms) {
      this._level++
      first.used = true
      player.addEnemies(generateEnemies(first.count))
      if (enemiesSpawnTime.filter(a => !a.used).length === 0) {
        first.ms += first.delay
      }
    }
  }

  handleLevelChange() {
    this.eventSchedule.forEach((event) => {
      const { level, type, captured, once } = event

      if (level.includes(this.level) && (captured ? once ? false : true : true)) {
        const levelEvent = new LevelEvent({ type })
        this.events.push(levelEvent)
        this.thrown(type)
      }
    })
  }

  update() {
    this.handleSpawnEnemies()
    this.handleLevelChange()

    this.events.forEach((event) => {
      event.update()

      if (event.isOutside) {
        setTimeout(() => {
          this.events = this.events.filter((a) => a !== event)
        })
      }
    })
  }
}