import React from 'react';
import ReactDOM from 'react-dom/client';
// MainApp.tsx 파일에서 MainApp이라는 부품을 가져오겠다는 뜻입니다.
import { MainApp } from './MainApp'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* 화면에 진짜 엔진이 달린 MainApp을 그려줍니다. */}
    <MainApp />
  </React.StrictMode>
);
