// let 으로 문자열을 정의하면 string타입으로 되기때문에 유니온으로 정의된 좁은 타입에 넣을수 없게 된다.
function getComponent(vector, axis) {
    return vector[axis];
}
var x = "x";
var vec = { x: 10, y: 20, z: 30 };
getComponent(vec, x);
var mixed = ["x", 1];
// let으로 정의된 문자열 리터럴은 string타입으로 정의됨, 다른 타입으론 변경 불가
var x2 = "x";
x = "a";
x = "Four score and seven years ago...";
var x3 = "x";
var x4 = /x|y|z/;
x3 = x4;
x3 = ["x", "y", "z"];
// const 로 정의된 문자열 리터럴은 그대로 타입이 됨
var x5 = "x";
var vec2 = { x: 10, y: 20, z: 30 };
getComponent(vec2, x5);
// const v를 하면 프로퍼티 요소는  let으로 정의되는걸로 취급되어 숫자면 number, 문자열은 string 타입으로 됨
// 여전히 자식의 타입은 변경불가
var v = {
    x: 1,
};
v.x = 3;
v.x = "3";
v.y = 4;
v.name = "Pythangora";
// 프로퍼티 속성이 자동으로 추론되지 않게 하는법
var v2 = {
    x: 1,
};
var v3 = {
    x: 1,
    y: 2,
};
var v3_2 = {
    x: 1,
    y: 2,
};
var v4 = {
    x: 1,
    y: 2,
};
// {readonly x:1, readonly y:2} 타입으로 정의됨
var v4_2 = {
    x: 1,
    y: 2,
};
v4_2.x = 12;
// 배열 리터럴에 as const 하면 number[]가 아닌 특정 (1|2|3)[]로 좁혀짐
var a1 = [1, 2, 3];
var a2 = [1, 2, 3];
// 별첨 enum은 js에서 분기문으로 변환되어 성능 저하유발, const 붙이면 상수로 변경됨
var eType;
(function (eType) {
    eType[eType["A"] = 0] = "A";
    eType[eType["B"] = 1] = "B";
    eType[eType["C"] = 2] = "C";
})(eType || (eType = {}));
var e1 = eType.A;
var e2 = 0 /* eType2.A */;
