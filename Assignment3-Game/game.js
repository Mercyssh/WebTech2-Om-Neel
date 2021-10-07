//Map Object - Size of Map, Size of Each Tile
class Map {
    constructor(rows, cols, tileSize) {
        // Dimension
        this.rows = rows
        this.cols = cols
        this.tileSize = tileSize || 40
        this.tiles = []
        this.targetHTML = document.getElementById("grid")
        this.player = new Player(
            Math.floor(this.rows / 2),
            Math.floor(this.cols / 2),
            Math.floor(.75 * this.tileSize),
            "East",
            undefined,
            this
        )
    }

    //Render the Map
    render() {
        // Takes number of rows and cols and creates tiles
        for (let i = 0; i < this.rows; i++) {
            var rowHTML = document.createElement("div")
            rowHTML.setAttribute("class", "row")

            for (let j = 0; j < this.cols; j++) {
                let tile = new Tile(i, j)
                this.tiles.push(tile)

                var tileHTML = ` <div id="tile-${i}-${j}" class="tile" style="height: ${this.tileSize}px; width: ${this.tileSize}px"></div>`
                rowHTML.insertAdjacentHTML("beforeend", tileHTML);
            }

            this.targetHTML.appendChild(rowHTML)
        }

        this.player.render()
    }

    //Attach Event handlers
    createEventHandlers() {
        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "w":
                case "ArrowUp":
                    this.player.moveUp();
                    break;

                case "s":
                case "ArrowDown":
                    this.player.moveDown();
                    break;

                case "d":
                case "ArrowRight":
                    this.player.moveRight();
                    break;

                case "a":
                case "ArrowLeft":
                    this.player.moveLeft();
                    break;
            }
        });
    }
}

//Individual Tile Object, carries its own coordinates, and player object
class Tile {
    constructor(x, y, contains) {
        this.x = x
        this.y = y
        this.contains = contains || null
    }
}

//Player Object - Coordinates, Size of Sprite, Rotation of Sprite, and Image of sprite
class Player {
    constructor(x, y, size, dir, image, map) { // dir: N, S, E, W

        this.y = x
        this.x = y
        this.size = size || 30
        this.dir = dir
        this.image = image || 'images/defaultplayer.svg'
        this.map = map
    }

    //Delete old player, Create new player, and Insert new player
    render() {
        //Remove any old player
        const oldplayer = document.querySelector(".player");
        if (oldplayer) oldplayer.parentNode.removeChild(oldplayer);

        //Create new player
        let playerHTML = document.createElement("img")
        playerHTML.src = this.image
        playerHTML.classList.add("player")
        let deg = 0
        switch (this.dir) {
            case "North": deg = 270; break;
            case "South": deg = 90; break;
            case "West": deg = 180; break;
            case "East":
            default: deg = 0
        }
        playerHTML.setAttribute("style", `height: ${this.size}px; width: ${this.size}px;transform: translate(-50%, -50%) rotate(${deg}deg);`)

        //Add to Appropriate Tile
        let tileHTML = document.querySelector(`#tile-${this.y}-${this.x}`)
        tileHTML.appendChild(playerHTML)
    }

    //Collision Function
    isColliding(cx, cy) {
        //Map Borders
        if (cx < 0 || cy < 0 || cx > this.map.rows - 1 || cy > this.map.cols - 1) return true;
        else return false;
    }

    //Movevement functions
    moveUp() {
        if (!this.isColliding(this.x, this.y - 1)) {
            this.dir = "North";
            this.y--;
            this.render();
        }
    }

    moveDown() {
        if (!this.isColliding(this.x, this.y + 1)) {
            this.dir = "South"
            this.y++;
            this.render();
        }
    }

    moveLeft() {
        if (!this.isColliding(this.x - 1, this.y)) {
            this.dir = "West"
            this.x--;
            this.render();
        }
    }

    moveRight() {
        if (!this.isColliding(this.x + 1, this.y)) {
            this.dir = "East"
            this.x++;
            this.render();
        }
    }
}

//Runs on page Load
(function () {
    const setButton = document.getElementById("set")
    const rowsInput = document.getElementById("rows")
    const colsInput = document.getElementById("cols")

    //Function to initialize the map, initializes on clicking set
    const init = () => {
        if (rowsInput.value > 0 && colsInput.value > 0) {
            const map = new Map(rowsInput.value, colsInput.value)
            map.render();
            map.createEventHandlers();
        }
    }
    setButton.addEventListener("click", init)
})()