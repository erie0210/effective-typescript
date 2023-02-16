interface Vector2D {
    x: number;
    y: number;
}

function calculateLength(v: Vector2D){
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

const v2 :NamedVector = {
    x:3,
    y:4,
    name:'Zee'
}
calculateLength(v2) // v의 필드를 모두 가지고 있기 때문에 v2와 관계에 대한 정의 없이도 정상적으로 넣을 수 있음.



// 구조적 타이핑으로 인한 문제 발생 -> z 가 사용되지 않았는데도 Vector3D가 Vector2D에 덕타이핑을 만족하기 떄문에
// calculateLength 가 작동해 x,y만 처리 되었다

interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function normalize(v: Vector3D){
    const length = calculateLength(v) // 정상적
    return {
        x: v.x/length,
        y: v.y/length,
        z: v.z/length,
    }
}

const result = normalize({x:3, y:4, z:5}) // 실제값 1.4
// expected(result).tobe(1)


function calculateLengthL1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)){
        const coord = v[axis]; // <--------- 에러 발생
        length += Math.abs(coord)
    }
    return length;
}

// ts 가 덕타이핑을 하기 때문에 위의 예시에서는 에러가 발생해야한다. 예를 들면 아래와 같은 값도 parameter로 들어갈 수 있기 떄문이다
const vec3D = {x:3, y:5, z:1, address:'123 Seoul'}

// 오히려 이런 케이스가 더 낫다
function calculateLengthL2(v: Vector3D) {
    return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z)
}


// 클래스와 관련된 덕타이핑은 테스트를 짤 때 유리하다
class C {
    foo: string;
    constructor(foo: string) {
        this.foo = foo;
    }
}

const c = new C('instance of C');
const d:C = { foo: 'object literal' };

// 예시: 아래와 같은 함수를 테스트하기 위해서
interface Author {
    first: string;
    last: string;
}

function getAuthors(database: PostgreDB): AUthor[] {
    const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
    return authorRows.map(row => {first: row[0], last: row[1]})
}

// 덕타이핑을 이용한 모킹
interface DB {
    runQuery: (sql:string) => any[]
}

function getAuthors(database:DB): Author[] {
    const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
    return authorRows.map(row => ({first: row[0], last: row[1]}))
}

test('getAuthors', () => {
    const authors = getAuthors({
        runQuery(sql: string) {
            return [['Toni', 'Morrison']]
        }
    });
    expect(authors).toEqual(([
        {first: 'Toni', last: 'Morrison'}
    ]))
})
