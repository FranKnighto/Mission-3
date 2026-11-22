export default class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullname() {
    return `${this.firstName} ${this.lastName}`;
  }
}