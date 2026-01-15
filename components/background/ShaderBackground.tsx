"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const FragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

// Noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(st);
        st = rot * st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse * 0.3;
    
    float time = uTime * 0.05;
    
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.08*time + mouse.x);
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.063*time + mouse.y);

    float f = fbm(st+r);

    // Base void color - very dark
    vec3 color = vec3(0.02, 0.008, 0.008);
    
    // Add sparse embers - using noise to create particle-like effect
    float embers = smoothstep(0.7, 0.9, f) * smoothstep(0.8, 0.6, length(r));
    
    // Ember glow color - fire orange to gold
    vec3 emberColor = mix(vec3(1.0, 0.27, 0.0), vec3(1.0, 0.84, 0.0), embers);
    
    // Add embers to the void
    color = mix(color, emberColor, embers * 0.4);
    
    // Add subtle red glow in the background
    color += vec3(0.1, 0.0, 0.0) * smoothstep(0.5, 0.8, f) * 0.2;
    
    // Darken overall for deep void effect
    color *= 0.7;
    
    gl_FragColor = vec4(color, 1.0);
}
`;

const VertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ShaderPlane = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size]
  );

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smooth mouse movement
      const targetMouse = new THREE.Vector2(
        state.pointer.x,
        state.pointer.y
      );
      material.uniforms.uMouse.value.lerp(targetMouse, 0.05);
    }
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={FragmentShader}
        vertexShader={VertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full bg-void">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void pointer-events-none" />
    </div>
  );
}
