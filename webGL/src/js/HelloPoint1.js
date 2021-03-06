window.onload = function () {
	var VSHADER_SOURCE = `void main() {\n
							gl_Position = vec4(0,0,0,1);\n
							gl_PointSize = 10.0;\n
							}
						 `
	var FSHADER_SOURCE = `void main() {\n
							gl_FragColor = vec4(1,0,0,1);\n
							}\n`
	function main() {
		var canvas = document.getElementById('webgl');

		var gl = getWebGLContext(canvas);
		if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
			return;
		}
		gl.clearColor(0,0,1,1);//指定绘图区域的背景色；
		gl.clear(gl.COLOR_BUFFER_BIT);//用上一行指定的背景色清空(即：用背景色填充，擦除已经绘制的内容)
		gl.drawArrays(gl.POINTS,0,1);

	}
	main()
}