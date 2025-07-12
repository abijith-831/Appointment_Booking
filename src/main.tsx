// main.tsx or main.ts
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class"   enableSystem defaultTheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>
);
