var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	attribute vec4 a_Color;\n
	uniform mat4 u_MvpMatrix;\n
	varying vec4 v_Color;\n
	void main () {
		gl_Position = u_MvpMatrix * a_Position;\n
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
var g_eyeX = 0.0,g_eyeY = 0.0, g_eyeZ = 5;

function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.POLYGON_OFFSET_FILL); // 启用多边形偏移---P264;
	if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		console.log('初始化着色器失败');
		return;
	}
	var n = initVertexBuffers(gl);
	
	var projMatrix = new Matrix4(); // 投影矩阵
	projMatrix.setPerspective(30,canvas.width/canvas.height,1,100);
	var modelMatrix = new Matrix4(); // 模型矩阵
	var viewMatrix = new Matrix4(); // 视图矩阵
	var mvpMatrix = new Matrix4();
	var u_MvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');
	document.onkeydown = function (ev) {
		keydown(ev,gl,n,viewMatrix,modelMatrix,projMatrix,u_MvpMatrix,mvpMatrix);
	}

	draw(gl,n,viewMatrix,modelMatrix,projMatrix,u_MvpMatrix,mvpMatrix);
}
main()
function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
			0.0,   1.0, -4.0, 0.0, 1.0, 0.0,
			-0.5, -1.0, -4.0, 0.0, 1.0, 0.0,
			0.5,  -1.0, -4.0, 1.0, 0.0, 0.0,

			0.0,   1.0, -4.0, 1.0, 0.0, 0.0,
			-0.5, -1.0, -4.0, 1.0, 1.0, 0.0,
			0.5,  -1.0, -4.0, 1.0, 1.0, 0.0,

		]);
	var n = 6;
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

function keydown(ev,gl,n,viewMatrix,modelMatrix,projMatrix,u_MvpMatrix,mvpMatrix) {
	if (ev.keyCode === 39) {
		g_eyeX += 0.01;
	} else if (ev.keyCode === 37) {
		g_eyeX -= 0.01;
	} else {
		return;
	}
	draw(gl,n,viewMatrix,modelMatrix,projMatrix,u_MvpMatrix,mvpMatrix);
}

function draw(gl,n,viewMatrix,modelMatrix,projMatrix,u_MvpMatrix,mvpMatrix) {
	viewMatrix.setLookAt(g_eyeX,g_eyeY,g_eyeZ,0,0,0,0,1,0);
	modelMatrix.setTranslate(0.75,0,0);
	mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	// gl.clear(gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES,0,n/2);
	gl.polygonOffset(1.0,1.0); // 设置多边形偏移
	gl.drawArrays(gl.TRIANGLES,n/2,n/2);

}

