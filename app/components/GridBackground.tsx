'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uScale;
  
  void main() {
    vUv = uv * uScale; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uScale;
  varying vec2 vUv;

  void main() {
    // 1. GENTLE DRIFT
    // CRITICAL FIX: Pass the panning UV directly. WebGL's native RepeatWrapping 
    // handles the infinite loop without the math spikes caused by fract().
    vec2 panningUv = vUv + vec2(uTime * 0.003, uTime * 0.0015);

    vec4 texColor = texture2D(uTexture, panningUv);

    // 2. RADIAL COVER & VERTICAL SHADOW FALLOFF
    vec2 screenUv = (vUv / uScale) - vec2(0.5);
    
    float centerDist = length(screenUv);
    float radialCover = smoothstep(0.85, 0.1, centerDist);

    float verticalFade = smoothstep(0.5, -0.5, screenUv.y);
    float visibilityMask = radialCover * (0.3 + 0.7 * verticalFade);

    // 3. MOUSE REVEAL
    vec2 planeMouseUv = vec2(0.5 + (uMouse.x * 0.25), 0.5 + (uMouse.y * 0.25));
    vec2 trueMouse = planeMouseUv * uScale;
    float mouseDist = distance(vUv, trueMouse);
    float ambientMouseGlow = smoothstep(1.8, 0.0, mouseDist) * 0.12;

    // 4. PREMIUM SHADOW TINT
    vec3 baseShadow = vec3(0.04, 0.04, 0.06); 
    vec3 operativeTint = texColor.rgb * vec3(0.4, 0.6, 0.8); 

    float alphaBlend = clamp((visibilityMask * 0.15) + ambientMouseGlow, 0.0, 1.0);
    vec3 highlightGlow = vec3(0.06, 0.71, 0.83) * (ambientMouseGlow * 0.5);
    
    vec3 finalColor = mix(baseShadow, operativeTint, alphaBlend) + highlightGlow;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function GridBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const texture = useTexture('./assets/grid.webp') as THREE.Texture;
  
  // Let Three.js handle the looping natively. No manual filtering overrides needed.
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const targetMouse = useRef(new THREE.Vector2(999.0, 999.0));
  const currentMouse = useRef(new THREE.Vector2(999.0, 999.0));

  const scale = useMemo(() => {
    const zoomLevel = 1.2;
    return new THREE.Vector2(
      (viewport.width / viewport.height) * zoomLevel,
      1.0 * zoomLevel
    );
  }, [viewport.width, viewport.height]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      targetMouse.current.set(state.pointer.x, state.pointer.y);
      currentMouse.current.lerp(targetMouse.current, 0.03);
      materialRef.current.uniforms.uMouse.value = currentMouse.current;
    }
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0.0 },
          uMouse: { value: new THREE.Vector2(999.0, 999.0) },
          uScale: { value: scale },
        }}
        depthWrite={false}
      />
    </mesh>
  );
}