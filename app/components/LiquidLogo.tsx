'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  // Smooth noise function for liquid glass distortion
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // 1. LOCALIZED CURSOR TRACKING
    float dist = distance(uv, uMouse);
    // Smooth, wider radius for an elegant feel rather than a harsh glitch
    float hoverForce = smoothstep(0.5, 0.0, dist) * uHover;

    // 2. LIQUID GLASS DISTORTION
    // Use simplex noise to gently warp the UVs like moving water
    float noise = snoise(uv * 3.0 + uTime * 0.5) * 0.05 * hoverForce;
    uv.x += noise;
    uv.y += noise * 0.5;

    // 3. PREMIUM CHROMATIC ABERRATION (Subtle RGB Split)
    float splitAmount = 0.008 * hoverForce;
    
    vec4 texR = texture2D(uTexture, uv + vec2(splitAmount, 0.0));
    vec4 texG = texture2D(uTexture, uv);
    vec4 texB = texture2D(uTexture, uv - vec2(splitAmount, 0.0));
    
    float alpha = texG.a;
    vec3 baseColor = vec3(texR.r, texG.g, texB.b);

    // 4. ARC SYSTEM GLOW
    // Shift the color matrix toward Arc's Cyan/Indigo instead of terminal green
    // Cyan: 0.02, 0.71, 0.83 | Indigo: 0.31, 0.27, 0.90
    vec3 arcGlow = mix(baseColor, baseColor * vec3(1.2, 1.5, 1.8), hoverForce * 0.5);
    
    gl_FragColor = vec4(arcGlow, alpha);
  }
`;

export default function LiquidLogo({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);
  
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const { viewport } = useThree();
  const scaleFactor = Math.min(1, (viewport.width * 0.9) / 10);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth, luxurious lerp speed (0.15 -> 0.05)
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hovered ? 1.0 : 0.0,
        0.05
      );

      // Mouse tracking lerp
      mouseRef.current.lerp(targetMouse.current, 0.1);
      materialRef.current.uniforms.uMouse.value = mouseRef.current;
    }
  });

  return (
    <mesh
      scale={[scaleFactor, scaleFactor, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={(e) => {
        if (e.uv) {
          targetMouse.current.set(e.uv.x, e.uv.y);
        }
      }}
    >
      <planeGeometry args={[10, 1.2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0.0 },
          uHover: { value: 0.0 },
        }}
        transparent={true}
      />
    </mesh>
  );
}