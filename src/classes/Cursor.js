/* Cursor render an underscore flashing
indicating it waits for user input */

import { p } from './Globals';

export default class Cursor {
  constructor({x, y}) {
    this.sinTime = 0;
    this.cursorSymbol = '_';
    this.pos = p.createVector(x, y);
    this.hide = false;
  }

  resetPos(x, y) {
    this.pos = p.createVector(x, y);
  }

  update() {
    this.sinTime = this.sinTime + 0.05;
  }

  display() {
    let fade = 1 + p.sin(this.sinTime);
    p.fill('rgba(20, 180, 30, ' + fade + ')');
    p.text(this.cursorSymbol, this.pos.x, this.pos.y);
  }
}
