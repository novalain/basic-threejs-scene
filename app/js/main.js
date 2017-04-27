'use strict'

// TODO: ShaderManager
const shaderPaths = new Map([
  ['basic_vert', 'shaders/basic_vs.glsl'],
  ['basic_frag', 'shaders/basic_fs.glsl']
]);
const shadersLoaded = new Map();

window.onload = () => {
  const shaderPromises = [];
  shaderPaths.forEach((path, key) => {
    const promise = ShaderFetcher.fetchShader(path).then(rawShader => {
      shadersLoaded[key] = rawShader;
    });
    shaderPromises.push(promise);
  });

  Promise.all(shaderPromises).then(() => {
    const app = new Application(document.body, shadersLoaded);
    app.start();
  });
}
