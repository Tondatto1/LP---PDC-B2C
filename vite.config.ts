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
        ['ceruti_,matsuda.png', 'ceruti_matsuda.png'],
        ['ceruti_,matsuda.png', 'cerutti_matsuda.png'],
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
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, aliasPath);
        }
      });
    } catch (e) {
      console.error('Error in syncImagesPlugin:', e);
    }
  };

  const getMimeType = (ext: string): string => {
    const map: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.gif': 'image/gif',
      '.ico': 'image/x-icon',
    };
    return map[ext.toLowerCase()] || 'application/octet-stream';
  };

  return {
    name: 'sync-images-plugin',
    buildStart() {
      sync();
    },
    configureServer(server) {
      sync();
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const urlWithoutQuery = req.url.split('?')[0];
        const lowerUrl = urlWithoutQuery.toLowerCase();

        if (lowerUrl.startsWith('/imagens/') || lowerUrl.startsWith('/imagens')) {
          let decoded: string;
          try {
            decoded = decodeURIComponent(urlWithoutQuery);
          } catch {
            decoded = urlWithoutQuery;
          }

          const filename = decoded.replace(/^\/[Ii]magens\/?/, '');
          if (!filename) return next();

          const publicDir = path.resolve(__dirname, 'public/imagens');
          const rootDir = path.resolve(__dirname, 'Imagens');

          const candidatePaths = [
            path.join(publicDir, filename),
            path.join(rootDir, filename),
            path.join(publicDir, filename.toLowerCase()),
            path.join(publicDir, filename.replace(/_/g, '-')),
            path.join(publicDir, filename.replace(/-/g, '_')),
            path.join(publicDir, filename.replace(/ /g, '_')),
            path.join(publicDir, filename.replace(/_/g, ' ')),
          ];

          for (const targetPath of candidatePaths) {
            if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
              const ext = path.extname(targetPath);
              res.setHeader('Content-Type', getMimeType(ext));
              res.setHeader('Cache-Control', 'public, max-age=3600');
              const stream = fs.createReadStream(targetPath);
              stream.pipe(res);
              return;
            }
          }
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
