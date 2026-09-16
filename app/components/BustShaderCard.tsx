'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
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
  uniform float uHoverState;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // 1. LIQUID GLASS DISTORTION (Replaces Blocky Tearing)
    // Smooth, elegant sine waves to simulate looking through frosted/liquid glass
    float waveY = sin(uv.y * 12.0 + uTime * 1.5) * 0.015 * uHoverState;
    float waveX = cos(uv.x * 12.0 + uTime * 1.5) * 0.015 * uHoverState;
    uv.x += waveY;
    uv.y += waveX;

    // 2. PREMIUM CHROMATIC ABERRATION
    // Gently decouple the color channels for a high-end lens effect
    float splitAmount = 0.01 * uHoverState;
    
    float r = texture2D(uTexture, uv + vec2(splitAmount, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(splitAmount, 0.0)).b;
    float a = texture2D(uTexture, uv).a;
    
    vec3 baseColor = vec3(r, g, b);
    
    // 3. ARC SYSTEM GLOW (Replaces Neon Green)
    // Shift the asset into a subtle Cyan/Indigo hue when hovered
    vec3 arcGlow = mix(baseColor, baseColor * vec3(0.8, 1.2, 1.8), uHoverState * 0.5);
    
    gl_FragColor = vec4(arcGlow, a);
  }
`;

export default function BustShaderCard({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hovered ? 1.0 : 0.0,
        0.04 // Slower lerp for a luxurious, fluid transition
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[2.5, 2.5, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uHoverState: { value: 0.0 },
          uTime: { value: 0.0 },
        }}
        transparent={true}
      />
    </mesh>
  );
}