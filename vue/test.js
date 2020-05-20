(async function(){
    function sleep(s){
        s = s || 0;
        s = parseInt(s) * 1000;
        let now = +new Date();
        let timer = null;
        return new Promise((resolve,reject)=>{
            timer = setInterval(()=>{
                if (now + s < +new Date()){
                    clearInterval(timer);
                    resolve(true);
                }
            },10)
        })
    }
    console.log(`start"${new Date()}`);
    await sleep(3);
    console.log(`end:${new Date()}`);
})()