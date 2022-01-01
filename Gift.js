class Gift {
  constructor(id, person, gift, link, cost) {
    this.id = id;
    this.recipient = person;
    this.name = gift;
    this.link = link || '';
    this.priceInDollars = cost;
  }
}


export default Gift;