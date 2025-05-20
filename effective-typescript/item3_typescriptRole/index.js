var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var x = "hello";
x = 1234;
console.log(x);
function calculateArea(shape) {
    if (shape instanceof Rectangle) {
        // ~~~~~~~~~~ 'Rectangle'은(는) 형식만 참조하지만,
        //           여기서는 값으로 사용되고 있습니다.
        return shape.width * shape.height;
        //              ~~~~~~ 'Shape' 형식에 'height' 속성이 없습니다.
    }
    else {
        return shape.width * shape.width;
    }
}
function calculateArea2(shape) {
    if ("height" in shape) {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
function calculateArea3(shape) {
    if (shape.kind === "rectangle") {
        return shape.width * shape.height; //타입이 Retangle2
    }
    else {
        return shape.width * shape.width;
    }
}
var Square = /** @class */ (function () {
    function Square(width) {
        this.width = width;
    }
    return Square;
}());
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(width, height) {
        var _this = _super.call(this, width) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    return Rectangle;
}(Square));
function calculateArea4(shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
function asNumber(val) {
    return val;
}
