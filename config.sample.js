module.exports = {
    projectPath: '/path/to/project',
    ignore: ['node_modules/**', 'locale/**'],
    scope: /[^\x00-\xff]/g,
    babel: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['transform-decorators-legacy'],
    },
}
