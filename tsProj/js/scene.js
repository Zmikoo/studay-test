var sceneInit = (function () {
	
	function inint() {
    }
    function onReturnClick() {
		if(window.sceneId == 0){
			window.close();
		}else{
			window.sceneId = 0
			window.location.reload()
		}
    }
    return {
        inint: inint,
        onReturnClick: onReturnClick
    }
}());
 sceneInit.inint();
 window.sceneId = 0