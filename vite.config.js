import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/swiss/', // Imposta il percorso di base del tuo progetto
});
