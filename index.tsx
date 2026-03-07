import React from 'react';
import ReactDOM from 'react-dom/client';
// ⚠️ MainApp 대신 소문자 m으로 시작하는 ./mainapp 으로 바꿔보세요!
import MainApp from './mainapp'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
