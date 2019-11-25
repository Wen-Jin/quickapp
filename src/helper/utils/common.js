/** @format */

export default {
  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },
  setInterval(callback, interval) {
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const loop = () => {
      this.intervalTimer = global.requestAnimationFrame(loop)
      endTime = now()
      if (endTime - startTime >= interval) {
        startTime = endTime = now()
        callback()
      }
    }
    this.intervalTimer = global.requestAnimationFrame(loop)
    return this.intervalTimer
  },
  clearInterval(intervalTimerId) {
    global.cancelAnimationFrame(intervalTimerId)
    intervalTimerId = null
  }
}
