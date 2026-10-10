export type Point3 = readonly [number, number, number];

// Precompute the knot; animation only rotates and projects these fixed points.
export function createAgentKnot(lanes = 15, segments = 112): Point3[][] {
  return Array.from({ length: lanes }, (_, lane) => {
    const u = (lane / lanes) * Math.PI * 2;
    return Array.from({ length: segments + 1 }, (_, segment): Point3 => {
      const t = (segment / segments) * Math.PI * 2;
      const radius = 2 + 0.55 * Math.cos(3 * t);
      return [
        (radius + 0.18 * Math.cos(u)) * Math.cos(2 * t),
        (radius + 0.18 * Math.cos(u)) * Math.sin(2 * t),
        0.75 * Math.sin(3 * t) + 0.18 * Math.sin(u),
      ];
    });
  });
}

export function projectAgentPoint(
  point: Point3,
  pitch: number,
  yaw: number,
): Point3 {
  const [x, y, z] = point;
  const ry = y * Math.cos(pitch) - z * Math.sin(pitch);
  const rz = y * Math.sin(pitch) + z * Math.cos(pitch);
  const finalX = x * Math.cos(yaw) + rz * Math.sin(yaw);
  const finalZ = -x * Math.sin(yaw) + rz * Math.cos(yaw);
  const perspective = 7.4 / (7.4 - finalZ);
  return [finalX * perspective, ry * perspective, finalZ];
}

export function agentFallbackPaths() {
  return createAgentKnot().map((line) =>
    line
      .map((point, index) => {
        const [x, y] = projectAgentPoint(point, 0.65, 0.35);
        return `${index ? "L" : "M"}${(350 + x * 97).toFixed(2)},${(350 + y * 97).toFixed(2)}`;
      })
      .join(" "),
  );
}
