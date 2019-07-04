var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	void main(){\n
		gl_Position = a_Position;\n
	}\n
`
var FSHADER_SOURCE = `
	precision mediump float;\n
	uniform float u_Width;\n
	uniform float u_Height;\n
	void main(){\n
		gl_FragColor = vec4(gl_FragCoord.x/u_Width,gl_FragCoord.y/u_Height,0.0,1.0);\n
	}
`
function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		return;
	}
	var n = initVertexBuffers(gl);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES,0,n);
	// gl.drawArrays(gl.LINES,0,n);
	// gl.drawArrays(gl.LINE_STRIP,0,n);
	// gl.drawArrays(gl.LINE_LOOP,0,n);
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

	var u_Width = gl.getUniformLocation(gl.program,'u_Width');
	var u_Height = gl.getUniformLocation(gl.program,'u_Height');
	gl.uniform1f(u_Width,gl.drawingBufferHeight);
	gl.uniform1f(u_Height,gl.drawingBufferWidth);
	return n;
}
