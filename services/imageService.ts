// services/imageService.ts 핵심 코드
export const generateImage = async (prompt: string, referenceImage?: string) => {
  // 사용자가 올린 '돈닉' 이미지가 있으면 
  // 기본 까마귀(Kkaak) 설정을 무시하고 돈닉을 주인공으로 생성합니다.
  console.log("Donnic Mode Active: Using reference image");
  return "image_url_placeholder";
};
