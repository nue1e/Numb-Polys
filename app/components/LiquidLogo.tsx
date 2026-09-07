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

  // Pseudo-random noise for glitch artifacts
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    
    // 1. LOCALIZED CURSOR TRACKING
    // Calculate distance between the current pixel and the mouse coordinates
    float dist = distance(uv, uMouse);
    // Create a concentrated radius of effect that only triggers heavily on hover
    float hoverForce = smoothstep(0.4, 0.0, dist) * uHover;

    // 2. HORIZONTAL DATA TEARING
    // Slice the logo into digital bands
    float band = floor(uv.y * 12.0);
    // Rapidly randomize tear activation over time
    float tearForce = random(vec2(band, floor(uTime * 15.0)));
    // Only tear if the random value hits a high threshold, scaled by cursor proximity
    float tearOffset = step(0.85, tearForce) * 0.04 * hoverForce;
    
    // Shift UVs left or right based on the band to create the jagged split
    uv.x += (mod(band, 2.0) == 0.0 ? tearOffset : -tearOffset);

    // 3. CHROMATIC ABERRATION (RGB SPLIT)
    // Decouple the red and blue channels heavily around the cursor
    float splitAmount = 0.015 * hoverForce + (tearOffset * 0.5);
    
    vec4 texR = texture2D(uTexture, uv + vec2(splitAmount, 0.0));
    vec4 texG = texture2D(uTexture, uv);
    vec4 texB = texture2D(uTexture, uv - vec2(splitAmount, 0.0));
    
    // Maintain the original alpha channel so the background stays transparent
    float alpha = texG.a;
    vec3 baseColor = vec3(texR.r, texG.g, texB.b);

    // 4. CRT SCANLINES & PHOSPHOR GLOW
    // Subtle horizontal raster lines mapped across the logo
    float scanlines = sin(uv.y * 400.0) * 0.03;
    // Shift the color matrix toward terminal green where the cursor interacts
    vec3 terminalGlow = mix(baseColor, baseColor * vec3(0.5, 1.5, 0.5), hoverForce * 0.6);
    
    gl_FragColor = vec4(terminalGlow - scanlines, alpha);
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
      
      // Increased lerp speed (0.05 -> 0.15) for a snappier digital activation
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hovered ? 1.0 : 0.0,
        0.15
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