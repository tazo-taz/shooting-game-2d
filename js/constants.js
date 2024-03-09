const colors = ["red", "green", "blue", "orange", "purple"]

const enemiesSpawnTime = [
  {
    ms: 3000,
    count: 5,
    used: false,
  },
  {
    ms: 3500,
    count: 6,
    used: false,
  },
  {
    ms: 5000,
    count: 7,
    used: false,
  },
  {
    ms: 5000,
    count: 8,
    used: false,
  },
  {
    ms: 6000,
    count: 9,
    used: false,
  },
  {
    ms: 6000,
    count: 10,
    used: false,
  },
  {
    ms: 6000,
    count: 12,
    used: false,
  },
  {
    ms: 6000,
    count: 14,
    used: false,
  },
  {
    ms: 6000,
    count: 200,
    used: false,
  },
  {
    ms: 6000,
    count: 18,
    used: false,
  },
].map((time, inx, arr) => ({
  ...time,
  ms: sum(arr.slice(0, inx + 1).map(a => a.ms))
})).map((time, inx, arr) => ({
  ...time,
  delay: time.ms - (arr[inx - 1]?.ms || 0),
}))