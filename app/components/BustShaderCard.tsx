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

  // Pseudo-random noise generator for digital artifacts
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    
    // 1. DATA CORRUPTION (Blocky Digital Tearing)
    // Slice the image into 15 horizontal bands
    float band = floor(uv.y * 15.0); 
    
    // Randomize which bands tear based on rapid time intervals
    float tearForce = random(vec2(band, floor(uTime * 12.0)));
    
    // Only tear if the random value is very high (creates intermittent glitching)
    float tearOffset = step(0.85, tearForce) * 0.05 * uHoverState;
    
    // Alternate tear direction left/right based on the band
    uv.x += (mod(band, 2.0) == 0.0 ? tearOffset : -tearOffset);

    // 2. CHROMATIC ABERRATION (Tactical RGB Split)
    // Decouple the color channels violently when hovered
    float splitAmount = 0.02 * uHoverState + (tearOffset * 0.5);
    
    float r = texture2D(uTexture, uv + vec2(splitAmount, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(splitAmount, 0.0)).b;
    float a = texture2D(uTexture, uv).a;
    
    // 3. CRT SCANLINE OVERLAY
    // High-frequency sine wave to simulate monitor raster lines
    float scanlines = sin(uv.y * 350.0) * 0.03;
    
    // 4. NEON PHOSPHOR TINT
    // Shift the asset into a subtle terminal-green hue when hovered
    vec3 baseColor = vec3(r, g, b);
    vec3 terminalGlow = mix(baseColor, baseColor * vec3(0.5, 1.3, 0.5), uHoverState * 0.4);
    
    gl_FragColor = vec4(terminalGlow - scanlines, a);
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
        0.15 // Slightly faster lerp for snappier digital response
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[2.5, 2.5, 32, 32]} />
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