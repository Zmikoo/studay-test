window.onload = function () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);//获取WebGL绘图上下文
	if (!gl) {
		return;
	}
	gl.clearColor(0,0,1,1);//指定绘图区域的背景色；
	gl.clear(gl.COLOR_BUFFER_BIT);//用上一行指定的背景色清空(即：用背景色填充，擦除已经绘制的内容)
}