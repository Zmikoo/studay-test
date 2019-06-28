// 旋转公式
// x` = x*cos(B) - y*sin(B);
// y` = x*sin(B) + y*cos(B);
var VSHADER_SOURCE = `
	attribute  vec4 a_Position;\n
	uniform mat4 u_xformMatrix;\n
	void main(){\n
		gl_Position = u_xformMatrix * a_Position;\n
	}\n
`
var FSHADER_SOURCE = `
	void main(){\n
		gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n
	}
`
var ANGLE = 90.0;
function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		return;
	}
	var n = initVertexBuffers(gl);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.LINE_LOOP,0,n);
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

	var xformMatrix = new Matrix4();
	// @param: 旋转角（角度制而非弧度制），x,y,z---旋转轴
	// 旋转轴为从原点指向（x,y,z)的轴
	xformMatrix.setRotate(ANGLE,1,1,1); // 旋转
	// xformMatrix.setScale(1,1.5,1); // 缩放
	// xformMatrix.setTranslate(0.5,0.5,0.5); // 平移

	var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');
	gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);
	return n;
}