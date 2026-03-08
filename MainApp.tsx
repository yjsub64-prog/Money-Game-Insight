import React, { useState } from 'react';
// GitHub 구조에 맞게 경로 수정 (중복 제거)
import { generateScript } from './services/geminiService';
import { generateImage } from './services/imageService';
import { generateVideo } from './services/falService';

export function MainApp() {
  const [topic, setTopic] = useState('');
  const [manualScript, setManualScript] = useState('');
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [status, setStatus] = useState('준비 완료');
  const [loading, setLoading] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    const inputContent = mode === 'auto' ? topic : manualScript;
    if (!inputContent) return alert("주제나 대본을 입력해 주세요!");

    setLoading(true);
    setResultVideo(null);
    
    try {
      let finalScript = inputContent;

      // 1단계: 대본 생성
      if (mode === 'auto') {
        setStatus("🤖 돈닉이 대본을 작성하고 있습니다...");
        finalScript = await generateScript(topic); // 결과 대본 저장
      }

      // 2단계: 이미지 생성
      setStatus("🎨 캐릭터 이미지를 생성 중입니다...");
      const imageUrl = await generateImage(finalScript);

      // 3단계: 영상 제작 (falService 호출)
      setStatus("🎬 영상으로 변환 중입니다 (약 30초 소요)...");
      const videoUrl = await generateVideo(imageUrl); 
      
      if (!videoUrl) throw new Error("영상 URL을 받아오지 못했습니다.");

      setResultVideo(videoUrl);
      setStatus("🎉 영상 제작이 완료되었습니다!");
    } catch (error: any) {
      console.error("제작 실패:", error);
      setStatus(`❌ 에러 발생: ${error.message || "다시 시도해 주세요."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-4 text-center">💰 돈닉의 AI 경제 연구소</h1>
        
        <div className="flex mb-6 bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button onClick={() => setMode('auto')} className={`flex-1 p-2 rounded-md font-bold transition ${mode === 'auto' ? 'bg-blue-600' : 'text-slate-500'}`}>🤖 자동 대본</button>
          <button onClick={() => setMode('manual')} className={`flex-1 p-2 rounded-md font-bold transition ${mode === 'manual' ? 'bg-blue-600' : 'text-slate-500'}`}>📝 수동 대본</button>
        </div>

        {mode === 'auto' ? (
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="주제를 입력하세요" className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4 focus:ring-2 focus:ring-blue-500 outline-none" />
        ) : (
          <textarea rows={5} value={manualScript} onChange={(e) => setManualScript(e.target.value)} placeholder="대본을 입력하세요" className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4 focus:ring-2 focus:ring-blue-500 outline-none" />
        )}
        
        <button onClick={handleGenerate} disabled={loading} className={`w-full p-4 rounded font-bold text-lg ${loading ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'}`}>
          {loading ? '열심히 제작 중...' : '돈닉 영상 만들기'}
        </button>

        <div className="mt-6 p-4 bg-slate-900 rounded border border-slate-700 text-center">
          <p className="text-blue-400 font-mono">{status}</p>
        </div>

        {resultVideo && (
          <div className="mt-8 border-t border-slate-700 pt-6">
            <h2 className="text-xl font-bold mb-4 text-green-400 text-center">완성된 결과물</h2>
            <div className="bg-black aspect-video rounded-lg overflow-hidden border-2 border-green-500">
              <video src={resultVideo} controls autoPlay className="w-full h-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainApp;


