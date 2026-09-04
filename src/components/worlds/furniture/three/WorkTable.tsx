"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { STAIN, woodGrainTexture } from "./wood";

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Table proportions (scene units). Loosely the Loop work table: a rounded
// monocoque top over two drawers, on four tapered, slightly splayed legs.
const TOP = { w: 3.3, h: 0.36, d: 1.45, r: 0.17 };
const LEG = { rTop: 0.055, rBot: 0.035, len: 1.55 };

export default function WorkTable({
  finish,
  onReady,
}: {
  finish: string;
  onReady?: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const top = useRef<THREE.Group>(null);
  const legs = useRef<(THREE.Mesh | null)[]>([]);
  const drawers = useRef<(THREE.Group | null)[]>([]);
  const readyFired = useRef(false);

  const grain = useMemo(() => {
    const t = woodGrainTexture().clone();
    t.repeat.set(1.8, 1.1);
    t.needsUpdate = true;
    return t;
  }, []);
  const wood = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      map: grain,
      color: new THREE.Color(STAIN[finish] ?? STAIN.Walnut),
      roughness: 0.58,
      metalness: 0.02,
      clearcoat: 0.25,
      clearcoatRoughness: 0.5,
      sheen: 0.15,
    });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grain]);
  const legWood = useMemo(() => {
    const m = wood.clone();
    m.map = woodGrainTexture().clone();
    m.map.rotation = Math.PI / 2;
    m.map.repeat.set(0.35, 2.2);
    m.map.needsUpdate = true;
    return m;
  }, [wood]);
  const target = useMemo(() => new THREE.Color(STAIN[finish] ?? STAIN.Walnut), [finish]);
  const slot = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1410", roughness: 0.7 }), []);

  useEffect(() => () => { wood.dispose(); legWood.dispose(); }, [wood, legWood]);

  const t0 = useRef<number | null>(null);

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime();
    if (t0.current === null) t0.current = t;
    const el = t - t0.current;

    // ── Stain lerp
    wood.color.lerp(target, 1 - Math.pow(0.001, dt));
    legWood.color.copy(wood.color);

    // ── Assembly: legs rise, top settles, drawers slide home
    const pTop = ease((el - 0.2) / 1.4);
    const pLeg = ease((el - 0.0) / 1.2);
    const pDrw = ease((el - 0.9) / 1.0);
    if (top.current) {
      top.current.position.y = THREE.MathUtils.lerp(2.2, 0, pTop);
      top.current.rotation.x = THREE.MathUtils.lerp(-0.35, 0, pTop);
    }
    legs.current.forEach((leg, i) => {
      if (!leg) return;
      const p = ease((el - i * 0.08) / 1.1);
      leg.scale.y = Math.max(0.001, p);
      leg.position.y = -TOP.h / 2 - (LEG.len / 2) * p;
      void pLeg;
    });

    // ── Drawers: after assembly, one slides open and closes every few seconds
    const cycle = (el - 2.6) % 7;
    drawers.current.forEach((d, i) => {
      if (!d) return;
      const start = i === 0 ? 0.4 : 3.9;
      const open = el > 2.6 ? smooth(start, start + 0.9, cycle) * (1 - smooth(start + 1.9, start + 2.8, cycle)) : 0;
      const home = THREE.MathUtils.lerp(-0.6, 0, pDrw);
      d.position.z = home + open * 0.42;
    });

    // ── Idle float + cursor parallax
    if (group.current) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      const ry = 0.42 + Math.sin(t * 0.25) * 0.12 + px * 0.28;
      const rx = -0.04 + py * -0.07;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, ry, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rx, 0.05);
      group.current.position.y = 0.1 + Math.sin(t * 0.7) * 0.05 * pTop;
    }

    if (!readyFired.current && el > 2.2) {
      readyFired.current = true;
      onReady?.();
    }
  });

  const legPos: [number, number, number][] = [
    [-TOP.w / 2 + 0.28, 0, TOP.d / 2 - 0.22],
    [TOP.w / 2 - 0.28, 0, TOP.d / 2 - 0.22],
    [-TOP.w / 2 + 0.28, 0, -TOP.d / 2 + 0.22],
    [TOP.w / 2 - 0.28, 0, -TOP.d / 2 + 0.22],
  ];

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      {/* Top monocoque */}
      <group ref={top}>
        <RoundedBox args={[TOP.w, TOP.h, TOP.d]} radius={TOP.r} smoothness={7} castShadow material={wood} />
        {/* Drawer fronts, set into the front face */}
        {[-0.83, 0.83].map((x, i) => (
          <group
            key={i}
            ref={(el) => {
              drawers.current[i] = el;
            }}
            position={[x, -0.02, 0]}
          >
            <RoundedBox args={[1.5, 0.2, TOP.d - 0.12]} radius={0.05} smoothness={5} position={[0, 0, 0.04]} material={wood} />
            {/* finger slot */}
            <mesh position={[0, 0.02, TOP.d / 2 + 0.005]} material={slot}>
              <boxGeometry args={[0.42, 0.028, 0.02]} />
            </mesh>
            {/* drawer body (visible when open) */}
            <mesh position={[0, -0.02, -0.25]} material={slot}>
              <boxGeometry args={[1.4, 0.16, TOP.d - 0.4]} />
            </mesh>
          </group>
        ))}
        {/* Stationery recess on the top surface */}
        <mesh position={[-1.05, TOP.h / 2 + 0.002, -0.35]} rotation={[-Math.PI / 2, 0, 0]} material={slot}>
          <planeGeometry args={[0.6, 0.12]} />
        </mesh>
        {/* Legs hang from the top so they assemble with it */}
        {legPos.map((p, i) => (
          <mesh
            key={i}
            ref={(el) => {
              legs.current[i] = el;
            }}
            position={[p[0], -TOP.h / 2 - LEG.len / 2, p[2]]}
            rotation={[p[2] > 0 ? 0.07 : -0.07, 0, p[0] > 0 ? -0.09 : 0.09]}
            castShadow
            material={legWood}
          >
            <cylinderGeometry args={[LEG.rTop, LEG.rBot, LEG.len, 20]} />
          </mesh>
        ))}

        {/* Annotations pinned to the geometry */}
        <Html position={[0.83, 0.25, TOP.d / 2 + 0.05]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <div className="anno anno-r">
            <span className="anno-dot" />
            <span className="anno-label">Soft-close drawers</span>
          </div>
        </Html>
        <Html position={[-1.3, TOP.h / 2 + 0.05, -0.3]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <div className="anno anno-l">
            <span className="anno-label">Open-grain matte polish</span>
            <span className="anno-dot" />
          </div>
        </Html>
        <Html position={[TOP.w / 2 - 0.2, -1.1, TOP.d / 2 - 0.2]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <div className="anno anno-r">
            <span className="anno-dot" />
            <span className="anno-label">Solid ash, hand-turned</span>
          </div>
        </Html>
      </group>
    </group>
  );
}
