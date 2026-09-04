import * as THREE from "three";

/**
 * Procedural open-grain wood map. Drawn once as a light greyscale grain so the
 * material's `color` can tint it to any of the seven stains — switching
 * finish is then just a colour lerp, no texture rebuild.
 */
let cached: THREE.CanvasTexture | null = null;

export function woodGrainTexture(): THREE.CanvasTexture {
  if (cached) return cached;
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d")!;

  g.fillStyle = "#e9e2d8";
  g.fillRect(0, 0, size, size);

  // Long grain lines with gentle waviness and a few knots' worth of drift.
  const col = 6;
  for (let x = 0; x < size; x += col) {
    const drift = Math.sin(x * 0.003) * 10 + Math.sin(x * 0.011) * 3;
    for (let y = 0; y < size; y += 1) {
      const yy = y + drift;
      const n =
        Math.sin(yy * 0.26 + Math.sin(yy * 0.017) * 2.4) * 0.55 +
        Math.sin(yy * 0.83 + x * 0.002) * 0.25 +
        (Math.random() - 0.5) * 0.25;
      if (n > 0.2) {
        g.fillStyle = `rgba(70, 45, 25, ${Math.min(0.3, (n - 0.2) * 0.5)})`;
        g.fillRect(x, y, col, 1);
      } else if (n < -0.55) {
        g.fillStyle = `rgba(255, 250, 240, ${Math.min(0.22, (-n - 0.55) * 0.6)})`;
        g.fillRect(x, y, col, 1);
      }
    }
  }

  // Fine pores
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    g.fillStyle = `rgba(60, 40, 20, ${0.05 + Math.random() * 0.08})`;
    g.fillRect(x, y, 1 + Math.random() * 2, 0.6);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  cached = tex;
  return tex;
}

/** Stain colours tuned so the grain map still reads through them. */
export const STAIN: Record<string, string> = {
  Oak: "#d9b98a",
  Teak: "#b07a44",
  Walnut: "#6d4529",
  Forest: "#546347",
  Fire: "#a8452f",
  Ocean: "#35657f",
  Charcoal: "#3a3634",
};
