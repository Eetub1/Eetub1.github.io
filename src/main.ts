import "./style.css"

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const cellSize = 12
let cols = 0
let rows = 0

let lastTime = 0
let interval = 1000 / 20 // how many ms between animationframes
let timer = 0

// Contains the row position of every single character
let drops: number[]

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
}

// create an array of length cols so that it has indexes [0, ... , cols - 1]
// the value in each position tells to which row the character is placed

function getRandomRow(): number {
    // return a random row in range [0,row[ where the num is an int
    return Math.floor(Math.random() * rows)
}


function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    timer += deltaTime

    if (timer > interval) {
        timer = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        /*for (let col = 0; col < cols; col += 1) {
            ctx.fillText("A", col * cellSize, getRandomRow() * cellSize)
        }*/

        const maxRow = rows
        for (let i = 0; i < drops.length; i++) {
            const rowVal = drops[i]

            if (rowVal >= maxRow) {
                drops[i] = 0
            } else {
                drops[i] += 1
            }
            ctx.fillText(getRandomChar(), i * cellSize, rowVal * cellSize)
        } 
    }
    requestAnimationFrame(animate)
}
 
 
window.addEventListener("resize", resize)
start()