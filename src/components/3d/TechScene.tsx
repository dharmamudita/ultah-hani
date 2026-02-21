"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Stars, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ========== BIRTHDAY GRID FLOOR ========== */
function BirthdayGrid() {
    const ref = useRef<THREE.Mesh>(null!);
    const matRef = useRef<THREE.ShaderMaterial>(null!);

    const shader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color("#ec4899") },
            uColor2: { value: new THREE.Color("#f9a8d4") },
        },
        vertexShader: `
            varying vec2 vUv;
            varying float vElevation;
            uniform float uTime;
            void main() {
                vUv = uv;
                vec3 pos = position;
                float wave1 = sin(pos.x * 0.4 + uTime * 0.6) * 0.35;
                float wave2 = sin(pos.y * 0.3 + uTime * 0.4) * 0.25;
                float wave3 = cos(pos.x * 0.2 + pos.y * 0.2 + uTime * 0.3) * 0.15;
                pos.z += wave1 + wave2 + wave3;
                vElevation = wave1 + wave2;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            varying float vElevation;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            void main() {
                float gridX = step(0.97, fract(vUv.x * 25.0));
                float gridY = step(0.97, fract(vUv.y * 25.0));
                float dots = 1.0 - step(0.15, length(fract(vUv * 25.0) - 0.5));
                float grid = max(max(gridX, gridY), dots * 0.3);
                vec3 color = mix(uColor1, uColor2, vUv.y + vElevation * 0.5);
                float fadeX = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
                float fadeY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
                float alpha = grid * fadeX * fadeY * 0.35;
                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true,
    }), []);

    useFrame((state) => {
        if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        if (ref.current) ref.current.position.z = (state.clock.elapsedTime * 0.2) % 2;
    });

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
            <planeGeometry args={[100, 100, 80, 80]} />
            <shaderMaterial ref={matRef} {...shader} side={THREE.DoubleSide} />
        </mesh>
    );
}

/* ========== BIRTHDAY CAKE (stacked cylinders) ========== */
function BirthdayCake() {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.15;
            group.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group ref={group} position={[0, -1.5, -3]}>
                {/* Bottom tier */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.2, 1.3, 0.6, 32]} />
                    <meshPhongMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} shininess={80} />
                </mesh>
                {/* Middle tier */}
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.9, 1.0, 0.5, 32]} />
                    <meshPhongMaterial color="#f9a8d4" emissive="#f472b6" emissiveIntensity={0.5} shininess={80} />
                </mesh>
                {/* Top tier */}
                <mesh position={[0, 0.9, 0]}>
                    <cylinderGeometry args={[0.6, 0.7, 0.4, 32]} />
                    <meshPhongMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.6} shininess={100} />
                </mesh>
                {/* Candles */}
                {[-0.3, 0, 0.3].map((x, i) => (
                    <group key={i} position={[x, 1.25, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                            <meshPhongMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.5} />
                        </mesh>
                        {/* Flame */}
                        <mesh position={[0, 0.2, 0]}>
                            <sphereGeometry args={[0.06, 8, 8]} />
                            <meshPhongMaterial color="#fbbf24" emissive="#f97316" emissiveIntensity={3} transparent opacity={0.95} />
                        </mesh>
                    </group>
                ))}
            </group>
        </Float>
    );
}

/* ========== BALLOONS ========== */
function Balloon({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
    const mesh = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.elapsedTime + delay;
            mesh.current.position.y = position[1] + Math.sin(t * 0.7) * 0.4;
            mesh.current.rotation.z = Math.sin(t * 0.5) * 0.1;
        }
    });

    return (
        <group ref={mesh} position={position}>
            {/* Balloon body */}
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                <Sphere args={[0.45, 16, 16]} position={[0, 0, 0]}>
                    <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.9} shininess={120} />
                </Sphere>
                {/* Balloon knot */}
                <mesh position={[0, -0.5, 0]}>
                    <coneGeometry args={[0.06, 0.12, 8]} />
                    <meshPhongMaterial color={color} transparent opacity={0.9} />
                </mesh>
            </Float>
            {/* String */}
            <mesh position={[0, -1.2, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 1.3, 4]} />
                <meshPhongMaterial color="#f9a8d4" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

/* ========== GIFT BOX ========== */
function GiftBox({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.elapsedTime + delay;
            mesh.current.rotation.y = t * 0.3;
            mesh.current.rotation.x = Math.sin(t * 0.5) * 0.1;
            mesh.current.position.y = position[1] + Math.sin(t * 0.6) * 0.25;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
            <group>
                <mesh ref={mesh} position={position}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.95} shininess={80} />
                </mesh>
                {/* Ribbon horizontal */}
                <mesh position={[position[0], position[1], position[2]]}>
                    <boxGeometry args={[0.52, 0.08, 0.52]} />
                    <meshPhongMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} transparent opacity={0.95} />
                </mesh>
                {/* Ribbon vertical */}
                <mesh position={[position[0], position[1], position[2]]}>
                    <boxGeometry args={[0.08, 0.52, 0.52]} />
                    <meshPhongMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} transparent opacity={0.95} />
                </mesh>
            </group>
        </Float>
    );
}

/* ========== FLOATING STAR ========== */
function FloatingStar({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.elapsedTime + delay;
            mesh.current.rotation.y = t * 0.8;
            mesh.current.rotation.z = t * 0.4;
            mesh.current.position.y = position[1] + Math.sin(t) * 0.3;
        }
    });

    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={1}>
            <mesh ref={mesh} position={position}>
                <octahedronGeometry args={[0.15, 0]} />
                <meshPhongMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} transparent opacity={0.95} />
            </mesh>
        </Float>
    );
}

/* ========== CENTER LOVE SPHERE ========== */
function LoveSphere() {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.08;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
            <Sphere ref={ref} args={[1.2, 64, 64]} position={[0, 1, -3]}>
                <MeshDistortMaterial color="#f472b6" distort={0.35} speed={2.5} roughness={0.15} metalness={0.85} transparent opacity={0.35} />
            </Sphere>
        </Float>
    );
}

/* ========== CAMERA ========== */
function CameraAnimation() {
    const { camera } = useThree();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        camera.position.x = Math.sin(t * 0.04) * 0.8;
        camera.position.y = 1.5 + Math.sin(t * 0.06) * 0.3;
        camera.lookAt(0, 0, -3);
    });
    return null;
}

/* ========== MAIN SCENE ========== */
export default function TechScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-white to-pink-50">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={70} />
                <CameraAnimation />
                <fog attach="fog" args={["#fdf2f8", 8, 25]} />

                {/* Warm birthday lighting */}
                <ambientLight intensity={1.2} color="#fff5f7" />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={15} color="#ec4899" />
                <spotLight position={[-10, 5, 5]} angle={0.3} penumbra={1} intensity={10} color="#fbbf24" />
                <pointLight position={[0, 8, -5]} intensity={8} color="#f472b6" />
                <pointLight position={[0, -2, -3]} intensity={6} color="#ec4899" />
                <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />

                {/* Scene objects */}
                <BirthdayGrid />
                <BirthdayCake />
                <LoveSphere />

                {/* Balloons */}
                <Balloon position={[-3, 2, -5]} color="#ec4899" delay={0} />
                <Balloon position={[3.5, 2.5, -6]} color="#fbbf24" delay={1} />
                <Balloon position={[-2, 3, -4]} color="#a855f7" delay={2} />
                <Balloon position={[2, 1.5, -7]} color="#f472b6" delay={3} />
                <Balloon position={[-4, 1, -8]} color="#f59e0b" delay={4} />

                {/* Gift boxes */}
                <GiftBox position={[-2.5, -2, -4]} color="#ec4899" delay={0} />
                <GiftBox position={[2.8, -1.5, -5]} color="#a855f7" delay={2} />
                <GiftBox position={[0.5, -2.5, -6]} color="#f472b6" delay={4} />

                {/* Stars */}
                <FloatingStar position={[-1.5, 3, -3]} delay={0} />
                <FloatingStar position={[1.8, 2.5, -4]} delay={1} />
                <FloatingStar position={[-0.5, 4, -5]} delay={2} />
                <FloatingStar position={[3, 3.5, -6]} delay={3} />
                <FloatingStar position={[-3, 2.8, -7]} delay={4} />
                <FloatingStar position={[0, 3.8, -2]} delay={5} />

                {/* Background sparkles */}
                <Stars radius={80} depth={60} count={2000} factor={3} saturation={1} fade speed={0.8} />
            </Canvas>
        </div>
    );
}
