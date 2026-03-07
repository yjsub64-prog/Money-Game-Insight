export const PRICING = {
  USD_TO_KRW: 1450,
  IMAGE: { 'gemini-2.5-flash-image': 0.0315, 'nano-banana-pro': 0.15 },
  TTS: { perCharacter: 0 }, // Gemini TTS (무료)
  VIDEO: { perVideo: 0.15 }
} as const;

export const CONFIG = {
  DEFAULT_IMAGE_MODEL: "gemini-2.5-flash-image",
  STORAGE_KEYS: {
    GEMINI_API_KEY: 'tubegen_gemini_key',
    FAL_API_KEY: 'tubegen_fal_key',
    PROJECTS: 'tubegen_projects',
  }
};
