import React, { useState, useRef, useEffect } from 'react';
import { CONFIG, PRICING, formatKRW } from './config';
import { generateAudioForScene } from './services/geminiService';
import { generateImage } from './services/imageService';
import { generateVideo } from './services/falService';

// 핵심: runAudio 함수가 Gemini TTS를 사용하도록 통합됨
const App: React.FC = () => {
  // ... (중략: 기존 UI 로직 유지) ...

  const runAudio = async () => {
    for (let i = 0; i < initialAssets.length; i++) {
      if (isAbortedRef.current) break;
      setProgressMessage(`씬 ${i + 1} Gemini 음성 생성 중...`);
      try {
        const audioData = await generateAudioForScene(assetsRef.current[i].narration);
        if (audioData && !isAbortedRef.current) {
          updateAssetAt(i, { audioData, status: 'completed' });
          addCost('tts', 0, assetsRef.current[i].narration.length);
        }
      } catch (e: any) {
        console.error(`실패:`, e.message);
        updateAssetAt(i, { status: 'error' });
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  // 캐릭터 참조 이미지가 있으면 까마귀(Kkaak) 프롬프트를 덮어쓰는 로직 포함
  // ... (생략된 UI 코드) ...
  return (
    <div>TubeGen Studio - Donnic Mode Active</div>
  );
};

export default App;
