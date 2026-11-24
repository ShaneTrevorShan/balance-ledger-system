class User {
  //add export
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullname() {
    return `${this.firstName} ${this.lastName}`; //reference err: missing this.
  }
}

// module.exports = User;
