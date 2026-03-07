import React, { useState, useRef } from 'react';
// 필요한 부품들을 services 폴더에서 가져옵니다.
import { generateScript } from './services/geminiService';
import { generateImage } from './services/imageService';

// 1. 기본 설정 (돈닉 모드 포함)
export const CONFIG = {
  DEFAULT_IMAGE_MODEL: "gemini-2.5-flash-image",
  STORAGE_KEYS: {
    GEMINI_API_KEY: 'tubegen_gemini_key',
  }
};

// 2. 메인 화면 구성 (MainApp)
export function MainApp() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  // 영상 생성 시작 버튼을 눌렀을 때 실행되는 함수
  const handleGenerate = async () => {
    setLoading(true);
    try {
      // 여기서 돈닉 이미지를 참조하여 대본과 이미지를 만듭니다.
      console.log("돈닉 경제 영상 제작 시작!");
      await generateScript(topic);
    } catch (error) {
      console.error("오류 발생:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">💰 돈닉의 AI 경제 연구소</h1>
      <p className="mb-6">주제를 입력하면 돈닉이 주인공인 영상을 만듭니다.</p>
      
      <input 
        type="text" 
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="예: 5060 세대의 은퇴 준비"
        className="w-full p-4 rounded bg-slate-800 border border-slate-700 mb-4"
      />
      
      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded font-bold"
      >
        {loading ? '영상 제작 중...' : '돈닉 영상 만들기'}
      </button>
    </div>
  );
}

// 3. 문패 달기 (이게 있어야 index.tsx에서 불러올 수 있습니다)
export default MainApp;
