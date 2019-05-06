/* Scene is a super class creating scenes. If a time is supplied,
the scene will only render for the specified time. Otherwise, it
will run indefinitely unless set as done. */

export default class Scene {
  constructor({ cloud, time, typewrite }) {
    this.cloud = cloud;
    this.time = time;
    this.typewrite = typewrite;
    this.done = false;
    this.name = '';
  }

  get isDone() {
    return this.done;
  }

  set isDone(val) {
    this.done = val;
  }

  run() {
    if (this.cloud) {
      this.cloud.update();
      this.cloud.display();
    }

    if (this.typewrite) {
      this.typewrite.update();
      this.typewrite.display();
    }

    if (Number.isInteger(this.time)) {
      if (this.time > 0) {
        this.time--;
      } else {
        this.isDone = true;
      }
    }
  }
}
