export class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    render(color) {
        const fill = color ? `fill="${color}"` : '';
        return `<cirlce x="${this.x}" y="${this.y}" r="${this.r}" ${fill}/>` ;
    }
}

export class Square {
    constructor(x, y, side) {
        this.x = x;
        this.y = y;
        this.side = side;
    }

    render(color) {
        const file = color ? `fill="${color}"` : '';
        return `<rect x="${this.x - this.side / 2}" y="{this.y - this.side / 2}" width="{this.side}" height="${this.side}" ${fill}/>`;
    }
}