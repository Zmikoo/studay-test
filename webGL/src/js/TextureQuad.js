var VSHADER_SOURCE = `
	attribute vec4 a_Position;\n
	attribute vec2 a_TexCoord;\n
	varying vec2 v_TexCoord;\n
	void main(){\n
		gl_Position = a_Position;\n
		v_TexCoord = a_TexCoord;\n
	}\n
`
var FSHADER_SOURCE = `
	precision mediump float;\n
	uniform sampler2D u_Sampler;\n
	varying vec2 v_TexCoord;\n
	void main(){\n
		gl_FragColor = texture2D(u_Sampler,v_TexCoord);\n
	}
`
function main(){
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	gl.clearColor(0.0,0.0,0.0,1.0)
	if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
		console.log("初始化着色器失败！");
		return;
	}
	var n = initVertexBuffers(gl);
	 if(n < 0){ console.log("无法获取到点的数据"); return; } //配置纹理 
	 if(!initTextures(gl,n)){ console.log("无法配置纹理"); return; }

}
main()
function initVertexBuffers(gl){
	var verticesTexCoords = new Float32Array([
			-0.5,  0.5, 0.0, 1.0,
			-0.5, -0.5, 0.0, 0.0,
			 0.5,  0.5, 1.0, 1.0,
			 0.5, -0.5, 1.0, 0.0
		]);
	var n = 4;
	var vertexTexCoordBuffer = gl.createBuffer();
	if(!vertexTexCoordBuffer){
            console.log("无法创建缓冲区");
            return -1;
        }
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexTexCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,verticesTexCoords,gl.STATIC_DRAW);

	var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	if(a_Position < 0){
            console.log("无法获取到存储位置");
            return;
        }
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
	gl.enableVertexAttribArray(a_Position);
	var a_TexCoord = gl.getAttribLocation(gl.program,'a_TexCoord');
	if (a_TexCoord < 0) {
		console.log('无法获取到存储位置');
		return;
	}
	gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4,FSIZE*2);
	gl.enableVertexAttribArray(a_TexCoord);
	return n;
}

function initTextures(gl,n){
	var texture = gl.createTexture();
	if (!texture) {
		console.log('无法创建纹理对象');
		return;
	}
	var u_Sampler = gl.getUniformLocation(gl.program,'u_Sampler');
	if(u_Sampler < 0) {
		console.log('无法获取变量的存储位置');
		return;
	}

	var image = new Image();
	image.onload = function () {
		loadTexture(gl,n,texture,u_Sampler,image);
	}
	image.src = './resource/4.jpg';
	return true;
}

function loadTexture(gl,n,texture,u_Sampler,image){
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);// 对纹理图像进行y轴反转
	gl.activeTexture(gl.TEXTURE0);// 开启0号纹理单元
	gl.bindTexture(gl.TEXTURE_2D,texture);// 绑定纹理对象

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);// 配置纹理参数
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);

	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);// 配置纹理图像
	gl.uniform1i(u_Sampler,0);// 将0号纹理传递给着色器中的取样器变量

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
}





