import Apache from './apache.js';

class Tomogav extends Apache {
  constructor(name) {
    super(name);
    this.className = 'tomogav';
    this.dogFriendship = 60 + Math.round(Math.random() * 40);
  }
}

export default Tomogav;
