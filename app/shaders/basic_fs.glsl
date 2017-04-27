uniform float time;

void main() {
  gl_FragColor = vec4(time, 0.2, time * 0.5, 1.0);
}
