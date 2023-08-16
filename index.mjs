
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
import inquirer from 'inquirer';
import { Circle, Square } from './lib/shapes.mjs';

const picHeight = 300;
const picWidth = 300;

inquirer
    .prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to 4 characters',
            validate: (input) => input.length <= 4
        },
        {
            input: 'input',
            name: 'fontColor',
            message: 'Enter your desired font color as a hexadecimal code',
            validate: (input) => {
                const hexCode = /^#[0-9A-F]{6}$/i.test(input)
                return hexCode
            }
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['Circle', 'Square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter your desired background color as a hexidecimal code',
            validate: (input) => {
                const hexCode = /^#[0-9A-F]{6}$/i.test(input)
                return hexCode
            }
        }
    ])
        .then((answers) => {
            let shape;
            const text =  {
                _attributes: {
                    x: picWidth / 2,
                    y: picHeight / 1.4,
                    'text-anchor': 'middle',
                    fill: answers.fontColor
                },
                _text: answers.text.toUpperCase(),

                render: function() {
                    return `
                        <text x="${this._attributes.x}" y="${this._attributes.y}"
                        text-anchor="${this._attributes['text-anchor']}"
                        fill="{this._attributes.fill}" font-size="${fontSize}">
                            ${this._text}
                        </text>
                        `
                }
            }
            let fontSize;
            switch (answers.shape) {
                case 'Circle':
                    const radius = Math.min(picWidth, picHeight) * 0.45
                    shape = new Circle(picWidth / 2, picHeight / 2, radius);
                    text._attributes.y = picHeight / 1.65;
                    fontSize = 58;
                break;
                case 'Square':
                    const squareSize = Math.min(picWidth, picHeight) * 0.8;
                    shape= new Square(picWidth / 2, picHeight / 2, squareSize)
                    text._attributes.y = picHeight / 1.65;
                    fontSize = 60;
                    break;
            }

            const svgData = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${picWidth}" height="${picHeight}">
              ${shape.render(answers.shapeColor)}
              ${text.render()}
            </svg>`;
      
          fs.writeFileSync(`${__dirname}/logo.svg`, svgData.toString());
      
          console.log('Generated logo.svg');
        })
        .catch((error) => {
          console.error(error);
        });
  