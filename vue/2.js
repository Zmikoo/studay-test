var obj = {
	name:'Jim'
}

function defineReactive(data,key,val){
	Object.defineProperty(data,key,{
		enumerable:true,
		configerable:true,
		get:function(){
			return val;
		},
		set:function(newVal){
			if(val === newVal){
				return	
			}
			val = newVal
		}
	})
}