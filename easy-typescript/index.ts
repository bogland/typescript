interface Person {
  name: string;
  age: number;
}

interface Developer {
  name: string;
  skill: string;
}

function introduce(someone: Person | Developer) {
  if ("age" in someone) {
    console.log(someone.age); //Person type
  }
  if ("skill" in someone) {
    console.log(someone.skill); // Developer type
  }
}

introduce({ name: "홍길동", age: 20, skill: "typescript" });

const john: Person & Developer = {
  name: "홍길동",
  age: 20,
  skill: "typescript",
};

let john2: Person = {
  name: "홍길동",
  age: 20,
};

john2 = john;
