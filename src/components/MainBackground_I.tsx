import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
    useEffect(() => {
        let camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, material: THREE.ShaderMaterial;
        let clock = new THREE.Clock();

        // Initialize the scene
        const init = () => {
            // Create the scene
            scene = new THREE.Scene();

            // Create the camera
            camera = new THREE.Camera();
            camera.position.z = 1;

            // Create the renderer
            const canvas = document.getElementById("webgl") as HTMLCanvasElement;
            if (!canvas) {
                console.error("Canvas element not found");
                return;
            }

            renderer = new THREE.WebGLRenderer({ canvas });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Create the shader material
            const vertShader = `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `;

            const fragShader = `
                precision highp float;

                uniform vec2 iResolution;
                uniform float iTime;

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

                void main() {
                    vec2 fragCoord = gl_FragCoord.xy;

                    // get coords and direction
                    vec2 uv = fragCoord.xy / iResolution.xy - 0.5;
                    uv.y *= iResolution.y / iResolution.x;
                    vec3 dir = vec3(uv * zoom, 1.0);
                    float time = iTime * speed;

                    // automatic rotation
                    float a1 = 0.5 + time * 0.1;
                    float a2 = 0.8 + time * 0.2;
                    mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));
                    mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));
                    dir.xz *= rot1;
                    dir.xy *= rot2;

                    // 카메라 위치 업데이트
                    vec3 from = vec3(1.0 + time, 0.5 + time * 0.5, 0.5); // 시간에 따라 위치를 변경
                    from += vec3(time * 2.0, time, -2.0);
                    from.xz *= rot1;
                    from.xy *= rot2;

                    // volumetric rendering
                    float s = 0.1, fade = 1.0;
                    vec3 v = vec3(0.0);
                    for (int r = 0; r < volsteps; r++) {
                        vec3 p = from + s * dir * 0.5;
                        p = abs(vec3(tile) - mod(p, vec3(tile * 2.0))); // tiling fold
                        float pa, a = pa = 0.0;
                        for (int i = 0; i < iterations; i++) { 
                            p = abs(p) / dot(p, p) - formuparam; // the magic formula
                            a += abs(length(p) - pa); // absolute sum of average change
                            pa = length(p);
                        }
                        float dm = max(0.0, darkmatter - a * a * 0.001); // dark matter
                        a *= a * a; // add contrast
                        if (r > 6) fade *= 1.0 - dm; // dark matter, don't render near
                        v += fade;
                        v += vec3(s, s * s, s * s * s * s) * a * brightness * fade; // coloring based on distance
                        fade *= distfading; // distance fading
                        s += stepsize;
                    }
                    v = mix(vec3(length(v)), v, saturation); // color adjust

                    vec3 result = v * 0.01;

                    gl_FragColor = vec4(result, 1.0);    
                }
            `;

            material = new THREE.ShaderMaterial({
                uniforms: {
                    iTime: { value: 0 },
                    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                },
                vertexShader: vertShader,
                fragmentShader: fragShader,
            });

            const plane = new THREE.PlaneGeometry(2, 2);
            const quad = new THREE.Mesh(plane, material);
            scene.add(quad);

            window.addEventListener('resize', onWindowResize, false);
        };

        const onWindowResize = () => {
            if (material) {
                material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
            }
            if (renderer) {
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        const animate = () => {
            if (material && renderer && scene && camera) {
                material.uniforms.iTime.value = clock.getElapsedTime();
                renderer.render(scene, camera);
            }
            requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            if (renderer) {
                renderer.dispose();
            }
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);

    return <canvas id="webgl" className="fixed top-0 left-0 w-full h-full -z-1" />;
};

export default ThreeBackground;
