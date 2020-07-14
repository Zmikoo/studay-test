// function *foo(){
//     var x = yield 2;
//     z++;
//     var y = yield (x * z);
//     console.log(x,y,z);
// }
// var z = 1;
// var it1 = foo();
// var it2 = foo();

// var val1 = it1.next().value;
// var val2 = it2.next().value;
// console.log(val1,val2);// 2 2

// val1 = it1.next(val2 * 10).value;
// val2 = it2.next(val1 * 5).value;
// console.log(val1,val2);// 400 600

// it1.next(val2 / 2);// 20 300 3
// it2.next(val1 / 4);// 200 10 3

// var a = 1;
// var b = 2;
// function *foo(){
//     a++;
//     yield;
//     b = b * a;
//     a = (yield b) + 3;
// }
// function *bar(){
//     b--;
//     yield;
//     a = (yield 8) + b;
//     b = a * (yield 2);
// }
// function step(gen){
//     var it = gen();
//     var last;
//     return function(){
//         last = it.next(last).value;
//     }
// }

// var s1 = step(foo);
// var s2 = step(bar);


function *foo(){
    var nextVal;
    while(true){
        if (nextVal === undefined) {
            nextVal = 1;
        } else {
            nextVal = (3 * nextVal) + 6;
        }

        yield nextVal;
    }
}
for (var v of foo()) {
    console.log(v);
    if (v > 500) {
        break;
    }
}
// var it = foo();
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);