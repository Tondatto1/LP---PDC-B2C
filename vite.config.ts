import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function syncImagesPlugin(): Plugin {
  const sync = () => {
    try {
      const publicImagens = path.resolve(__dirname, 'public/imagens');
      if (!fs.existsSync(publicImagens)) {
        fs.mkdirSync(publicImagens, { recursive: true });
      }

      const rootImagens = path.resolve(__dirname, 'Imagens');
      if (fs.existsSync(rootImagens)) {
        const files = fs.readdirSync(rootImagens);
        files.forEach((file) => {
          const src = path.join(rootImagens, file);
          const dest = path.join(publicImagens, file);
          if (fs.statSync(src).isFile()) {
            fs.copyFileSync(src, dest);
          }
        });
      }

      const aliases: [string, string][] = [
        ['ceruti_,matsuda.png.jpeg', 'ceruti_,matsuda.png'],
        ['ceruti_,matsuda.png.jpeg', 'ceruti_matsuda.png'],
        ['ceruti_,matsuda.png.jpeg', 'cerutti_matsuda.png'],
        ['cerutti_turma.png.jpeg', 'cerutti_turma.png'],
        ['cerutti_turma.png.jpeg', 'cerutti_turma.jpeg'],
        ['cerutti_turma.png.jpeg', 'cerutti_turma.jpg'],
        ['logo - letra branca - transp.png', 'logo_letra_branca_transp.png'],
        ['logo - letra branca - transp.png', 'logo-letra-branca-transp.png'],
        ['LOGO - LETRA PRETA - TRANS - HOR.png', 'logo_letra_preta_trans_hor.png'],
        ['LOGO - LETRA PRETA - TRANS - HOR.png', 'logo-letra-preta-trans-hor.png'],
        ['LOGO - LETRA PRETA - TRANS - HOR.png', 'LOGO_LETRA_PRETA_TRANS_HOR.png'],
        ['logo camisc.png.png', 'logo camisc.png'],
        ['A - Favicon  - Letra Azul - Fundo branco.jpg', 'favicon.jpg'],
      ];

      aliases.forEach(([source, alias]) => {
        const sourcePath = path.join(publicImagens, source);
        const aliasPath = path.join(publicImagens, alias);
        if (fs.existsSync(sourcePath) && !fs.existsSync(aliasPath)) {
          fs.copyFileSync(sourcePath, aliasPath);
        }
      });
    } catch (e) {
      console.error('Error in syncImagesPlugin:', e);
    }
  };

  return {
    name: 'sync-images-plugin',
    buildStart() {
      sync();
    },
    configureServer(server) {
      sync();
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/Imagens/') || req.url.startsWith('/imagens/'))) {
          sync();
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), syncImagesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
