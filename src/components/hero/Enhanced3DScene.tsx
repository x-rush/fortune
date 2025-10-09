import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface Enhanced3DSceneProps {
  mousePosition: { x: number; y: number };
}

const ParticleField = ({ mousePosition }: Enhanced3DSceneProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const [particleCount] = useState(2000);

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // 创建球形分布
      const radius = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // 渐变颜色
      colors[i3] = 0.2 + Math.random() * 0.8;     // R
      colors[i3 + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i3 + 2] = 1.0;                       // B

      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    return { positions, colors, sizes };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.1;
      pointsRef.current.rotation.y += delta * 0.05;

      // 鼠标交互
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;

      pointsRef.current.rotation.x += mouseY * 0.01;
      pointsRef.current.rotation.y += mouseX * 0.01;
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
          count={particleCount}
          itemSize={1}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const GeometricShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 中心发光球体 */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00bfff"
          emissive="#00bfff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* 环绕的几何体 */}
      {[
        { position: [3, 0, 0] as [number, number, number], color: '#ff6b6b' },
        { position: [-3, 0, 0] as [number, number, number], color: '#4ecdc4' },
        { position: [0, 3, 0] as [number, number, number], color: '#45b7d1' },
        { position: [0, -3, 0] as [number, number, number], color: '#f9ca24' },
        { position: [0, 0, 3] as [number, number, number], color: '#6c5ce7' },
        { position: [0, 0, -3] as [number, number, number], color: '#a29bfe' },
      ].map((shape, index) => (
        <Sphere key={index} args={[0.5, 16, 16]} position={shape.position}>
          <meshStandardMaterial
            color={shape.color}
            emissive={shape.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
};

const ConnectionLines = ({ mousePosition }: Enhanced3DSceneProps) => {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.1;
    }
  });

  const lines = useMemo(() => {
    const lineCount = 50;
    const linesData = [];

    for (let i = 0; i < lineCount; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      linesData.push({ start, end });
    }

    return linesData;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((line, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              args={[new Float32Array([
                line.start.x, line.start.y, line.start.z,
                line.end.x, line.end.y, line.end.z
              ]), 3]}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00bfff"
            transparent
            opacity={0.3}
          />
        </line>
      ))}
    </group>
  );
};

const Enhanced3DScene: React.FC<Enhanced3DSceneProps> = ({ mousePosition }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <ParticleField mousePosition={mousePosition} />
        <GeometricShapes />
        <ConnectionLines mousePosition={mousePosition} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Enhanced3DScene;