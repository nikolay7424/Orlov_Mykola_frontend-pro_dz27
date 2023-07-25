const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArr = []
const snowParticlesArr = []

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
})

const mouse = {
  x: null,
  y: null,
}

canvas.addEventListener('click', function(e) {
  mouse.x = e.x
  mouse.y = e.y
  for(let i = 0; i < 100; i++) {
    particlesArr.push(new Particle())
  }
})

class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random() * 20 + 1
    this.speedX = Math.random() * 3
    this.speedY = Math.random() * 3
    this.signX = Math.round(Math.random()) === 0 ? '+' : '-'
    this.signY = Math.round(Math.random()) === 0 ? '+' : '-'
    this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`
  }
  update() {

    if(this.x > canvas.width - this.size) {
      this.signX = '-'
    }
    if(this.x < this.size) {
      this.signX = '+'
    }

    if(this.y > canvas.height - this.size) {
      this.signY = '-'
    }
    if(this.y < this.size) {
      this.signY = '+'
    }


    if(this.signX === '+') {
      this.x += this.speedX
    } else if (this.signX === '-') {
      this.x -= this.speedX
    }

    if(this.signY === '+') {
      this.y += this.speedY
    } else if (this.signY === '-') {
      this.y -= this.speedY
    }
    
    if(this.size > 0.1) {
      this.size -= 0.1
    }

  }
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

class SnowParticle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * (canvas.height / 50)
    this.size = Math.random() * 8 + 1
    this.speedX = Math.random() * 5
    this.speedY = Math.random() * 5
    this.signX = Math.round(Math.random()) === 0 ? '+' : '-' 
    this.signY = '+'
  }
  update() {
    if(this.x > canvas.width - this.size) {
      this.signX = '-'
    }
    if(this.x < this.size) {
      this.signX = '+'
    }

    if(this.y > canvas.height - this.size) {
      this.signY = '-'
    }
    if(this.y < this.size) {
      this.signY = '+'
    }


    if(this.signX === '+') {
      this.x += this.speedX
    } else if (this.signX === '-') {
      this.x -= this.speedX
    }

    if(this.signY === '+') {
      this.y += this.speedY
    } else if (this.signY === '-') {
      this.y -= this.speedY
    }
    
    if(this.size > 0.1) {
      this.size -= 0.05
    }

  }
  draw() {
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function init() {
  snowParticlesArr.push(new SnowParticle())
}



function particlesHandler() {
  for(let i = 0; i < particlesArr.length; i++) {
    particlesArr[i].update()
    particlesArr[i].draw()
    if(particlesArr[i].size < 0.5) {
      particlesArr.splice(i, 1)
      i--
    }
  }

  for(let j = 0; j < snowParticlesArr.length; j++) {
    snowParticlesArr[j].update()
    snowParticlesArr[j].draw()

    if(snowParticlesArr[j].size < 0.1) {
      snowParticlesArr.splice(j, 1)
      j--
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  init()
  let inertvalId = setInterval(init, 5000)
  clearInterval(inertvalId)
  particlesHandler()
  requestAnimationFrame(animate)
}

animate()

