const BASE_COLOR = {
    1: [200, 150, 255],
    2: [200, 255, 255],
    3: [50, 200, 200],
    4: [50, 100, 255],
    5: [255, 150, 0],
    6: [200, 200, 255],
    7: [0, 100, 255],
    8: [200,255, 200],
    9: [255, 255, 200],
    10: [50, 255, 50]
}

export class TaskImageBlock {
    constructor(block, task) {
        this.number = block.number
        this.x = block.x
        this.y = block.y
        this.width = block.width
        this.height = block.height
        this.task = task
        this.color = BASE_COLOR[this.number]

        this.isLocked = true
        this.markerSize = 12

        this.minWidth = 20
        this.minHeight = 20

        if (this.width < this.minWidth) {
            this.width = this.minWidth
        }
        if (this.height < this.minHeight) {
            this.height = this.minHeight
        }

        this.isBeingResized = false
        this.isBeingDragged = false

        this.offsetX = null
        this.offsetY = null
    }

    getCssStyleColor() {
        return `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.5)`
    }

    mousePressed(sk) {
        if (this.mouseIsOverMarker(sk)) {
            this.isBeingResized = true
            this.offsetX = (this.x + this.width) - sk.mouseX
            this.offsetY = (this.y + this.height) - sk.mouseY
        } else if (this.mouseIsOver(sk)) {
            this.isBeingDragged = true
            this.offsetX = this.x - sk.mouseX
            this.offsetY = this.y - sk.mouseY
        }
    }

    mouseReleased() {
        this.isBeingResized = false
        this.isBeingDragged = false
    }

    mouseIsOver(sk) {
        const mouseX = sk.mouseX
        const mouseY = sk.mouseY
        return (
            mouseX > this.x &&
            mouseY > this.y &&
            mouseX < this.x + this.width &&
            mouseY < this.y + this.height)
    }

    mouseIsOverMarker(sk) {
        const mouseX = sk.mouseX
        const mouseY = sk.mouseY
        return (
            mouseX > this.x + this.width - this.markerSize &&
            mouseY > this.y + this.height - this.markerSize &&
            mouseX < this.x + this.width &&
            mouseY < this.y + this.height)
    }

    update(sk) {
        if (this.isLocked)
            return
        if (this.isBeingResized) {
            if (sk.mouseX - this.x + this.offsetX > this.minWidth) {
                this.width = sk.mouseX - this.x + this.offsetX;
            } else {
                this.width = this.minWidth;
            }
            if (sk.mouseY - this.y + this.offsetY > this.minHeight) {
                this.height = sk.mouseY - this.y + this.offsetY;
            } else {
                this.height = this.minHeight;
            }
        }

        if (this.isBeingDragged) {
            this.x = sk.mouseX + this.offsetX;
            if (this.x < 0) this.x = 0
            if (this.x + this.width > sk.width) this.x = sk.width - this.width
            this.y = sk.mouseY + this.offsetY;
            if (this.y < 0) this.y = 0
            if (this.y + this.height > sk.height) this.y = sk.height - this.height
        }
    }

    draw(sk) {
        this.update(sk)
        sk.stroke('black');
        sk.fill(...this.color, 100);
        sk.rect(this.x, this.y, this.width, this.height);
        sk.fill('black');
        sk.textSize(12);
        sk.text(this.number, this.x, this.y-2);

        if (!this.isLocked && (this.mouseIsOver(sk) || this.isBeingResized || this.isBeingDragged)) {
            const handleX1 = this.x + this.width - this.markerSize;
            const handleY1 = this.y + this.height - this.markerSize;
            const handleX2 = this.x + this.width;
            const handleY2 = this.y + this.height;
            sk.noStroke();
            sk.fill('grey');
            sk.beginShape();
            sk.vertex(handleX1, handleY1 + this.markerSize);
            sk.vertex(handleX2, handleY1);
            sk.vertex(handleX2, handleY2);
            sk.endShape(sk.CLOSE);
            sk.stroke('black');
            sk.line(handleX1, handleY1 + this.markerSize, handleX2, handleY1);
            sk.line(handleX1 + 5, handleY1 + this.markerSize, handleX2, handleY1 + 5);
            sk.line(handleX1 + 10, handleY1 + this.markerSize, handleX2, handleY1 + 10);
        }
    }
}
