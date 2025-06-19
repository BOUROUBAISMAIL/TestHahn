export class Student {
  constructor(firstName, lastName, email, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
  }

  static fromJson(json) {
    return new Student(
      json.firstName,
      json.lastName,
      json.email,
      json.age
    );
  }

  toJson() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      age: this.age
    };
  }
} 