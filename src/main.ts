import "./style.css"

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const cellSize = 4
let cols = 0
let rows = 0

let lastTime = 0
let interval = 1000 / 3 // how many ms between animationframes
let timer = 0

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"

function getRandomChar() {
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
 
    cols = Math.floor(canvas.width / cellSize)
    rows = Math.floor(canvas.height / cellSize)
}
 

function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    timer += deltaTime

    if (timer > interval) {
        timer = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let row = 0; row < rows; row += cellSize) {
            for (let col = 0; col < cols; col += cellSize) {
                ctx.fillText(getRandomChar(), col * cellSize, row * cellSize)
                ctx.textBaseline = "top"
                ctx.fillStyle = "#00FF41"
            } 
        }
    }
    requestAnimationFrame(animate)
}
 
 
window.addEventListener("resize", resize)
start()