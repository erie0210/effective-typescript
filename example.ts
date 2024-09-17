// 예시 1: null 체크

const el = document.getElementById('foo');
if(el){
    el.innerHTML = 'Party Time'.blink()
} else {
    alert('No element #foo')
}


// 예시2: return 또는 throw Exception

const el2 = document.getElementById('foo')
if(!el2) throw new Error('No foo')
el2.innerHTML = 'Party Time'.blink()

async function getEl(){
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("hello")
        }, 2000)
    })
}

async function func(){
    const el = await getEl()
    if(!el){
        return
    }
    return 1
}


// 예시3: instanceOf 사용

class ExceptionA extends DOMException{}

function contains(text: string, search: string| RegExp){
    // 함수 작용

    if(search instanceof ExceptionA){
        throw Error("ExceptionA")
    }

    throw Error("ExceptionB")
}


// 예시4: in으로 속성 체크

interface A {a: number}
interface B {b: number}
function pickAB(ab: A|B){
    if('a' in ab){
        return "A"
    } else {
        return "B"
    }
    return "AB"
}

// 예시 5: 내장함수 사용
function contains2 (terms: string | string[]){
    const termList = Array.isArray(terms)? terms : [terms];
    return termList
}
contains2('A')


// 예시 6: 자료구조 이용해 시간복잡도 줄이기. Set, Map 만들기
// Set
const randoms = ['a', 'z', 'c', 't', 'o']
const randomSet = new Set(...randoms)
const hasA = randomSet.has('a')

// Map
var arr = [
    { key: 'foo', val: 'bar' },
    { key: 'hello', val: 'world' }
];
var mappedArr = new Map(arr.map(i => [i.key, i.val]));
const hasFoo = mappedArr.has('foo')


// 예시7: 태그 붙이기 (태그된 유니온)
interface  UploadEvent { type: 'upload'; filename: string; content: string }
interface  DownloadEvent { type: 'download'; filename: string; content: string }
function handle(e: UploadEvent | DownloadEvent){
    switch (e.type){
        case "upload":
            break;
        case "download":
            break;
    }
}


// filter를 이용해 배열에서 undefined 거르기 -> typeGuard 이용
const jackson5 = ['jack', 'tito', 'jermaine', 'marlon', 'michael'];
const members = ['janet', 'michael'].map(
    who => jackson5.find(n => n === who)
) // 타입이 (string | undefined)[]

function isDefined<T> (x: T | undefined): x is T{
    return x !==undefined;
}
const members2 = ['janet', 'michael'].map(
    who => jackson5.find(n => n === who)
).filter(isDefined)


// 주의할 점
// === object를 사용하면 typeof null === object 여서 null을 거르지 못함
const el3 = document.getElementById('foo')
if(typeof el3 === 'object'){
    return el3
}
// ! 부정 연산자는 []를 거르지 못함
const arr3 = []
console.log(!arr3) // false

