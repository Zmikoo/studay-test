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
	gl.enable(gl.DEPTH_TEST);// 开启隐藏面消除

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
			 0.5,  0.5, 0.5, 1.0, 1.0, 1.0,
			-0.5,  0.5, 0.5, 1.0, 0.0, 1.0,
			-0.5, -0.5, 0.5, 1.0, 0.0, 0.0,
			 0.5, -0.5, 0.5, 1.0, 1.0, 0.0,

			0.5,  -0.5, -0.5, 0.0, 1.0, 0.0,
			0.5,   0.5, -0.5, 0.0, 1.0, 1.0,
			-0.5,  0.5, -0.5, 0.0, 0.0, 1.0,
			-0.5, -0.5, -0.5, 0.0, 0.0, 0.0,
		]);
	var indices = new Uint8Array([
			0,1,2,0,2,3,
			0,3,4,0,4,5,
			0,5,6,0,6,1,
			1,6,7,1,7,2,
			7,4,3,7,3,2,
			4,7,6,4,6,5
		]);// 顶点索引
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

	// 注意：顶点索引数据只需要写入缓存区即可，绑定目标为gl.ELEMENT_ARRAY_BUFFER,不需要赋给内部变量
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
	return indices.length;
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
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT); // 清空颜色和深度缓冲区
	// gl.clear(gl.DEPTH_BUFFER_BIT);
	gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
}

