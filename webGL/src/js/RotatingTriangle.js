// 旋转公式
// x` = x*cos(B) - y*sin(B);
// y` = x*sin(B) + y*cos(B);
var VSHADER_SOURCE = `
	attribute  vec4 a_Position;\n
	uniform mat4 u_ModelMatrix;\n
	void main(){\n
		gl_Position = u_ModelMatrix * a_Position;\n
	}\n
`
var FSHADER_SOURCE = `
	void main(){\n
		gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n
	}
`
var ANGLE_STEP = 45.0;
var Tx = 0.5;
var g_last = Date.now();

function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		return;
	}

	// 三角形初始位置
	var n = initVertexBuffers(gl);
	// 三角形初始角度
	var currentAngle = 0.0;	
	// 变换矩阵uniform变量的存储地址
	var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
	// 变换矩阵
	var modelMatrix = new Matrix4();
	// 反复调用绘制函数的机制
	var tick = function () {
		// 获取上一帧动画后的当前angle
		currentAngle = animate(currentAngle);
		// 绘制三角形
		draw(gl,n,currentAngle,u_ModelMatrix,modelMatrix);
		// 请求浏览器再次调用tick
		requestAnimationFrame(tick); 
	}
	tick();
}
main();


function initVertexBuffers(gl) {
	var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
	var n = 3;
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);
	return n;
}

function animate (angle) {
	// 计算距离上次调用经过了多长时间
	var now = Date.now();
	var elapsed = now - g_last; //毫秒
	g_last = now;
	// requestAnimationFrame() 调用tick的时间间隔不是固定了
	// 根据本次调用和上次调用之间的时间间隔来决定这一帧的旋转角度比上一帧大多少
	var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
	// 保证newAngle始终小于360度
	return newAngle %= 360;
}

function draw (gl,n,currentAngle,u_ModelMatrix,modelMatrix) {
	// 将变换矩阵的值重新设置
	modelMatrix.setRotate(currentAngle,0,0,1);
	gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
	// 绘制
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES,0,n);
}

