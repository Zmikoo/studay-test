var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	void main () {\n
		gl_Position = a_Position;\n
		gl_PointSize = 10.0;\n
	}\n
`
var FSHADER_SOURCE = `
	void main(){\n
		gl_FragColor = vec4(1.0,1.0,0.0,1.0);\n
	}
`
function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);

	if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		return;
	}
	var n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the posiiton of the vertices');
		return;
	}
	// 记住永远要在绘制之前清空一次canvas;
	gl.clear(gl.COLOR_BUFFER_BIT);
	/*@param
		*mode（指定绘制的类型）
		*first (指定从哪个顶点开始绘制---int)
		*count(指定绘制需要用到多少个顶点---int)
	*/
	gl.drawArrays(gl.POINTS,0,n);
}
main();

// 创建缓冲区对象并将多个顶点的数据保存在缓冲区中，然后将缓冲区传给顶点着色器；
function initVertexBuffers(gl) {
	// 3个顶点的位置信息
	var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
	var n = 3;

	// 创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}

	// 将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	// 给目标赋值
	/* @param
		*target(gl_ARRAY_BUFFER或gl.ELEMENT_ARRAY_BUFFER);
		*data(写入缓冲区对象的数据----类型化数组)
		*usage(表示程序将如何使用存储在缓冲区对象中的数据，帮助WebGL优化操作，就算传入错误的值也不会终止程序)
	*/
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	// 将缓冲区对象分配给a_Position变量
	/* @param:
		*location(变量地址)，
		*size(指定缓冲区中每个顶点的分量个数,比如本例中顶点只给了x,y,所以分量为2)，
		*type(指定数据格式)，
		*normalized(是否将非浮点型的数据归一化到[0,1]或[-1,1]区间)，
		*stride(指定相邻两个顶点间的字节数，默认为0)，
		*offset(缓冲区对象中的偏移量，以字节为单位，即attribute变量从缓存区中的何处开始存储)
	*/
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
	// 连接a_Position变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Position);
	return n;
}