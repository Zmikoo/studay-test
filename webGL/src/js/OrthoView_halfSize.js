// 顶点位置 = 投影矩阵（正射投影/透视投影） * 视图矩阵 * 顶点坐标
var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	attribute vec4 a_Color;\n
	uniform mat4 u_ViewMatrix;\n
	uniform mat4 u_ProjMatrix;\n
	varying vec4 v_Color;\n
	void main () {
		gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;\n
		v_Color = a_Color;\n
	}
`

var FSHADER_SOURCE = `
	precision mediump float;\n
	varying vec4 v_Color;\n
	void main () {\n
		gl_FragColor = v_Color;\n
	}
`
var g_eyeX = 0.20,g_eyeY = 0.25, g_eyeZ = 0.25;

function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);
	if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		console.log('初始化着色器失败');
		return;
	}
	var n = initVertexBuffers(gl);

	// 视图矩阵
	var u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');
	var viewMatrix = new Matrix4(); // 等同上边注释的代码
	document.onkeydown = function (ev) {
		keydown(ev,gl,n,u_ViewMatrix,viewMatrix);
	}

	// 正射投影矩阵
	var u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');
	var projMatrix = new Matrix4();
	projMatrix.setOrtho(-0.3,0.3,-1.0,1.0,0.0,0.5);
	// projMatrix.setOrtho(-0.5,0.5,-0.5,0.5,0.0,1.0);
	gl.uniformMatrix4fv(u_ProjMatrix,false,projMatrix.elements);

	draw(gl,n,u_ViewMatrix,viewMatrix);
}
main()
function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
			0.0,   0.5, -0.4, 0.4, 1.0, 0.4,
			-0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
			0.5,  -0.5, -0.4, 1.0, 0.4, 0.4,

			0.5,  0.4, -0.2, 1.0, 0.4, 0.4,
			-0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
			0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

			0.0,  0.5,  0.0, 0.4, 0.4, 1.0,
			-0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
			0.5,  -0.5, 0.0, 1.0, 0.4, 0.4
		]);
	var n = 9;
	var vertexColorbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	var FSIZE = verticesColors.BYTES_PER_ELEMENT;

	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*6,0);
	gl.enableVertexAttribArray(a_Position);

	var a_Color = gl.getAttribLocation(gl.program,'a_Color');
	gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*6,FSIZE*3);
	gl.enableVertexAttribArray(a_Color);
	return n;
}

function keydown(ev,gl,n,u_ViewMatrix,viewMatrix) {
	// 按下键盘改变视点位置
	if (ev.keyCode === 39) {
		g_eyeX += 0.01;
	} else if (ev.keyCode === 37) {
		g_eyeX -= 0.01;
	} else {
		return;
	}
	draw(gl,n,u_ViewMatrix,viewMatrix);
}

function draw(gl,n,u_ViewMatrix,viewMatrix) {
	// 创建视图矩阵
	viewMatrix.setLookAt(g_eyeX,g_eyeY,g_eyeZ,0,0,0,0,1,0);
	gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES,0,n);
}

