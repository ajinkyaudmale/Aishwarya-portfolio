"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;
const CONNECTION_DISTANCE = 1.8;

function Particles({ opacity = 1 }: { opacity?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    const points = pointsRef.current;
    const lines = linesRef.current;
    if (!points || !lines) return;

    const posArray = points.geometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      if (Math.abs(posArray[i3]) > 6) velocities[i3] *= -1;
      if (Math.abs(posArray[i3 + 1]) > 4) velocities[i3 + 1] *= -1;
      if (Math.abs(posArray[i3 + 2]) > 3) velocities[i3 + 2] *= -1;
    }

    points.geometry.attributes.position.needsUpdate = true;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(
            posArray[i * 3],
            posArray[i * 3 + 1],
            posArray[i * 3 + 2],
            posArray[j * 3],
            posArray[j * 3 + 1],
            posArray[j * 3 + 2]
          );
        }
      }
    }

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00f5d4"
          transparent
          opacity={0.8 * opacity}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#9b5de5"
          transparent
          opacity={0.15 * opacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

interface ParticleCanvasProps {
  opacity?: number;
}

export default function ParticleCanvas({ opacity = 1 }: ParticleCanvasProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles opacity={opacity} />
      </Canvas>
    </div>
  );
}
