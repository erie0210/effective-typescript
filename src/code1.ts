interface Vector3 {
    x: number;
    y: number;
    z: number;
}

function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z'){
    return vector[axis];
}


// 예시1

let x = 'x';
let vec = { x:10, y:20, z:30 };

getComponent(vec, x);


// 예시2

const mixed = ['x', 1];


// 타입 넓히기 제어 방법
// 방법 1 : const 사용

const y = 'y'
let vec2 = { x:10, y:20, z:3-0}
getComponent(vec, y)


// 예외: 객체, 배열, 튜플
const v = {
    x: 1
}

v.x = 3
v.x = '3'
v.y = 4


// 예외에 대한 제어 방법 1: 타입선언
const v2: { x:1|3|5 } = {
    x:1
}

// 예외에 대한 제어 방법 2: const 이용
const v3 = {
    x:1 as const,
    y: 3
}

// 튜플 예시
const a1 = [1,2,3];
const a2 = [1,2,3] as const;
