// structual typing의 한계를 보여주는 예제 => brand typing으로 nomial한 타입을 만들어서 해결

interface Vector2D {
    _brand: '2d';
    x: number;
    y: number;
}

function vec2D(x: number, y: number): Vector2D {
    return { _brand: '2d', x, y };
}

function calculateNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm(vec2D(3, 4)); // OK
const vec3D = {x:3, y:4, z:5};
calculateNorm(vec3D); // Error: Argument of type '{ x: number; y: number; z: number; }' is not assignable to parameter of type 'Vector2D'.


// ts 방식의 branded type
type AbsolutePath = string & { _brand: 'abs' };
function listAbsolutePath(path: AbsolutePath) {
    // ...
}
function isAbsolutePath(path: string): path is AbsolutePath {
    return path.startsWith('/');
}

function foo(path: string) {
    if (isAbsolutePath(path)) {
        listAbsolutePath(path);
    }
}

type Branded<T, K> = T & { _brand: K };
type Money = Branded<number, 'Money'>;

declare let money: Money

const money = 123 // error, Type 'number' is not assignable to type '{ _brand: "Money"; }'
const money2: Money = Money(123) & {'_brand': 'Money'}; // ok
console.log(money2)

// use function
function checkMoney(value: number): Money {
    if (value < 0) {
        throw new Error()
    }

    return value as Money
}

const money3: Money = checkMoney(123)

// use class
class UserId2 {
    constructor(private readonly id: number) {
    }

    [Symbol.toPrimitive](_hint: string) {
        if (typeof this.id === 'undefined') {
            throw new Error();
        }
        return this.id;
    }
}

const userId = new UserId2(10);

console.log(userId); // UserId: { "id": 10 }
console.log(+userId); // 10


type Meters = number & { _brand: 'meters' };
type Seconds = number & { _brand: 'seconds' };

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000);


// new Case
type MoneyNumber<T> = T & { _brand: 'Money' };
function isMoney<T>(m: T): m is MoneyNumber<T> {
    return m > 0;
}

// use1: type guard
isMoney(10); // true

// use2: nominal typing
function f(mm: MoneyNumber<number>) {
    return mm*2;
}
function calculateMoney(m: number) {
    if(!isMoney(m)) {
        throw new Error();
    }

    return f(m); // OK
}
calculateMoney(10);
