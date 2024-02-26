import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: "dist/index.js",
            format: 'es',
            exports: 'named',
            sourcemap: true,
            strict: false,
        }
    ],
    plugins: [
        typescript()
    ],
    external: ['react'],
}