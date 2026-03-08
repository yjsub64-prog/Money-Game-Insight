import React, { useState } from 'react';
// 1. 경로 수정: services/services -> services (중복 제거)
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
    // 2. 입력값 확인 로직 강화
    const targetInput = mode === 'auto' ? topic : manualScript;
    if (!targetInput) return alert("내용을 입력해 주세요!");

    setLoading(true);
    setResultVideo(null); 
    
    try {
      let finalScript = targetInput;

      // 1단계: 대본 처리
      if (mode === 'auto') {
        setStatus("1/3 돈닉이 대본을 작성 중입니다...");
        // 생성된 대본을 변수에 저장해야 다음 단계에서 쓸 수 있습니다.
        finalScript = await generateScript(topic);
      } else {
        setStatus("1/3 입력하신 수동 대본을 분석 중입니다...");
      }

      // 2단계: 돈닉 이미지 생성
      setStatus("2/3 돈닉 캐릭터 이미지를 생성 중입니다...");
      const imageUrl = await generateImage(finalScript);

      // 3단계: 영상 변환 (이미지 URL이 있다면 전달)
      setStatus("3/3 고품질 영상으로 변환 중입니다 (약 30초 소요)...");
      const videoUrl = await generateVideo(imageUrl); 
      
      // 결과값이 없으면 샘플 GIF라도 띄우기
      setResultVideo(videoUrl || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJidmZ4Ync0Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z/giphy.gif"); 
      setStatus("🎉 드디어 제작 완료! 아래에서 확인하세요.");
    } catch (error: any) {
      console.error("제작 에러:", error);
      // 구체적인 에러 메시지를 상태에 표시
      setStatus(`❌ 오류: ${error.message || "API 연결 실패"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-4 text-center">💰 돈닉의 AI 경제 연구소</h1>
        
        <div className="flex mb-6 bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button onClick={() => setMode('auto')} className={`flex-1 p-2 rounded-md font-bold transition ${mode === 'auto' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>🤖 자동 대본</button>
          <button onClick={() => setMode('manual')} className={`flex-1 p-2 rounded-md font-bold transition ${mode === 'manual' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>📝 수동 대본</button>
        </div>

        {mode === 'auto' ? (
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="주제를 입력하세요 (예: 5060 재테크 전략)" className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4 focus:border-blue-500 outline-none" />
        ) : (
          <textarea rows={5} value={manualScript} onChange={(e) => setManualScript(e.target.value)} placeholder="대본 내용을 직접 입력하세요." className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4 focus:border-blue-500 outline-none" />
        )}
        
        <button onClick={handleGenerate} disabled={loading} className={`w-full p-4 rounded font-bold text-lg transition ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}>
          {loading ? '열심히 제작하고 있어요...' : '돈닉 영상 만들기'}
        </button>

        <div className="mt-6 p-4 bg-slate-900 rounded border border-slate-700 text-center">
          <p className="text-blue-400 font-mono text-lg">{status}</p>
        </div>

        {/* 결과 영상 표시 부분 수정 */}
        {resultVideo && (
          <div className="mt-8 border-t border-slate-700 pt-6 text-center">
            <h2 className="text-xl font-bold mb-4 text-green-400">완성된 결과물</h2>
            <div className="bg-black aspect-video rounded-lg overflow-hidden flex items-center justify-center border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
               <video src={resultVideo} controls autoPlay className="w-full h-full" />
            </div>
            <a href={resultVideo} download className="inline-block mt-4 text-sm text-slate-400 underline hover:text-white">영상 다운로드</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainApp;



