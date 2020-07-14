// self.addEventListener('message',function(e){
//     console.log(e.data)
//     var response;
//     switch(e.data){
//         case "Hello I'm your father":
//             response = "Hello,I'm your child";
//             break;
//         case "How are you":
//             response = "I'm fine,Thank you"
//     }
//     self.postMessage(response);
// },false)
Object.is(null,null);
var arr = [];
var startTime = Date.parse(new Date())
for(let i = 0; i < 10000000; i++){
    arr[i] = i * 2;
}
var secondTime = Date.parse(new Date())// 等于startTime
console.log(arr)
var thirdTime = Date.parse(new Date())// 被arr阻塞
console.log(startTime, secondTime, thirdTime, thirdTime - startTime);

setTimeout(function(){
    var endTime = Date.parse(new Date())
    console.log(endTime - thirdTime)
},10000)// 不在主线程执行，而是被加入事件队列，当主线程所有程序执行完毕后会读取事件队列中的事件执行。

for(var i=0;i<3;i++){
    setTimeout(function(){
        console.log(i);
    }, 10);
}

for(var i=0;i<3;i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        }, 10);
    })(i)
}