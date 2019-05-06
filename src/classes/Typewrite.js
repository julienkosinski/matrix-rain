/* Typewrite renders the Cursor to write on the first Scene questions and waits
for UserInput answer. */

import { p, font_size, _ } from './Globals';
import Cursor from './Cursor';

export default class Typewrite {
  constructor({x, y, color}) {
    // TODO Consider line overflow
    this.firstX = x;
    this.firstY = y;
    this.color = color || p.color(105, 100, 100);
    this.nextLetterTimer = p.millis() + _.random(400, 500);
    this.displayCursor = false;
    this.newUserInput = false;
    this.vectorsLetter = [];
    this.curVectorsLetter = [];
    this.curSplitSentencesKey = 0;
    this.splitSentences = [];
    this.curSplitSentence = [];
    this.curLetterXKey = 0;
    this.curLine = 0;
    this.userInputVectors = [];
    this.userSplitSentences = [];
    this.cursor = new Cursor ({ });
  }

  chatSentences(sentences) {
    if (this.curSplitSentence === []) {this.curSplitSentences(0);}
    sentences.forEach((sentence) => {
      this.splitSentences.push(sentence.split(''));
    });
  }

  curSplitSentences(curSplitSentencesKey) {
    if (this.userSplitSentences.length > 0) {
      this.vectorsLetter[this.curSplitSentencesKey] = this.curVectorsLetter;
      this.curLetterXKey = 0;
      this.curLine++;
      const lastUserInputVectorsLine = this.userInputVectors[this.userInputVectors.length - 1];
      const lastUserInputVectors = lastUserInputVectorsLine[lastUserInputVectorsLine.length - 1];
      const y = lastUserInputVectors.y + font_size;
      this.curVectorsLetter = [p.createVector(this.firstX, y)];
    } else {
      this.curVectorsLetter = [p.createVector(this.firstX, this.firstY)];
    }
    this.curSplitSentence = this.splitSentences[curSplitSentencesKey];
    this.curSplitSentencesKey = curSplitSentencesKey;
  }

  userSendSentence() {
    this.displayCursor = false;

    // TODO : Use NLP with a new class
    //this.curSplitSentences(this.analyseUserInput());
    this.curSplitSentences(2);
  }

  /*analyseUserInput() {
    return sliptSentenceNumber;
  }*/

  // TODO implement
  deleteLastUserInput() {
  }

  update() {
    if (p.millis() > this.nextLetterTimer) {
      if (this.curLetterXKey < this.curSplitSentence.length - 1 && !this.displayCursor) {
        const lastVectorLetter = this.curVectorsLetter[this.curVectorsLetter.length - 1];
        const newPosX = (font_size - 6) + lastVectorLetter.x;
        const posY = lastVectorLetter.y;
        const newVectorLetter = p.createVector(newPosX, posY);
        this.curVectorsLetter.push(newVectorLetter);
        this.curLetterXKey++;
      }
      this.nextLetterTimer = p.millis() + _.random(300, 500);
    }
    if (this.curLetterXKey == this.curSplitSentence.length - 1) {
      if (!this.displayCursor) {
        this.displayCursor = true;
        const lastVectorLetter = this.curVectorsLetter[this.curVectorsLetter.length - 1];
        this.userInputVectors.push([p.createVector(this.firstX, lastVectorLetter.y + font_size)]);
        this.userSplitSentences.push([]);
        this.curLine++;
      }
      if (this.newUserInput) {
        this.newUserInput = false;
        const lastUserInputVectorsLine = this.userInputVectors[this.userInputVectors.length - 1];
        const lastUserInputVectors = lastUserInputVectorsLine[lastUserInputVectorsLine.length - 1];
        const newPosX = (font_size - 6) + lastUserInputVectors.x;
        const posY = lastUserInputVectors.y;
        const newVectorLetter = p.createVector(newPosX, posY);
        this.userInputVectors[this.userInputVectors.length - 1].push(newVectorLetter);
      }
    }
  }

  // Displays sentence with random letter appearance
  display() {
    p.fill(this.color);

    // Display existing lines
    this.vectorsLetter.forEach((vectorLetterForASentence, splitSentencesKey) => {
      vectorLetterForASentence.forEach((vectorLetter, i) => {
        p.text(this.splitSentences[splitSentencesKey][i], vectorLetter.x, vectorLetter.y);
      });
    });

    this.curVectorsLetter.forEach((curVectorLetter, i) => {
        p.text(this.curSplitSentence[i], curVectorLetter.x, curVectorLetter.y);
    });

    this.userInputVectors.forEach((userInputVectorForASentence, userSplitSentencesKey) => {
      userInputVectorForASentence.forEach((userInputVector, i) => {
        p.text(this.userSplitSentences[userSplitSentencesKey][i], userInputVector.x, userInputVector.y);
      });
    });

    if (this.displayCursor) {
      const lastUserInputVectorsLine = this.userInputVectors[this.userInputVectors.length - 1];
      const lastUserInputVectors = lastUserInputVectorsLine[lastUserInputVectorsLine.length - 1];
      let x;
      this.newUserInput ? x = lastUserInputVectors.x + font_size : x = lastUserInputVectors.x
      this.cursor.resetPos(lastUserInputVectors.x, lastUserInputVectors.y);
      this.cursor.update();
      this.cursor.display();
    }
  }
}