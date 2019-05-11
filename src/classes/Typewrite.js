/* Typewrite renders the Cursor to write on the first Scene questions and waits
for UserInput answer. */

import { p, font_size, _, canvasWidth, canvasHeight } from './Globals';
import Cursor from './Cursor';

export default class Typewrite {
  constructor({x, y, color}) {
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

  initDone(done) {
    this.done = done;
  }

  willBeDone() {
    if (this.curSplitSentencesKey == 4) {
      return true;
    } else {
      return false;
    }
  }

  userSendSentence() {
    this.displayCursor = false;

    // TODO : Use NLP with a new class
    this.curSplitSentences(this.analyseUserInput());
  }

  analyseUserInput() {
    const lastUserSplitSentences = this.userSplitSentences[this.userSplitSentences.length - 1];
    const userSentence = lastUserSplitSentences.join('').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // Normalization to join string array, to cast to lower case and to delete all accentuations.

    // Scene is done if it returns : 4 || 5 || 6

    // Not sure : return 1
    if (this.curLine == 1 || this.curSplitSentencesKey == 1) {
      if (userSentence.includes('comongo')) { return 2; }
      return 1;
    }

    if (this.curSplitSentencesKey == 5) {
      if (userSentence.includes('bleu')) { return 6; }
      if (userSentence.includes('rouge')) { return 7; }
      return 3;
    }

    // Not sure : return 3
    if (userSentence.includes('cv') || userSentence.includes('resume') || userSentence.includes('curriculum vitae')) { return 4; }
    if (userSentence.includes('motivation')) { return 5; }
    if (userSentence.includes('salaire') || userSentence.includes('salariale') || userSentence.includes('pretention')) { return 8; }
    return 3;
  }

  curSplitSentences(curSplitSentencesKey) {
    if (this.userSplitSentences.length > 0) {
      this.vectorsLetter[this.curSplitSentencesKey] = this.curVectorsLetter;
      this.curLetterXKey = 0;
      this.curLine++;
      const lastUserInputVectorsLine = this.userInputVectors[this.userInputVectors.length - 1];
      const lastUserInputVectors = lastUserInputVectorsLine[lastUserInputVectorsLine.length - 1];
      const y = lastUserInputVectors.y + 2 * font_size;
      this.curVectorsLetter = [p.createVector(this.firstX, y)];
    } else {
      this.curVectorsLetter = [p.createVector(this.firstX, this.firstY)];
    }
    this.curSplitSentence = this.splitSentences[curSplitSentencesKey];
    this.curSplitSentencesKey = curSplitSentencesKey;
  }

  chatSentences(sentences) {
    if (this.curSplitSentence === []) {this.curSplitSentences(0);}
    sentences.forEach((sentence) => {
      this.splitSentences.push(sentence.split(''));
    });
  }

  deleteLastUserInput() {
    if (this.userInputVectors[this.userInputVectors.length - 1].length !== 1) {
      this.userSplitSentences[this.userSplitSentences.length - 1].pop();
      this.userInputVectors[this.userInputVectors.length - 1].pop();
    }
  }

  calcNewXYLetter(vectorLetter) {
    let newPosX = (font_size - 6) + vectorLetter.x;
    let newPosY;
    if (newPosX >= canvasWidth - this.firstX) {
      newPosY = vectorLetter.y + font_size;
      newPosX = this.firstX;
    } else {
      newPosY = vectorLetter.y;
    }

    return p.createVector(newPosX, newPosY);
  }

  update() {
    if (p.millis() > this.nextLetterTimer) {
      if (this.curLetterXKey < this.curSplitSentence.length - 1 && !this.displayCursor) {
        const lastVectorLetter = this.curVectorsLetter[this.curVectorsLetter.length - 1];
        const newVectorLetter = this.calcNewXYLetter(lastVectorLetter);
        this.curVectorsLetter.push(newVectorLetter);
        this.curLetterXKey++;
      }
      this.nextLetterTimer = p.millis() + _.random(20, 80);
    }
    if (this.curLetterXKey == this.curSplitSentence.length - 1) {
      if (this.willBeDone() && !this.doneTimer) {
        this.doneTimer = p.millis() + 3000;
      } else {
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
          const newVectorLetter = this.calcNewXYLetter(lastUserInputVectors);
          this.userInputVectors[this.userInputVectors.length - 1].push(newVectorLetter);
        }
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
        p.fill('white');
        p.text(this.userSplitSentences[userSplitSentencesKey][i], userInputVector.x, userInputVector.y);
      });
    });

    if (this.displayCursor) {
      if (this.willBeDone()) {
        // Scene is done
        if (p.millis() > this.doneTimer) {
          this.done();
        }
      } else {
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
}
