"use client";

import dynamic from "next/dynamic";

// Beams는 Three.js Canvas라 SSR 비활성 + 클라이언트 전용 로드
const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });

// 친근 라이트 배경 위 은은한 퍼플 빛줄기 — 하단으로 페이드 마스크
export function HeroBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
      <Beams
        beamWidth={2.4}
        beamHeight={20}
        beamNumber={14}
        lightColor="#8b5cf6"
        speed={1.4}
        noiseIntensity={1.3}
        scale={0.2}
        rotation={28}
      />
    </div>
  );
}
