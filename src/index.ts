// ex1
interface Album {
    artist: string;
    title: string;
    releaseDate: string; // YYYY-MM-DD
    recordingType: string; // "studio", "live"
}

// ex2
const kindOfBlue: Album = {
    artist: "Miles Davis",
    title: "Kind of Blue",
    releaseDate: 'August 17th 1959', // 날짜 형식이 아닌 숫자로 입력
    recordingType: 'Studio'  // 오타
}

// ex3
function recordRelease(title: string, date: string) {
    // ...
}
recordRelease(kindOfBlue.releaseDate, kindOfBlue.title) // 인자의 순서가 바뀜

// ex4: 개선
/**
 * What type of environment was this recording made in?
 */
type RecordingType = 'studio' | 'live';

interface Album2 {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType;
}

const kindOfBlue: Album2 = {
    artist: "Miles Davis",
    title: "Kind of Blue",
    releaseDate: new Date('1950-08-17'), // 날짜 형식이 아닌 숫자로 입력
    recordingType: 'Studio'  // Type '"Studio"' is not assignable to type 'RecordingType'. Did you mean '"studio"'?
}

// ex5: keyof 연산자
function plunk(records: any[], key: string): any[] {
    return records.map(r => r[key]);
}

function plunk<T>(records: T[], key: string): any[] {
    return records.map(r => r[key]); // 에러: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'unknown'.
}

type K = keyof Album2; // "artist" | "title" | "releaseDate" | "recordingType"
function plunk3<T>(records: T[], key: keyof T) {
    return records.map(r => r[key]);
}

function plunk3<T>(records: T[], key: keyof T): T[keyof T][] {
    return records.map(r => r[key]);
}

// extends keyof T: 자동 완성 기능도 개선
function plunk4<T, K extends keyof T>(records: T[], key: K): T[K][] {
    return records.map(r => r[key]);
}
