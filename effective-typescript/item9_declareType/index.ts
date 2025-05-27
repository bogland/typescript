interface Person {
  name: string;
}
const alice: Person = { name: "Alice" };
const bob = { name: "Bob" } as Person;

const alice2: Person = {};
const bob2 = {} as Person;

const alice3: Person = {
  name: "Alice",
  occupation: "Typescript developer",
};

const alice4 = {
  name: "Alice",
  occupation: "Typescript developer",
} as Person;

const people = ["alice", "bob", "jan"].map((name) => ({ name }));
