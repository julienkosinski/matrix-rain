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
        this.cloud.setText(quote, 30, () => {
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
    ["Bonjour, pour le compte de quelle entreprise souhaiteriez-vous me rencontrer, ici, dans la matrice ? Ecrivez-moi des mots-clés simples, j'apprends encore. Attention au contexte de vos demandes !",
     "Je ne suis pas bien sûr de savoir qui vous êtes. Je suis heureux de vous rencontrer. Cependant, j'ai besoin de vous connaître pour pouvoir commencer ce voyage !",
     "Oh, excellent, je vous attendais ! Je suis ravi de vous rencontrer ! Que voulez-vous savoir ?",
     "Je ne vois pas ce que vous voulez dire (CV, motivation, salaire).",
     "Parfait ! N'hésitez pas à repartir à 0 pour tester d'autres possibilités avec la touche ECHAP. Dans cette Matrice, la touche fonctionne... Commençons si vous le voulez bien !",
     "Je vous propose de choisir ! Choisissez la pilule bleue et tout s'arrête, après vous pourrez faire de beaux rêves et penser ce que vous voulez. Choisissez la pilule rouge, vous resterez au pays des merveilles et nous descendrons avec le lapin blanc au fond du gouffre. Que choisissez-vous ?",
     "Vous avez choisi la pillule bleue, c'est dommage, vous vous privez d'un grand pouvoir !",
     "Vous avez choisi la pillule rouge, vous voilà amené à passer de l'autre côté du mirroir. Pour rentrer dans le vif du sujet, votre projet est de taille et j'arrive à un instant charnière de la vie de l'entreprise. Je souhaites d'ailleurs, à terme, me placer en interface entre votre ESN et vous. Votre approche technologique consistant à collecter la donnée pertinente suscite particulièrement mon intérêt. Fort de mes 2 première années d'alternance en développement web, je suis capable de participer, voir à terme d’aider à définir la stratégie technique de l’entreprise. Je suis aussi en capacité de travailler en équipe afin de développer une efficience entrepreneuriale. Aujourd’hui, je suis à la recherche d’un partenaire d’alternance pour ma formation Tech Lead avec OpenClassrooms. J’ai eu l’occasion de maintenir et faire évoluer, en autonomie, une application en PHP sur un framework MVC dédié à une entreprise. J’ai pu administrer et gérer des requêtes sur la base de données MySQL associée à cette application. J’ai aussi eu l’occasion d’utiliser la démarche SCRUM ainsi que de développer à l'aide de nombreux autres langages et technologies.",
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
