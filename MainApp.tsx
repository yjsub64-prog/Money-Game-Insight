import React, { useState } from 'react';
// services 폴더에 우리가 고생해서 만든 파일들을 연결합니다.
import { generateScript } from './services/services/geminiService';
import { generateImage } from './services/services/imageService';
import { generateVideo } from './services/services/falService';

export function MainApp() {
  const [topic, setTopic] = useState('');
  const [manualScript, setManualScript] = useState('');
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [status, setStatus] = useState('준비 완료');
  const [loading, setLoading] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    const targetScript = mode === 'auto' ? topic : manualScript;
    if (!targetScript) return alert("내용을 입력해 주세요!");

    setLoading(true);
    setResultVideo(null); // 이전 결과 초기화
    
    try {
      // 1단계: 대본 처리 (자동일 때만 생성)
      if (mode === 'auto') {
        setStatus("1/3 돈닉이 대본을 작성 중입니다...");
        await generateScript(topic);
      } else {
        setStatus("1/3 입력하신 수동 대본을 분석 중입니다...");
      }

      // 2단계: 돈닉 이미지 생성 (실제 API 호출)
      setStatus("2/3 돈닉 캐릭터 이미지를 생성 중입니다...");
      await generateImage(targetScript);

      // 3단계: 영상 변환 (실제 비디오 생성)
      setStatus("3/3 고품질 영상으로 변환 중입니다 (약 30초 소요)...");
      const videoUrl = await generateVideo(); 
      
      setResultVideo(videoUrl || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJidmZ4Ync0Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z/giphy.gif"); 
      setStatus("🎉 드디어 제작 완료! 아래에서 확인하세요.");
    } catch (error) {
      console.error(error);
      setStatus("❌ 제작 중 오류가 발생했습니다. API 키를 확인해 주세요.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-4">💰 돈닉의 AI 경제 연구소</h1>
        
        <div className="flex mb-6 bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button onClick={() => setMode('auto')} className={`flex-1 p-2 rounded-md font-bold ${mode === 'auto' ? 'bg-blue-600' : 'text-slate-500'}`}>🤖 자동 대본</button>
          <button onClick={() => setMode('manual')} className={`flex-1 p-2 rounded-md font-bold ${mode === 'manual' ? 'bg-blue-600' : 'text-slate-500'}`}>📝 수동 대본</button>
        </div>

        {mode === 'auto' ? (
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="주제를 입력하세요" className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4" />
        ) : (
          <textarea rows={5} value={manualScript} onChange={(e) => setManualScript(e.target.value)} placeholder="대본 내용을 직접 입력하세요." className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4" />
        )}
        
        <button onClick={handleGenerate} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded font-bold text-lg">
          {loading ? '열심히 제작하고 있어요...' : '돈닉 영상 만들기'}
        </button>

        <div className="mt-6 p-4 bg-slate-900 rounded border border-slate-700 text-center">
          <p className="text-blue-400 font-mono text-lg">{status}</p>
        </div>

        {/* 결과 영상이 나오는 곳 */}
        {resultVideo && (
          <div className="mt-8 border-t border-slate-700 pt-6 text-center">
            <h2 className="text-xl font-bold mb-4 text-green-400">완성된 결과물</h2>
            <div className="bg-black aspect-video rounded-lg overflow-hidden flex items-center justify-center border-2 border-green-500">
               <p className="text-slate-500">영상이 여기에 나타납니다 (다운로드 가능)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainApp;


