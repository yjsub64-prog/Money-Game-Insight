import React from 'react';
import ReactDOM from 'react-dom/client';
// ⚠️ 이 부분이 핵심입니다! 중괄호를 빼고 가져와야 합니다.
import MainApp from './MainApp'; 

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
