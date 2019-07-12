// 只有顶点着色器可以使用attribute变量，片源着色器的变量有uniform和varying变量
var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	void main(){\n
		gl_Position = a_Position;\n
		gl_PointSize = 10.0;\n
	}\n
`
// precision精度限定词指定变量的范围（最大值最小值）和精度
var FSHADER_SOURCE = `
	precision mediump float;\n
	uniform vec4 u_FragColor;\n
	void main(){\n
		gl_FragColor = u_FragColor;\n
	}\n
`
function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);
	if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		return;
	}
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');
	canvas.onmousedown = function (ev) {
		click(ev,gl,canvas,a_Position,u_FragColor);
	}
	gl.clear(gl.COLOR_BUFFER_BIT);
}
main();
var g_points = [];
var g_colors = [];
function click(ev,gl,canvas,a_Position,u_FragColor) {
	var x = ev.clientX;
	var y = ev.clientY;
	// 获取canvas在浏览器客户区的坐标
	var rect = ev.target.getBoundingClientRect();
	// 浏览器坐标转为canvas的坐标再转为WebGL坐标；
	x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
	y = ((canvas.height / 2 - (y - rect.top))) / (canvas.height / 2);

	g_points.push([x, y]);

	if (x >= 0.0 && y >= 0.0) {
		g_colors.push([1.0,0.0,0.0,1.0]); // 第一象限红色
	} else if (x < 0.0 & y < 0.0) {
		g_colors.push([0.0,1.0,0.0,1.0]); // 第三象限绿色
	} else {
		g_colors.push([1.0,1.0,1.0,1.0]); // 白色
	}
	// 用指定的背景色清空canvas
	gl.clear(gl.COLOR_BUFFER_BIT);

	for (let i = 0, len = g_points.length; i < len; i++) {
		var xy = g_points[i];
		var rgba = g_colors[i];

		gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
		gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);

		gl.drawArrays(gl.POINTS,0,1);
	}
}