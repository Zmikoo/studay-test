// 顶点位置 = 投影矩阵（正射投影/透视投影） * 顶点坐标
var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	attribute vec4 a_Color;\n
	uniform mat4 u_ProjMatrix;\n
	varying vec4 v_Color;\n
	void main () {
		gl_Position = u_ProjMatrix * a_Position;\n
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
var g_near = 0.0,g_far = 0.5;
function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);

	var nf = document.getElementById('nearFar');
	if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		console.log('初始化着色器失败');
		return;
	}
	var n = initVertexBuffers(gl);

	// 正射投影矩阵
	var u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');
	var projMatrix = new Matrix4(); // 等同上边注释的代码
	document.onkeydown = function (ev) {
		keydown(ev,gl,n,u_ProjMatrix,projMatrix,nf);
	}

	draw(gl,n,u_ProjMatrix,projMatrix,nf);
}
main()
function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([ // 顶点位置 & 顶点颜色
			0.0,   0.7, -0.4, 0.4, 1.0, 0.4,
			-0.7, -0.7, -0.4, 0.4, 1.0, 0.4,
			0.7,  -0.7, -0.4, 1.0, 0.4, 0.4,

			0.5,  0.4, -0.2, 1.0, 0.4, 0.4,
			-0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
			0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

			0.0,  0.2,  0.0, 0.4, 0.4, 1.0,
			-0.2, -0.2, 0.0, 0.4, 0.4, 1.0,
			0.2,  -0.2, 0.0, 1.0, 0.4, 0.4
		]);
	var n = 9;
	var vertexColorbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	var FSIZE = verticesColors.BYTES_PER_ELEMENT;

	// 将顶点位置存入缓存区
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*6,0);
	gl.enableVertexAttribArray(a_Position);

	// 将顶点颜色存入缓存区
	var a_Color = gl.getAttribLocation(gl.program,'a_Color');
	gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*6,FSIZE*3);
	gl.enableVertexAttribArray(a_Color);
	return n;
}

function keydown(ev,gl,n,u_ProjMatrix,projMatrix,nf) {
	// 按下键盘改变远近裁剪面位置
	switch (ev.keyCode) {
		case 39: g_near += 0.01; break;
		case 37: g_near -= 0.01; break;
		case 38: g_far += 0.01; break;
		case 40: g_far -= 0.01; break;
		default: return;
	}
	// 重新绘制
	draw(gl,n,u_ProjMatrix,projMatrix,nf);
}

function draw(gl,n,u_ProjMatrix,projMatrix,nf) {

	// 计算正射投影矩阵 @param:left,right(指定近裁剪面的左边界和右边界),bottom,top(指定近裁剪面的上边界和下边界)，near,far(指定近裁剪面和远裁剪面的位置)
	projMatrix.setOrtho(-1,1,-1,1,g_near,g_far);
	// projMatrix.setLookAt(g_eyeX,g_eyeY,g_eyeZ,0,0,0,0,1,0);
	gl.uniformMatrix4fv(u_ProjMatrix,false,projMatrix.elements);

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES,0,n);

	nf.innerHTML = 'near:' + Math.round(g_near * 100) / 100 + ',far:' + Math.round(g_far * 100) / 100;
}

