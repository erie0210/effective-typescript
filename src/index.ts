// 자바스크립트는 기본형과 객체 타입을 서로 자유롭게 변환한다
const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function (index) {
    return originalCharAt.call(this, index);
}
console.log('primitive'.charAt(0));
