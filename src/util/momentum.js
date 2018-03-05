export function momentum(current, start, time, lowerMargin, wrapperSize, options) {
  let distance = current - start
  let speed = Math.abs(distance) / time
      speed = Math.min(speed, 3)
  let {deceleration, itemHeight, swipeBounceTime, wheel, swipeTime} = options
  let duration = swipeTime
  let rate = wheel ? 4 : 15

  let destination = current + speed / deceleration * (distance < 0 ? -1 : 1)

  if (wheel && itemHeight) {
    destination = Math.round(destination / itemHeight) * itemHeight
  }

  let bounceDistance = options.bounceDistance || (wrapperSize / rate * speed)
  if (destination < lowerMargin) {
    destination = wrapperSize ? lowerMargin - bounceDistance : lowerMargin
    duration = swipeBounceTime
  } else if (destination > 0) {
    destination = wrapperSize ? bounceDistance : 0
    duration = swipeBounceTime
  }

  return {
    destination: Math.round(destination),
    duration
  }
}
