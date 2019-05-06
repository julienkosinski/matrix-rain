/* Typewrite renders the Cursor to write on the first Scene questions and waits
for UserInput answer. */

import { p, font_size, _ } from './Globals';
import Cursor from './Cursor';

export default class Typewrite {
  constructor({x, y, color}) {
    // TODO Consider line overflow
    this.pos = p.createVector(x, y);
    this.color = color || p.color(105, 100, 100);
    this.cursor = new Cursor ({ x, y:y+font_size });
    this.nextLetterTimer = p.millis() + _.random(100, 300);
    this.displayCursor = false;
    this.charsX = [x]; // Contains list of x positions
    this.curLetterKey = 1;
  }

  setText(text) {
    this.splitedText = text.split('');
  }

  update() {
    if (p.millis() > this.nextLetterTimer) {
      if (this.curLetterKey < this.splitedText.length) {
        let newPosX = (font_size - 6) + this.charsX[this.curLetterKey - 1];
        this.charsX.push(newPosX);
        this.curLetterKey++;
      } else {
        this.displayCursor = true;
      }
      this.nextLetterTimer = p.millis() + _.random(100, 300);
    }
  }

  // Displays text with random letter appearance
  display() {
    p.fill(this.color);
    this.charsX.forEach((charX, i) => {
      p.text(this.splitedText[i], charX, this.pos.y);
    });
    if (this.displayCursor) { this.cursor.update(); this.cursor.display(); }
  }

  // TODO : Capture keyboard input as text to search on
}
