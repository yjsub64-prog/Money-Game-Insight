const runAudio = async () => {
    for (let i = 0; i < initialAssets.length; i++) {
        if (isAbortedRef.current) break;

        setProgressMessage(`씬 ${i + 1}/${initialAssets.length} Gemini 음성 생성 중...`);

        try {
            // 일레븐랩스 없이 바로 Gemini TTS 호출
            const audioData = await generateAudioForScene(assetsRef.current[i].narration);
            
            if (audioData && !isAbortedRef.current) {
                updateAssetAt(i, {
                    audioData: audioData,
                    status: 'completed'
                });
                
                // 비용 0원 처리
                const charCount = assetsRef.current[i].narration.length;
                addCost('tts', 0, charCount); 
            }
        } catch (e: any) {
            console.error(`[Gemini TTS] 씬 ${i + 1} 생성 실패:`, e.message);
            updateAssetAt(i, { status: 'error' });
        }
        await wait(100); 
    }
};