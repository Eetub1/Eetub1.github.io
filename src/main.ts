import "./style.css"
import { mountLayout } from "./layout"

mountLayout()

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const cellSize = 18
let cols = 0
let rows = 0

let fps = 35
let lastTime = 0
let interval = 1000 / fps // how many ms between animationframes
let timer = 0

// Contains the row position of every single character
let drops: number[]
// What character is at each column
let dropChar: string[]

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"

function getRandomChar(): string {
    const index = Math.floor(Math.random() * chars.length)
    return chars[index]
}


function start() {
    canvas = document.querySelector<HTMLCanvasElement>("#canvas")!
    ctx = canvas.getContext("2d")!

    resize()
 
    requestAnimationFrame(animate)
}
 

function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.textBaseline = "top"
    ctx.fillStyle = "#00FF41"
    ctx.font = `${cellSize}px 'JetBrains Mono', monospace`
 
    cols = Math.floor(canvas.width / cellSize)
    rows = Math.floor(canvas.height / cellSize)

    drops = Array.from({length: cols}, () => Math.floor(Math.random() * -rows))
    dropChar = Array.from({length: cols}).fill("").map(_ => getRandomChar())
}


function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    timer += deltaTime

    if (timer > interval) {
        timer = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const maxRow = rows
        for (let i = 0; i < drops.length; i++) {
            const rowVal = drops[i]

            if (rowVal >= maxRow) {
                drops[i] = 0
                dropChar[i] = getRandomChar()
            } else {
                drops[i] += 1
            }
            ctx.fillText(dropChar[i], i * cellSize, rowVal * cellSize)
        } 
    }
    requestAnimationFrame(animate)
}
 
 
window.addEventListener("resize", resize)
start()