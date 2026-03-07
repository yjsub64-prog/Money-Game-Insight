export const IMAGE_MODELS = [
  {
    id: 'gemini-2.5-flash-image',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    pricePerImage: 0.0315,
    description: '고품질, 프롬프트 이해력 우수',
    speed: '보통'
  },
  {
    id: 'nano-banana-pro',
    name: 'Nano Banana Pro',
    provider: 'Google',
    pricePerImage: 0.15,
    description: '텍스트 렌더링 우수, 캐릭터 일관성 고품질',
    speed: '느림'
  },
] as const;

export const PRICING = {
  USD_TO_KRW: 1450,
  IMAGE: {
    'gemini-2.5-flash-image': 0.0315,
    'nano-banana-pro': 0.15,
  },
  TTS: {
    perCharacter: 0, // Gemini TTS 통합으로 무료 처리
  },
  VIDEO: {
    perVideo: 0.15,
  }
} as const;

export function formatKRW(usd: number): string {
  return Math.round(usd * 1450).toLocaleString('ko-KR') + '원';
}

export const CONFIG = {
  DEFAULT_IMAGE_MODEL: "gemini-2.5-flash-image",
  STORAGE_KEYS: {
    GEMINI_API_KEY: 'tubegen_gemini_key',
    FAL_API_KEY: 'tubegen_fal_key',
    IMAGE_MODEL: 'tubegen_image_model',
    PROJECTS: 'tubegen_projects',
  }
};
