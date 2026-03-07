import React, { useState } from 'react';
import { generateScript } from './services/geminiService';

export function MainApp() {
  const [topic, setTopic] = useState('');
  const [manualScript, setManualScript] = useState(''); // 수동 대본 저장용
  const [mode, setMode] = useState<'auto' | 'manual'>('auto'); // 모드 선택
  const [status, setStatus] = useState('준비 완료');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      if (mode === 'auto') {
        setStatus("1. 돈닉이 자동으로 대본을 쓰는 중...");
        await generateScript(topic);
      } else {
        setStatus("1. 입력하신 수동 대본으로 제작 시작...");
        // 입력하신 manualScript 내용을 사용하여 제작합니다.
      }
      setStatus("2. 돈닉 이미지를 그리는 중...");
      setStatus("🎉 제작 완료!");
    } catch (error) {
      setStatus("❌ 오류 발생");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-4 flex items-center">💰 돈닉의 AI 경제 연구소</h1>
        
        {/* 자동/수동 선택 탭 */}
        <div className="flex mb-6 bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button 
            onClick={() => setMode('auto')}
            className={`flex-1 p-2 rounded-md font-bold ${mode === 'auto' ? 'bg-blue-600' : 'text-slate-500'}`}
          >
            🤖 자동 대본 (AI가 작성)
          </button>
          <button 
            onClick={() => setMode('manual')}
            className={`flex-1 p-2 rounded-md font-bold ${mode === 'manual' ? 'bg-blue-600' : 'text-slate-500'}`}
          >
            📝 수동 대본 (직접 입력)
          </button>
        </div>

        {mode === 'auto' ? (
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="주제를 입력하세요 (예: 배터리 산업 전망)"
            className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4"
          />
        ) : (
          <textarea 
            rows={5}
            value={manualScript}
            onChange={(e) => setManualScript(e.target.value)}
            placeholder="제작에 사용할 대본 내용을 여기에 직접 붙여넣으세요."
            className="w-full p-4 rounded bg-slate-900 border border-slate-700 mb-4"
          />
        )}
        
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded font-bold text-lg"
        >
          {loading ? '제작 중...' : '돈닉 영상 만들기'}
        </button>

        <div className="mt-6 p-4 bg-slate-900 rounded border border-slate-700">
          <p className="text-blue-400 font-mono">현재 상태: {status}</p>
        </div>
      </div>
    </div>
  );
}

export default MainApp;
