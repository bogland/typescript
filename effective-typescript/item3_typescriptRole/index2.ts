interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

function calculateArea2(shape: Shape) {
  const isTrue = false;
  if (typeof isTrue === "boolean") {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

const a = {
  name: "asdf",
  age: 10,
  address: "한국",
};

// type A = typeof a;
// type AKey = keyof typeof a;

type ReturnType<T> = T extends (...args: any) => infer R ? R : never;

type A = ReturnType<() => number>; // number
type B = ReturnType<() => string[]>; // string[]
