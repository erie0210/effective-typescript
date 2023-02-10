// interface Person { name: string };

// const a: Person = {name: 'Alice'};
// const b = {name: 'Alice'} as Person
// const c: Person = {};
// const d = {} as Person
// // const e = <Person>{}


// // 방법1

// const p = ['x', 'y', 'z'].map(name => ({name})) // { name: string; }[]


// // 방법2

// const p2 = ['x', 'y', 'z'].map(name => ({name} as Person)) // Person[]

// const p2check = ['x', 'y', 'z'].map(name => ({} as Person))// Person[] 에러 x


// // 방법3

// const p3 = ['x', 'y', 'z'].map(name => {
//     const per: Person = {name};
//     return per;
// }) // Person[]

// const p3check = ['x', 'y', 'z'].map(name => {
//     const per: Person = {};
//     return per;
// }) // Person[] 에러

// const p31 = ['x', 'y', 'z'].map((name): Person => ({name})) // Person[] , name은 타입이 없고 반환이 Person이다
// // cf. (name:Person) => ({name}) -> name의 타입이 Person이라고 알려줌

// const p31check = ['x', 'y', 'z'].map((name): Person => ({})) // Person[] 에러



// ! 사용


// const p32: Person[] = ['x', 'y', 'z'].map((name): Person => ({name})) // Person[] 최종적인 타입까지 확인
// const ex1 = !('a'); // boolean의 부정문
// console.log(ex1);


// let ex2 = ('b')!; // 'b' 는 null이 아니라는 단언문
// ex2!=null
// console.log(ex2)
