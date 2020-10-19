const User = {
    userId: String,
    firstName: String,
    lastName: String,
};

export class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }
  }
class User2 {
    constructor (userId, firstName, lastName) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    }
    // this.prototype.toString("el usuario es " + this.userId + " " + this.firstName + " " + this.lastName + " "  )
}export default User2;