"use client";

import { useEffect, useRef } from "react";
import { createAgentKnot } from "@/lib/agent-geometry";
import { useHomeMotion } from "./home-motion";
import styles from "./home.module.css";

const knot = createAgentKnot();
export function AgentSculpture({ fallback }: { fallback: React.ReactNode }) {
  const { paused, reduced, toggle } = useHomeMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0.35);

  useEffect(() => {
    const scene = sceneRef.current,
      canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!scene || !canvas || !context) return;
    let frame = 0,
      previousTime = 0,
      inView = false;
    let size = { width: 0, height: 0 },
      pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const draw = () => {
      const { width, height } = size;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      if (
        canvas.width !== Math.round(width * ratio) ||
        canvas.height !== Math.round(height * ratio)
      ) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const yaw = phaseRef.current + eased.x * 0.3,
        pitch = 0.65 + eased.y * 0.22;
      const sp = Math.sin(pitch),
        cp = Math.cos(pitch),
        sy = Math.sin(yaw),
        cy = Math.cos(yaw);
      const scale = width * 0.139;
      context.lineWidth = 0.72;
      context.strokeStyle = "rgba(16,25,29,0.55)";
      for (const line of knot) {
        context.beginPath();
        line.forEach(([x, y, z], index) => {
          const ry = y * cp - z * sp,
            rz = y * sp + z * cp;
          const finalX = x * cy + rz * sy,
            finalZ = -x * sy + rz * cy;
          const perspective = 7.4 / (7.4 - finalZ);
          const px = width * 0.5 + finalX * scale * perspective,
            py = height * 0.49 + ry * scale * perspective;
          if (index) context.lineTo(px, py);
          else context.moveTo(px, py);
        });
        context.stroke();
      }
      scene.dataset.ready = "true";
    };
    const tick = (time: number) => {
      frame = 0;
      if (paused || !inView || document.hidden) return;
      const elapsed = time - previousTime;
      // Cap painting at 30fps and keep transient coordinates outside React state.
      if (elapsed >= 1000 / 30) {
        phaseRef.current += Math.min(elapsed, 50) * 0.00012;
        previousTime = time;
        eased.x += (pointer.x - eased.x) * 0.1;
        eased.y += (pointer.y - eased.y) * 0.1;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = performance.now();
      if (!paused && inView && !document.hidden)
        frame = requestAnimationFrame(tick);
      else draw();
    };
    const resize = new ResizeObserver(([entry]) => {
      size = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      };
      draw();
    });
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const move = (event: PointerEvent) => {
      if (paused || event.pointerType === "touch") return;
      const rect = scene.getBoundingClientRect();
      pointer = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      };
    };
    const leave = () => {
      pointer = { x: 0, y: 0 };
    };
    resize.observe(scene);
    visibility.observe(scene);
    scene.addEventListener("pointermove", move);
    scene.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      delete scene.dataset.ready;
    };
  }, [paused]);

  return (
    <div className={styles.sculpture}>
      <div className={styles.poster} ref={sceneRef} aria-hidden="true">
        <div className={styles.fallback}>{fallback}</div>
        <canvas className={styles.canvas} ref={canvasRef} />
      </div>
      <button
        type="button"
        className={styles.motionToggle}
        onClick={toggle}
        disabled={reduced}
        aria-pressed={!paused}
        aria-label="开关页面动效"
      >
        {reduced ? "静态模式" : paused ? "开启动效" : "暂停动效"}
      </button>
    </div>
  );
}
