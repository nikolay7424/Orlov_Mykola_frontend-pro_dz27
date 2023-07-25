let now = moment()
const year = now.year()
const nextNewYearHoliday = moment()
nextNewYearHoliday.set('year', year)
nextNewYearHoliday.set('month', 11)
nextNewYearHoliday.set('date', 31)
nextNewYearHoliday.set('hour', 23)
nextNewYearHoliday.set('minute', 59)
nextNewYearHoliday.set('second', 59)

let dataDays = Math.abs(now.diff(nextNewYearHoliday, 'days'))
let dataHours = Math.abs(now.diff(nextNewYearHoliday, 'hours')) - ((dataDays) * 24)
let dataMinutes = Math.abs(now.diff(nextNewYearHoliday, 'minutes')) - (Math.abs(now.diff(nextNewYearHoliday, 'hours')) * 60)
let dataSeconds = Math.abs(now.diff(nextNewYearHoliday, 'seconds')) - (Math.abs(now.diff(nextNewYearHoliday, 'minutes')) * 60)

const daysEl = document.querySelector('.days')
const hoursEl = document.querySelector('.hours')
const minutesEl = document.querySelector('.minutes')
const secondsEl = document.querySelector('.seconds')

updateValues()

setInterval(() => {
  now = moment()
  dataDays = Math.abs(now.diff(nextNewYearHoliday, 'days'))
  dataHours = Math.abs(now.diff(nextNewYearHoliday, 'hours')) - ((dataDays) * 24)
  dataMinutes = Math.abs(now.diff(nextNewYearHoliday, 'minutes')) - (Math.abs(now.diff(nextNewYearHoliday, 'hours')) * 60)
  dataSeconds = Math.abs(now.diff(nextNewYearHoliday, 'seconds')) - (Math.abs(now.diff(nextNewYearHoliday, 'minutes')) * 60)
  updateValues()
}, 1000)


function updateValues() {
  if(Number(daysEl.textContent) !== dataDays) {
    updateElement(daysEl, addZero(dataDays))
  }

  if(Number(hoursEl.textContent) !== dataHours) {
    updateElement(hoursEl, addZero(dataHours))
  }

  if(Number(minutesEl.textContent) !== dataMinutes) {
    updateElement(minutesEl, addZero(dataMinutes))
  }

  if(Number(secondsEl.textContent) !== dataSeconds) {
    updateElement(secondsEl, addZero(dataSeconds))
  }
}

function updateElement(element, value) {
  element.textContent = value
}

function addZero(number) {
  if(number < 10) {
    number = '0' + number
  }
  return number
}