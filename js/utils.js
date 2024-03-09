function random(value) {
  return value[Math.floor(Math.random() * value.length)]
}

function toXY(mag, dir) {
  return {
    x: mag * Math.cos(dir),
    y: mag * Math.sin(dir),
  }
}

function magnitude(x, y) {
  return Math.hypot(x, y)
}

function direction(x1, y1, x2, y2) {
  const x = x1 - x2
  const y = y1 - y2
  return Math.atan2(y, x)
}

function circleCollision({ x: p1x, y: p1y, hp: hp1, radius: radius1 }, { x: p2x, y: p2y, hp: hp2, radius: radius2 }) {
  const r1 = radius1 !== undefined ? radius1 : 10 + hp1 * 5
  const r2 = radius2 !== undefined ? radius2 : 10 + hp2 * 5
  var a;
  var x;
  var y;

  a = r1 + r2;
  x = p1x - p2x;
  y = p1y - p2y;

  if (a > Math.sqrt((x * x) + (y * y))) {
    return true;
  } else {
    return false;
  }
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

function generateEnemies(count = 5) {
  const enemies = []
  for (let i = 0; i < count; i++) {
    enemies.push(new Enemy(player))
  }
  return enemies
}