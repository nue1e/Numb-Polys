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
    // 1. GENTLE DRIFT (Slow, continuous motion)
    vec2 panningUv = vUv + vec2(uTime * 0.005, uTime * 0.003);
    vec2 finalUv = fract(panningUv);

    vec4 texColor = texture2D(uTexture, finalUv);

    // 2. RADIAL COVER & VERTICAL SHADOW FALLOFF
    // Normalized screen coordinates (-0.5 to 0.5)
    vec2 screenUv = (vUv / uScale) - vec2(0.5);
    
    // Radial mask: Keeps the center faintly visible while drowning edges
    float centerDist = length(screenUv);
    float radialCover = smoothstep(0.85, 0.1, centerDist);

    // Vertical gradient: Casts shadows from the bottom up
    float verticalFade = smoothstep(0.5, -0.5, screenUv.y);

    // Combined mask
    float visibilityMask = radialCover * (0.3 + 0.7 * verticalFade);

    // 3. MOUSE REVEAL (Interactive Ambient Glow)
    vec2 planeMouseUv = vec2(0.5 + (uMouse.x * 0.25), 0.5 + (uMouse.y * 0.25));
    vec2 trueMouse = planeMouseUv * uScale;
    float mouseDist = distance(vUv, trueMouse);
    // Expand the glow radius slightly and make it smoother
    float ambientMouseGlow = smoothstep(1.8, 0.0, mouseDist) * 0.12;

    // 4. PREMIUM ARC SHADOW TINT
    // Base Shadow: Deep Obsidian / Very dark indigo instead of pure black
    vec3 baseShadow = vec3(0.04, 0.04, 0.06); 
    
    // Operative Tint: Subtle Cyan/Indigo mix when revealed
    // Multiplier shifts the underlying texture into the Arc color space
    vec3 operativeTint = texColor.rgb * vec3(0.4, 0.6, 0.8); 

    // Add extra glow from the mouse interaction
    float alphaBlend = clamp((visibilityMask * 0.15) + ambientMouseGlow, 0.0, 1.0);
    
    // When the mouse passes over, add a subtle Cyan highlight
    vec3 highlightGlow = vec3(0.06, 0.71, 0.83) * (ambientMouseGlow * 0.5);
    
    vec3 finalColor = mix(baseShadow, operativeTint, alphaBlend) + highlightGlow;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function GridBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const texture = useTexture('./assets/grid.webp') as THREE.Texture;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

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
      currentMouse.current.lerp(targetMouse.current, 0.03); // Slightly smoother mouse follow

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