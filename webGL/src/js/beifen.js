var VSHADER_SOURCE = `
    attribute vec4 a_Position;\n
    attribute vec4 a_Normal;\n
    uniform mat4 u_MvpMatrix;\n
    uniform mat4 u_NormalMatrix;\n
    varying vec4 v_Color;\n
    void main () {
        gl_Position = u_MvpMatrix * a_Position;\n
        vec3 lightDirection = normalize(vec3(0.0,0.5,0.7));\n
        vec4 color = vec4(1.0,0.4,0.0,1.0);\n
        vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);\n
        float nDotL = max(dot(normal,lightDirection),0.0);\n
        v_Color = vec4(color.rgb * nDotL + vec3(0.1),color.a);\n
    }
`
var FSHADER_SOURCE = `
    void main(){
        precision mediump float;\n
        varying vec4 v_Color;
        void main() {
            gl_FragColor = v_Color;\n
        }
    }
`

function main () {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('您的浏览器不支持WebGL');
        return;
    }
    if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
        console.log('无法初始化着色器');
        return;
    }

    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('无法设置缓冲区相关信息');
        return;
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.enable(gl.DEPTH_TEST);

    var u_MvpMatrix = gl.getUnifromLocation(gl.program,'u_MvpMatrix');
    var u_NormalMatrix = gl.getUnifromLocation(gl.program,'u_NormalMatrix');
    if (!u_NormalMatrix || !u_MvpMatrix) {
        console.log('无法获取到相关的存储位置');
        return;
    }

    var viewProjMatrix = new Matrix4();
    viewProjMatrix.setPerspective(50.0,canvas.width/canvas.height,1.0,100.0);
    viewProjMatrix.lookAt(20.0,10.0,30.0, 0.0,0.0,0.0, 0.0,1.0,0.0);

    document.onkeydown = function (e) {
        keydown(e,gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);
    }

    draw(e,gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);
}

var ANGLE_STEP = 3.0;
var g_arm1Angle = 90.0;
var g_joint1Angle = 0.0;
var g_joint2Angle = 0.0;
var g_joint3Angle = 0.0;

function keydown(ev,gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix) {
    switch (ev.keyCode) {
        case 38:
            if (g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
            break;
        case 40:
            if (g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
            break;
        case 39:
            g_arm1Angle = (g_arm1Angle - ANGLE_STEP) % 360;
            break;
        case 37:
            g_arm1Angle = (g_arm1Angle - ANGLE_STEP) % 360;
            break;
        case 90:
        g_joint2Angle = (g_joint2Angle + ANGLE_STEP) % 360;
            break;
        case 88:
            g_joint2Angle = (g_joint2Angle - ANGLE_STEP) %360;
            break;
        case 86:
            if (g_joint3Angle < 60.0) {
                g_joint3Angle = (g_joint3Angle + ANGLE_STEP) % 360;
            }
            break;
        case 67:
            if (g_joint3Angle > -60.0) {
                g_joint3Angle = (g_joint3Angle - ANGLE_STEP) % 360;
            }
        default: return;
    }
    draw(gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
            0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5,  0.5, 0.0, 0.5, // v0-v1-v2-v3 front
            0.5, 1.0, 0.5,  0.5, 0.0, 0.5,  0.5, 0.0,-0.5,  0.5, 1.0,-0.5, // v0-v3-v4-v5 right
            0.5, 1.0, 0.5,  0.5, 1.0,-0.5, -0.5, 1.0,-0.5, -0.5, 1.0, 0.5, // v0-v5-v6-v1 up
            -0.5, 1.0, 0.5, -0.5, 1.0,-0.5, -0.5, 0.0,-0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
            -0.5, 0.0,-0.5,  0.5, 0.0,-0.5,  0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
            0.5, 0.0,-0.5, -0.5, 0.0,-0.5, -0.5, 1.0,-0.5,  0.5, 1.0,-0.5  // v4-v7-v6-v5 back
        ]);

    var colors = new Float32Array([ // 顶点颜色
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
        ])
     // 索引
    var indices = new Uint8Array([
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
        12,13,14,  12,14,15,    // left
        16,17,18,  16,18,19,    // down
        20,21,22,  20,22,23     // back
    ]);
    // 每一个面的法向量
    var normals = new Float32Array([
        0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
        1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
        0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
        0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
        0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
    ]);

    if (!initArrayBuffer(gl,'a_Position',vertices,gl.FLOAT,3)) return -1;
    if (!initArrayBuffer(gl,'a_Normal',normals,gl.FLOAT,3)) return -1;

    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    var indexBuffer = gl.createBuffer();
    if (!indexBuffer) {
        console.log('无法创建索引缓冲区');
        return -1;
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);

    return indices.length;
}

function initArrayBuffer(gl,attribute,data,type,num) {
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.log('无法创建缓冲区');
        return false;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);

    var a_attribute = gl.getAttribLocation(gl.program,attribute);
    if (a_attribute < 0) {
        console.log('无法获取到变量' + attribute + '存储位置');
        return false;
    }
    gl.vertexAttribPointer(a_attribute,num,type,false,0,0);
    gl.enableVertexAttribArray(a_attribute);
    return true;
}

var g_modelMatrix = new Matrix4();
var g_MvpMatrix = new Matrix4();

function draw (gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix) {
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    var baseHeight = 2.0;
    g_modelMatrix.setTranslate(0.0,-12.0,0.0);
    drawBox(gl,n,10.0,baseHeight,10.0,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);

    var arm1Length = 10.0;
    g_modelMatrix.translate(0.0,baseHeight,0.0);
    g_modelMatrix.rotate(g_arm1Angle,0.0,1.0,0.0);
    drawBox(gl,n,3.0,arm1Length,3.0,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);

    var arm2Length = 10.0;
    g_modelMatrix.translate(0.0,arm1Length,0.0);
    g_modelMatrix.rotate(g_joint1Angle,0.0,0.0,1.0);
    drawBox(gl,n,4.0,arm2Length,4.0,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);

    var palmLength = 2.0;
    g_modelMatrix.translate(0.0,arm2Length,0.0);
    g_modelMatrix.rotate(gl,n,2.0,palmLength,6.0,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);

    g_modelMatrix.translate(0.0,palmLength,0.0);

    pushMatrix()

}

var g_normalMatrix = new Matrix4();

function drawBox(gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix) {

}
