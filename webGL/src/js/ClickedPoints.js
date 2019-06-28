
	var VSHADER_SOURCE = `
		attribute vec4 a_Postion;\n
		void main(){\n
			gl_Position = a_Postion;\n
			gl_PointSize = 10.0;\n
		}\n
	`
	var FSHADER_SOURCE = `
		void main(){\n
			gl_FragColor = vec4(0.0,1.0,0.0,0.0);\n
		}
	`

	function main () {
		var canvas = document.getElementById('webgl');
		var gl = getWebGLContext(canvas);
		gl.clearColor(0.0,0.0,0.0,1.0);
		console.log(gl);
		if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
			return;
		}
		var a_Postion = gl.getAttribLocation(gl.program,'a_Postion');
		canvas.onmousedown = function (ev) {
			click(ev,gl,canvas,a_Postion);
		}
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	main()

	var g_points = [];
	function click(ev,gl,canvas,a_Postion) {
		var x = ev.clientX;
		var y = ev.clientY;
		var rect = ev.target.getBoundingClientRect();
		// 浏览器坐标转为canvas的坐标再转为WebGL坐标；详见书本P52
		x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
		y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
		g_points.push([x,y]);
		// 用指定的背景色清空canvas
		gl.clear(gl.COLOR_BUFFER_BIT);

		for (var i = 0, len = g_points.length; i < len; i ++) {
			gl.vertexAttrib3f(a_Postion, g_points[i][0], g_points[i][1], 0.0);

			gl.drawArrays(gl.POINTS,0,1);
		}
	}