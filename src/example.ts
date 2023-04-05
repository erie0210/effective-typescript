// 예시 1 : any 사용
function parseYAML(yaml:string): any {
    return yaml;
}

interface Book {
    name: string;
    author: string;
}

const book = parseYAML(`name: 'The Hitchhiker's Guide to the Galaxy', author: 'Douglas Adams'`)
alert(book.title) // 오류없음 -> 하지만 런타임에 undefined 경고
book('read') // 오류없음 -> 하지만 런타임에 book은 함수가 아닙니다 예외 발생


// 예시 2 : unknown 타입 반환
function safeParseYAML(yaml:string): unknown {
    return yaml;
}

const book2 = safeParseYAML(`name: 'The Hitchhiker's Guide to the Galaxy', author: 'Douglas Adams'`)
alert(book2.title) // 오류: 개체가 'unknown' 형식입니다.
book2('read') // 오류: 'unknown' 형식은 호출할 수 없습니다.

// 예시 3 : 이중 단언 - 특정 타입을 기준으로 타입 체크
const book3 = safeParseYAML(`name: 'The Hitchhiker's Guide to the Galaxy', author: 'Douglas Adams'`) as Book
alert(book2.title) // 오류: Book 형식에 title 속성이 없습니다.
book2('read') // 이 식은 호출할 수 없습니다.

// 예시 4: instance of
function processValue(val: unknown) {
    if(val instanceof Date) {
        return val;
    }
}

// 예시 4 : 타입 가드
function isBook(book: unknown): book is Book {
    return (typeof book === 'object' && book !== null && 'name' in book && 'author' in book)
}


// as any as Book 과 차이
type Foo = {
    bar: string;
}

type Bar = {
    bar: string;
}

declare const foo: Foo;
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;
