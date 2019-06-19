/*
// 让浏览器帮我们创建一段 8 个字节长度的内存区域。
let buffer = new ArrayBuffer(8);
// 字节：计算机存储的最小单位
console.log(buffer.byteLength);// 字节长度为8（1字节为一个8位二进制数1Byte=8bit），8字节意味着有8个bit,即8个 8位二进制 的位置；
console.log(buffer[0]);

// Int8Array：8 位有符号整数，长度 1 个字节。
// Uint8Array： 8位无符号整数， 1 个字节长度。
// Int16Array：16位有符号整数， 2 个字节长度。
// Uint16Array：16位无符号整数，2 个字节长度。
// Int32Array：32位有符号整数， 4 个字节长度。
// Uint32Array：32位无符号整数， 4 个字节长度。
// Float32Array：32位浮点数， 4 个字节长度。
// Float64Array：64位浮点数，8 个字节长度。
// byteLength = length * 每个数据占用字节数


let int8Array = new Int8Array(buffer);
console.log(int8Array);
int8Array[0] = 30;  //给buffer的第一个字节赋值
int8Array[1] = 41;  //给buffer的第二个字节赋值
 
int8Array[2] = 52;  //给buffer的第三个字节赋值
int8Array[3] = 63;
 
int8Array[4] = 74;
int8Array[5] = 85;
 
int8Array[6] = 86;
int8Array[7] = 97;
console.log(int8Array);

// 由于 Int16Array 占两个字节,所以我们在用它读写数据的时候，一个索引所代表的数据等于 buffer 中两个字节。
let int16Array = new Int16Array(buffer);
console.log(int16Array);
let bufferTwo = new ArrayBuffer(10);
let view = new DataView(bufferTwo);
*/

/*
const s = new Set();
[1,2,2].forEach(x => s.add(x));
for (let i of s) {
    console.log(i);
}

s.add(NaN);
s.add(NaN);//Set中，NaN===NaN;
s.add({});
s.add({});//Set中，两个空对象被视为不完全相等；
console.log(s);
*/

/*
const m = new Map();
m.set('name','张三');
console.log(m.get('name'));
console.log(m.has('name'));
m.delete('name')
console.log(m.has('name'));
*/

/*
const sevenDays = [...Array(7).keys()].map(days => new Date(Date.now()-86400000*days));
console.log(sevenDays);
*/

