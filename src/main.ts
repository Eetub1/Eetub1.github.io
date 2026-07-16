import "./style.css"

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const fontSize = 16
let columns = 0
let rainDrops: number[] = []

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

// Make sure animation is the same speed for every screen with differing refresh rates
const speed = 0.015
 
function start() {
    canvas = document.querySelector<HTMLCanvasElement>("#canvas")!
    ctx = canvas.getContext("2d")!
 
    resize()
 
    requestAnimationFrame(draw)
}
 
 
function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
 
    columns = Math.floor(canvas.width / fontSize)
 
    const rows = canvas.height / fontSize
    rainDrops = []
    for (let i = 0; i < columns; i++) {
        rainDrops[i] = Math.random() * rows - rows * 0.5
    }
}
 
 
function draw() {
    requestAnimationFrame(draw)
}
 
 
window.addEventListener("resize", resize)
start()