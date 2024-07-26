class Vehicle {
  constructor(acceleration = 1) {
    this.speed = 0;
    this.aceeleration = acceleration;
  }

  accelerate() {
    this.speed += this.acceleration;
  }
  decelerate() {
    if (this.speed <= 0) {
      console.log("STOP");
      return;
    }
    this.speed -= this.acceleration;
  }
}

class Bicycle extends Vehicle {
  constructor(price = 100, acceleration) {
    super(acceleration);
    this.price = price;
    this.wheel = 2;
  }
}

const bicycle = new Bicycle(300);
bicycle.accelerate();
bicycle.accelerate();
console.log(bicycle);
console.log(bicycle instanceof Bicycle);
console.log(bicycle instanceof Vehicle);

class Car extends Bicycle {
  constructor(license, price, acceleration) {
    super(price, acceleration);
    this.license = license;
    this.wheel = 4;
  }

  // Overriding
  accelerate() {
    if (!this.license) {
      console.error("무면허!");
      return;
    }
    this.speed += this.acceleration;
    console.log("가속:", this.speed);
  }
}

const car = new Car();

class Boat extends Vehicle {
  constructor(price, acceleration) {
    super(acceleration);
    this.price = price;
    this.motor = 1;
  }
}
