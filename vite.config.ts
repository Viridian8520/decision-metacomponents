import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),  // 配置别名
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    // proxy: {
    //   '/rest': {
    //     target: 'https://localhost:8080', // 接口基地址
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/rest/, ''),
    //     bypass(req, res, options) {
    //       /**
    //        *  URL(url,base)
    //        *  是一个表示绝对或相对 URL 的 DOMString。
    //           如果ur1 是相对 URL，则会将 base 用作基准 URL。
    //           如果 ur1 是绝对 URL，则无论参数base是否存在，都将被忽略。
    //        */
    //       const proxyUrl = new URL(options.rewrite(req.url) || '', (options.target) as string)?.href || '';
    //       console.log(proxyUrl);
    //       req.headers["x-req-proxyUrl"] = proxyUrl;// 设置无效
    //       res.setHeader("x-res-proxyUrl", proxyUrl); // 有效
    //     },
    //   },
    // },
  },
})

