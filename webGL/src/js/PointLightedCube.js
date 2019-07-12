// a_Normal表面法向量 a_Color表面基底色  u_ModelMatrix模型矩阵 u_NormalMatrix 用来变换法向量的矩阵
// u_LightColor光颜色  u_LightPosition光源位置(世界坐标系下且在传入着色器前已经在Js中归一化了)

// 1 计算顶点位置在世界坐标系中的位置: 模型矩阵 * 顶点坐标
// 2 对应的变换模型法向量： 模型矩阵的逆转置矩阵 * 法向量
// 3 计算点光源在某顶点处的光方向 = 点光源位置 - 顶点位置（已转换到世界坐标系下）
// 4 计算法向量与光线方向的点积nDotL
// 5 计算平行光的反射光的颜色（diffuse 反射光的颜色）
// 漫反射光颜色 = 入射光颜色 * 表面基地色 * （光线方向.法线方向）
// 6 计算环境光颜色（u_AmbientLight 环境光颜色）
// 环境反射光颜色=入射光颜色*表面基地色
// 7 计算物体表面的反射光颜色 （v_Color---将会传给片元着色器）
// 物体表面的反射光颜色=漫反射光颜色+环境反射光颜色

// dot 内置函数计算点积 normalize内置函数归一化 max内置函数取较大的值；
// 一般只代表一个方向无其他意义的向量要进行归一化，使其与其他进行计算时不改变大小

var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	attribute vec4 a_Color;\n
	attribute vec4 a_Normal;\n
	uniform mat4 u_MvpMatrix;\n
	uniform mat4 u_ModelMatrix;\n
	uniform mat4 u_NormalMatrix;
	uniform vec3 u_LightColor;\n
	uniform vec3 u_LightPosition;\n
	uniform vec3 u_AmbientLight;\n
	varying vec4 v_Color;\n
	void main () {\n
		gl_Position = u_MvpMatrix * a_Position;\n

		vec4 vertexPosition = u_ModelMatrix * a_Position;\n
		vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n
		vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n
		float nDotL = max(dot(lightDirection,normal),0.0);\n
		vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
		vec3 ambient = u_AmbientLight * a_Color.rgb;\n
		v_Color = vec4(diffuse + ambient,a_Color.a);\n
	}\n
`

var FSHADER_SOURCE = `
	precision mediump float;\n
	varying vec4 v_Color;\n
	void main () {\n
		gl_FragColor = v_Color;\n
	}
`

function main () {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		return;
	}

	var n = initVertexBuffers(gl);

	// 点光源颜色
	var u_LightColor = gl.getUniformLocation(gl.program,'u_LightColor');
	gl.uniform3f(u_LightColor,1.0,1.0,1.0);

	// 点光源位置
	var u_LightPosition = gl.getUniformLocation(gl.program,'u_LightPosition');
	gl.uniform3f(u_LightPosition,2.0,3.0,4.0);

	// 环境光颜色
	var u_AmbientLight = gl.getUniformLocation(gl.program,'u_AmbientLight');
	gl.uniform3f(u_AmbientLight,0.2,0.2,0.2);

	// 模型变换
	var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
	var modelMatrix = new Matrix4();
	modelMatrix.setTranslate(0,1,0);
	// modelMatrix.rotate(-60,0,0,1);
	gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);

	// 视图投影变换
	var u_MvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');
	var mvpMatrix = new Matrix4();
	mvpMatrix.setPerspective(30,canvas.width/canvas.height,1,100);
	mvpMatrix.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);
	mvpMatrix.multiply(modelMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);

	// 发生模型变换时要同时变换模型法向量
	var u_NormalMatrix = gl.getUniformLocation(gl.program,'u_NormalMatrix');
	var normalMatrix = new Matrix4();
	normalMatrix.setInverseOf(modelMatrix);
	normalMatrix.transpose();
	gl.uniformMatrix4fv(u_NormalMatrix,false,normalMatrix.elements);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
}
main();

function initVertexBuffers(gl) {
	var vertices = new Float32Array([ // 顶点坐标
		1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
        1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
        -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
        -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
        1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
		])
	var colors = new Float32Array([ // 顶点颜色
		1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
		])
	var indices = new Uint8Array([ // 绘制的索引
			0, 1, 2,   0, 2, 3,    // front
	        4, 5, 6,   4, 6, 7,    // right
	        8, 9,10,   8,10,11,    // up
	        12,13,14,  12,14,15,    // left
	        16,17,18,  16,18,19,    // down
	        20,21,22,  20,22,23     // back
		])
	var normals = new Float32Array([ // 法向量
			0.0,0.0,1.0,  0.0,0.0,1.0,  0.0,0.0,1.0,  0.0,0.0,1.0,
			1.0,0.0,0.0,  1.0,0.0,0.0,  1.0,0.0,0.0,  1.0,0.0,0.0,
			0.0,-1.0,0.0, 0.0,-1.0,0.0, 0.0,-1.0,0.0, 0.0,-1.0,0.0,
			-1.0,0.0,0.0, -1.0,0.0,0.0, -1.0,0.0,0.0, -1.0,0.0,0.0,
			0.0,1.0,0.0,  0.0,1.0,0.0,  0.0,1.0,0.0,  0.0,1.0,0.0,
			0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
		])

	initArrayBuffer(gl,vertices,3,gl.FLOAT,'a_Position'); // 将顶点位置存入缓存区
	initArrayBuffer(gl,colors,3,gl.FLOAT,'a_Color'); // 将立方体顶点颜色存入缓存区
	initArrayBuffer(gl,normals,3,gl.FLOAT,'a_Normal'); // 将平面法向量存入缓存区
	var indexBuffer = gl.createBuffer(); // 将顶点索引放入缓存区，与以上三个的绑定目标不相同
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);

	return indices.length;
}

function initArrayBuffer(gl,data,num,type,attribute) {
	var buffer = gl.createBuffer();
	if (!buffer) {
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
	gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
	var a_attribute = gl.getAttribLocation(gl.program,attribute);
	gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
	return true;
}