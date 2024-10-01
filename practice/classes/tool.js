import Item from './item.js';

class Tools extends Item {
  constructor(name) {
    super(name);
    this.className = 'tool';
  }
}

export default Tools;
