const { v4: uuidv4 } = require('uuid');

class Report {
  constructor() {
    this.action1 = 'Идёт перемещение мяча по полю, игроки и той, и другой команды активно пытаются атаковать';
    this.action2 = 'Игра становится напряженной, гул болельщиков становится громче, борьба за мяч уcиливается'
    this.freekick = 'Нарушение правил, будет штрафной удар';
    this.goal = 'Отличный удар! И Г-О-Л!';
    this.comments = [];

    this.start = this.start.bind(this);
  }

  start() {
    this.createComment();
    if (this.comments.length === 49) {
      this.comments.push({
        data: JSON.stringify({ comment: 'Игра закончена', date: this.getDate() }),
        event: 'action1',
        id: uuidv4(),
      });
      console.log('Игра закончена');
      return;
    }
    setTimeout(this.start, this.getInterval());
  }

  getInterval() {
    return Math.floor(3 + Math.random() * 6) * 1000;
  }

  createComment() {
    if (this.comments.length === 0) {
      this.comments.push({
        data: JSON.stringify({ comment: 'Игра началась', date: this.getDate() }),
        event: 'action1',
        id: uuidv4(),
      });
    }
    const event = this.getEvent();
    this.comments.push({
      data: JSON.stringify({ comment: this[event], date: this.getDate() }),
      event,
      id: uuidv4(),
    });
  }

  getEvent() {
    const random = Math.random();
    if (random <= 0.3) {
      return 'action1';
    }
    if (random <= 0.6) {
      return 'action2';
    }
    if (random >= 0.9) {
      return 'goal';
    }
    return 'freekick';
  }

  getDate() {
    const formatter = new Intl.DateTimeFormat("ru", {
      timeZone: "Europe/Moscow",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formatter.format(new Date());
  }
}

const report = new Report();

module.exports = report;
