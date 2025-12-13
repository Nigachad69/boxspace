
"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';

const CargoBox: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const groupRef = useRef<THREE.Group | null>(null);

    const isMouseDownRef = useRef(false);
    const previousMousePositionRef = useRef({ x: 0 });
    const rotationVelocityRef = useRef({ y: 0.005 });

    const isInView = useInView(mountRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.set(6, 5, 6);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;
        currentMount.appendChild(renderer.domElement);
        
        const group = new THREE.Group();
        groupRef.current = group;
        scene.add(group);

        const material = new THREE.MeshStandardMaterial({
            color: 0x9c785c,
            roughness: 0.8,
            metalness: 0.1,
        });

        const boxBodyGeometry = new THREE.BoxGeometry(2.8, 2.8, 2.8);
        const boxBody = new THREE.Mesh(boxBodyGeometry, material);
        boxBody.position.y = -0.5;
        group.add(boxBody);
        
        const lidGeometry = new THREE.BoxGeometry(3, 1, 3);
        const lid = new THREE.Mesh(lidGeometry, material);
        lid.position.y = 1.4;
        group.add(lid);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        const onMouseDown = (event: MouseEvent) => {
            isMouseDownRef.current = true;
            previousMousePositionRef.current = {
                x: event.clientX,
            };
        };

        const onMouseUp = () => {
            isMouseDownRef.current = false;
        };

        const onMouseMove = (event: MouseEvent) => {
            if (!isMouseDownRef.current || !groupRef.current) return;

            const deltaX = event.clientX - previousMousePositionRef.current.x;
            rotationVelocityRef.current.y = deltaX * 0.0005; // Adjust multiplier for sensitivity
            groupRef.current.rotation.y += deltaX * 0.01;
            
            previousMousePositionRef.current = {
                x: event.clientX,
            };
        };

        currentMount.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            if (!groupRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
            requestAnimationFrame(animate);

            if (!isMouseDownRef.current) {
                // Apply damping to slow down rotation
                rotationVelocityRef.current.y *= 0.95;
                if (Math.abs(rotationVelocityRef.current.y) < 0.0001) {
                    // Re-apply slow auto-rotation when not interacting
                    if(Math.abs(rotationVelocityRef.current.y) < 0.005) {
                        rotationVelocityRef.current.y += 0.0001 * Math.sign(0.005 - rotationVelocityRef.current.y);
                    }
                }
            }

            groupRef.current.rotation.y += rotationVelocityRef.current.y;
            
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };
        animate();

        const handleResize = () => {
            if (currentMount && rendererRef.current && cameraRef.current) {
                const width = currentMount.clientWidth;
                const height = currentMount.clientHeight;
                rendererRef.current.setSize(width, height);
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mouseup', onMouseUp);
            currentMount.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            if (rendererRef.current && currentMount) {
                currentMount.removeChild(rendererRef.current.domElement);
            }
            rendererRef.current?.dispose();
        };

    }, [isInView]);

    return (
        <motion.div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
        />
    );
};

export default CargoBox;
