import fs from 'fs';
import path from 'path';

const ttfLoaderPlugin = {
  name: 'ttf-loader',
  setup(build) {
    build.onResolve({ filter: /\.ttf$/ }, args => {
      return { path: path.resolve(args.resolveDir, args.path), namespace: 'ttf-namespace' };
    });

    build.onLoad({ filter: /.*/, namespace: 'ttf-namespace' }, async (args) => {
      const data = await fs.promises.readFile(args.path);
      const buffer = Buffer.from(data).toString('base64');
      return {
        contents: `export default "data:font/ttf;base64,${buffer}"`,
        loader: 'js'
      };
    });
  }
};

export default ttfLoaderPlugin;
