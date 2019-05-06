import Scene from './Scene';
import { p, _, font_size } from './Globals';

/* Words render words in the middle of the screen */

export class Words extends Scene {
  constructor({ cloud, time }) {
    super({ cloud, time });
    this.newWord = true;
    this.name = 'Words';
  }

  static get quotes() {
    /*return ["What is real?", "Fear, doubt, and disbelief", "Free your mind", "Follow the white rabbit", "The Matrix Has You...", "Déjà vu", "The sound of inevitability", "Only human", "Knowing the path - Walking the path", "There is no spoon", "It will find you if you want it to", "Control", "Wake up", "Knock, knock", "The answer is out there", "Don't think you are, know you are", "You've been living in a dreamworld", "I must get out of here", "I can only show you the door. You're the one that has to walk through it", "Throughout human history, we have been dependent on machines to survive", "A world without rules and controls, without borders or boundaries", "A world where anything is possible",];*/
    return ["HTML 5", "CSS 3", "JavaScript", "PHP", "MySQL", "PostgreSQL", "Git", "Internet of Things", "NodeJS", "Python", "Go", "Vue.js", "React",
    "Anglais : B2", "2 ans d'alternance en développement web", "Développement entrepreneurial", "Mobilité Internationale", "Licence pro Développeur Web",
    "Startup Weekend", "SOA", "DUT MMI"];
  }

  draw() {
    p.background(0, 0, 0);

    if (this.newWord) {
      const quote = _.sample(Words.quotes);
      const maxChars = p.width / font_size;
      if (quote.length < maxChars) {
        this.cloud.setText(quote, 300, () => {
          this.cloud.text = "";
          this.newWord = true;
        });
        this.newWord = false;
      }
    }
    this.run();
  }
}

/* Rain renders only raindrops */

export class Rain extends Scene {
  constructor(config) {
    super(config);
    this.name = 'Rain';
  }

  draw() {
    p.background(0, 0, 0);
    this.run();
  }
};

/* Title zooms into the center whilst showing JULIEN KOSINSKI */

export class Title extends Scene {
  constructor(cloud) {
    super(cloud);
    this.scale = 1;
    this.translate = 0;
    this.move = 0;
    this.name = 'Title';
    this.setupOnce = _.once(this.setup);
  }

  setup() {
    this.cloud.setText("CV DE JULIEN KOSINSKI", 300, () => this.isDone = true);
  }

  draw() {
    this.setupOnce();
    p.background(0, 0, 0);
    p.push();
    p.translate(-this.translate, -this.translate);
    p.scale(this.scale);
    this.run();

    // d.drawRects();

    this.translate = p.lerp(0, 200, this.move); // width - title.length * fontSize
    this.scale = (p.width + 2 * this.translate) / p.width;
    p.pop();

    if (this.move <= 1) {
      this.move += 0.0015;
    }
  }
}

export class Prelude extends Scene {
  constructor(typewrite) {
    super(typewrite);
    this.name = 'Prelude';
    this.setupOnce = _.once(this.setup);
  }

  setup() {
    const chatSentences =
    ["Bonjour, qui êtes-vous pour me rencontrer, ici, dans la matrice ? Ecrivez-moi des mots-clés simples, j'apprends encore.",
     "Je ne suis pas bien sûr de savoir qui vous êtes. Je suis heureux de vous rencontrer. Que voulez-vous savoir ?",
     "Oh, excellent, je vous attendais ! Je suis ravi de vous rencontrer ! Que voulez-vous savoir ?",
     "Je ne vois pas ce que vous voulez dire (CV, motivation, salaire).",
     "Parfait ! Commençons si vous le voulez bien !",
     "Ma motivation est exprimée de cette façon originale. Vous n'y trouverez que peu de texte, les actes valent plus que les mots.",
     "Mes prétentions salariales en brut ? Alternant en professionnalisation pendant 2 ans, puis Tech Lead. 1500€/mois puis, 3000€/mois."];
    this.typewrite.chatSentences(chatSentences);
    this.typewrite.curSplitSentences(0);
    this.typewrite.initDone(() => this.isDone = true);
  }

  draw() {
    this.setupOnce();
    p.background(0, 0, 0);
    this.run();
  }
}
