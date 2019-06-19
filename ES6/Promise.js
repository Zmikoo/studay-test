import { login } from "f:/vue-admin-template/src/api/user";

function timeout(ms) {
    return new Promise((resolve,reject) => {
        login({username:username,password})
        // .then(response => {
        //     const data = response;
        //     resolve();
        // })
        // .catch(error => {
        //     reject(error);
        // })
    });
}
timeout(100).then(response => {
    const data = response;
}).catch(error => {
    console.log(error);
})

// 加载图片
function loadImageAsync (url) {
    return new Promise(function(resolve,reject){
        var image = new Image();
        image.onload = function () {
            resolve(imgae);
        };
        image.onerror = function () {
            reject(new Error('Cound not load image at ' + url));
        }
        image.src = url;
    })
}

// 实现ajax
var getJSON = function (url) {
    var promise = new Promise((resolve,reject) => {
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();

        function handler () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                // 参数会被传递到回调函数，resolve函数的参数除了正常的值外，还可能是另一个Promise实例；
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
    return promise;
}
getJSON('/post.json').then(function(json) {
    console.log('Content:' + json);
})
.catch(function (error) {
    console.log(error);;
})