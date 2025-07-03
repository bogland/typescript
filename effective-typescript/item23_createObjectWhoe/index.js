// 하나씩 속성을 넣기보단 한번에 생성하는게 좋음
var pt = {};
pt.x = 3;
pt.y = 4;
var pt2 = {};
pt2.x = 3;
pt2.y = 4;
var pt3 = {
    x: 3,
    y: 4,
};
// 중간에 속성을 변경하고자 한다면 타입 단언문 사용
var pt4 = {};
pt4.x = 3;
pt4.y = 4;
var pt5 = {
    x: 3,
    y: 4,
};
var pt6 = { x: 3, y: 4 };
var id = { name: "Pythagoras" };
var namedPoint = {};
Object.assign(namedPoint, pt6, id);
console.log(namedPoint);
namedPoint.name;
