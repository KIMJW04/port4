const vert_code = `
    attribute vec3 aPos;

    void main() 
    {
        gl_Position = vec4(aPos, 1.0);
    }`;

const frag_code = `
    precision highp float;

    uniform vec2 iResolution;
    uniform vec2 iMouse;

    uniform float iTime;

    uniform float gamma;

    #define iterations 17
    #define formuparam 0.53

    #define volsteps 20
    #define stepsize 0.1

    #define zoom   0.800
    #define tile   0.850
    #define speed  0.010 

    #define brightness 0.0015
    #define darkmatter 0.300
    #define distfading 0.730
    #define saturation 0.850


    void main()
    {
        vec2 fragCoord = gl_FragCoord.xy;

        //get coords and direction
        vec2 uv=fragCoord.xy/iResolution.xy-.5;
        uv.y*=iResolution.y/iResolution.x;
        vec3 dir=vec3(uv*zoom,1.);
        float time=iTime*speed+.25;

        //mouse rotation
        float a1=.5+iMouse.x/iResolution.x*2.;
        float a2=.8+iMouse.y/iResolution.y*2.;
        mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
        mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
        dir.xz*=rot1;
        dir.xy*=rot2;
        vec3 from=vec3(1.,.5,0.5);
        from+=vec3(time*2.,time,-2.);
        from.xz*=rot1;
        from.xy*=rot2;
        
        //volumetric rendering
        float s=0.1,fade=1.;
        vec3 v=vec3(0.);
        for (int r=0; r<volsteps; r++) {
            vec3 p=from+s*dir*.5;
            p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
            float pa,a=pa=0.;
            for (int i=0; i<iterations; i++) { 
                p=abs(p)/dot(p,p)-formuparam; // the magic formula
                a+=abs(length(p)-pa); // absolute sum of average change
                pa=length(p);
            }
            float dm=max(0.,darkmatter-a*a*.001); //dark matter
            a*=a*a; // add contrast
            if (r>6) fade*=1.-dm; // dark matter, don't render near
            //v+=vec3(dm,dm*.5,0.);
            v+=fade;
            v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
            fade*=distfading; // distance fading
            s+=stepsize;
        }
        v=mix(vec3(length(v)),v,saturation); //color adjust

        vec3 result = v*.01;

        result = pow(result, vec3(1.0/gamma));
        gl_FragColor = vec4(result,1.0);    
    }`;

const outer_frag = `
    precision highp float;

    uniform vec3 color;

    void main()
    {
        gl_FragColor = vec4(color, 1.0); 
    }`;

var speed = 0;
var gamma = 1.5;

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

var width = innerWidth;
var height = innerHeight - 5;

const canvas = document.getElementById("webgl");
canvas.width = width;
canvas.height = height;

var gl = canvas.getContext("webgl");

if (!gl)
    console.log("webgl not suported");

window.onresize = () => {
    width = innerWidth;
    height = innerHeight - 4;

    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
};

var mouseX = 0;
var mouseY = 0;

window.onmousemove = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
};

gl.viewport(0, 0, width, height);
gl.clearColor(0, 0, 0, 1.0);

const vert_shader = createShader(gl, gl.VERTEX_SHADER, vert_code);
const frag_shader = createShader(gl, gl.FRAGMENT_SHADER, frag_code);

const ProgramID = createProgram(gl, vert_shader, frag_shader);

const positions =
    [
        -1.0, 1.0, 0.0,
        -1.0, -1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
    ];

var buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

var attrPos = gl.getAttribLocation(ProgramID, "aPos");

var uResolution = gl.getUniformLocation(ProgramID, "iResolution");
var uMouse = gl.getUniformLocation(ProgramID, "iMouse");
var uTimer = gl.getUniformLocation(ProgramID, "iTime");
var uGamma = gl.getUniformLocation(ProgramID, "gamma");

var then = 0;
var elpasedTime = 0;

function Update() {
    window.wallpaperPropertyListener =
    {
        applyUserProperties: (properties) => {
            if (properties.slider_gamma) {
                gamma = properties.slider_gamma.value;
            }
            if (properties.slider_speed) {
                speed = properties.slider_speed.value;
            }
        },
    };
}

function Render(time) {
    time *= 0.001;
    elpasedTime = time - then;
    then = time;

    Update();

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttribPointer(attrPos, 3, gl.FLOAT, false, 3 * 4, 0);
    gl.enableVertexAttribArray(attrPos);

    gl.useProgram(ProgramID);
    gl.uniform2fv(uResolution, [width, height]);
    gl.uniform2fv(uMouse, [0, 0]);
    gl.uniform1f(uTimer, time * speed);
    gl.uniform1f(uGamma, gamma);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(Render);
}

Render(0);
