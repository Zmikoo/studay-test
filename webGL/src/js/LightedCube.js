// a_Normal表面法向量 a_Color表面基底色  
// u_LightColor入射光颜色  u_LightDirection入射光方向(世界坐标系下且在传入着色器前已经在Js中归一化了)
// nDotL 计算光线方向和法向量的点积
// diffuse 计算反射光的颜色
// 1 归一化平面法向量
// 2 计算法向量与光线方向的点积nDotL
// 3 计算平行光的反射光的颜色（diffuse 反射光的颜色）
// 漫反射光颜色 = 入射光颜色 * 表面基地色 * （光线方向.法线方向）
// 4 将反射光颜色由vec3类型转为vec4类型

// dot 内置函数计算点积 normalize内置函数归一化 max内置函数取较大的值；
// 一般只代表一个方向无其他意义的向量要进行归一化，使其与其他进行计算时不改变大小
var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	attribute vec4 a_Color;\n
	attribute vec4 a_Normal;\n 
	uniform mat4 u_MvpMatrix;\n
	uniform vec3 u_LightColor;\n
	uniform vec3 u_LightDirection;\n
	varying vec4 v_Color;\n
	void main () {\n
		gl_Position = u_MvpMatrix * a_Position;\n

		vec3 normal = normalize(vec3(a_Normal));\n
		float nDotL = max(dot(u_LightDirection,normal),0.0);\n
		vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;\n
		v_Color = vec4(diffuse,a_Color.a);\n
	}\n
`
var FSHADER_SOURCE = `
	precision mediump float;\n
	varying vec4 v_Color;\n
	void main () {\n
		gl_FragColor = v_Color;\n
	}\n
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

	// 平行光颜色
	var u_LightColor = gl.getUniformLocation(gl.program,'u_LightColor');
	gl.uniform3f(u_LightColor,1.0,1.0,1.0); // 入射光为白色

	// 平行光方向
	var u_LightDirection = gl.getUniformLocation(gl.program,'u_LightDirection');
	var LightDirection = new Vector3([0.5,3.0,4.0]); // js中有内置Vector3？也许有吧，属于WebGL的范畴
	LightDirection.normalize(); // 将方向归一化
	gl.uniform3fv(u_LightDirection,LightDirection.elements); // 入射光方向

	// 模型视图投影矩阵
    var u_MvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');
	var mvpMatrix = new Matrix4();
	mvpMatrix.setPerspective(30,canvas.width/canvas.height,1,100);
	mvpMatrix.lookAt(3,3,7,0,0,0,0,1,0);
	gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);

	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
}

main();

function initVertexBuffers(gl) {
	var vertices = new Float32Array([   // 顶点的位置坐标数据
        1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
        1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
        -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
        -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
        1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
    ]);
	var colors = new Float32Array([    // 顶点颜色
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
    ]);
	var indices = new Uint8Array([       // 绘制的索引
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
        12,13,14,  12,14,15,    // left
        16,17,18,  16,18,19,    // down
        20,21,22,  20,22,23     // back
    ]);
	var normals = new Float32Array([ // 法向量
			0.0,0.0,1.0,  0.0,0.0,1.0,  0.0,0.0,1.0,  0.0,0.0,1.0,
			1.0,0.0,0.0,  1.0,0.0,0.0,  1.0,0.0,0.0,  1.0,0.0,0.0,
			0.0,-1.0,0.0, 0.0,-1.0,0.0, 0.0,-1.0,0.0, 0.0,-1.0,0.0,
			-1.0,0.0,0.0, -1.0,0.0,0.0, -1.0,0.0,0.0, -1.0,0.0,0.0,
			0.0,1.0,0.0,  0.0,1.0,0.0,  0.0,1.0,0.0,  0.0,1.0,0.0,
			0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
		]);
	initArrayBuffer(gl,vertices,3,gl.FLOAT,'a_Position');// 将顶点位置存入缓存区
	initArrayBuffer(gl,colors,3,gl.FLOAT,"a_Color");// 将立方体顶点颜色存入缓存区
	initArrayBuffer	(gl,normals	,3 ,gl.FLOAT,'a_Normal');// 将平面法向量存入缓存区
	// 注意：顶点索引数据只需要写入缓存区即可，绑定目标为gl.ELEMENT_ARRAY_BUFFER,不需要赋给内部变量
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
	return indices.length;
}

function initArrayBuffer(gl,data,num,type,attribute) {
    //创建缓冲区对象
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.log("无法创建缓冲区对象");
        return -1;
    }

    //绑定缓冲区对象并写入数据
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    //获取顶点位置变量位置
    var a_attribue = gl.getAttribLocation(gl.program, attribute);
    if (a_attribue < 0) {
        console.log("无法获取顶点位置的存储变量");
        return -1;
    }

    //对位置的顶点数据进行分配，并开启
    gl.vertexAttribPointer(a_attribue, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribue);
    return	true;
}
