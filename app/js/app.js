'use strict'

class Application {
  constructor(container, shaders) {
    this.initThreeJs_(container);
    this.setupScene_(shaders);
    this.listen_();
  }

  listen_() {
    window.addEventListener('resize', this.onResize_.bind(this))
  }

  initThreeJs_(container) {
    this.WIDTH_ = window.innerWidth;
    this.HEIGHT_ = window.innerHeight;
    this.camera_ = new THREE.PerspectiveCamera(60, this.WIDTH_ / this.HEIGHT_, 1, 5000);
    this.camera_.position.set(0, 0, 500);
    this.renderer_ = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer_.setSize(this.WIDTH_, this.HEIGHT_);
    this.container_ = container;
    this.container_.appendChild(this.renderer_.domElement);
    this.controls_ = new THREE.OrbitControls(this.camera_);
  }

  setupScene_(shaders) {
    const light = new THREE.AmbientLight(0xff0000);
    const geometry = new THREE.BoxGeometry(200, 200, 200);

    this.uniforms_ = { time: { value: 1 } };
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms_,
      vertexShader: shaders['basic_vert'],
      fragmentShader: shaders['basic_frag'],
      side: THREE.DoubleSide,
    });

    this.mesh_ = new THREE.Mesh(geometry, material);
    this.scene_ = new THREE.Scene();
    this.scene_.add(light);
    this.scene_.add(this.mesh_);
  }

  onResize_(e) {
    this.WIDTH_ = window.innerWidth;
    this.HEIGHT_ = window.innerHeight;
    this.renderer_.setSize(this.WIDTH_, this.HEIGHT_);
    this.camera_.aspect = this.WIDTH_ / this.HEIGHT_;
    this.camera_.updateProjectionMatrix();
  }

  update_() {
    this.mesh_.rotation.x += 0.005;
    this.mesh_.rotation.y += 0.01;
    this.uniforms_.time.value = 0.3* Math.sin(this.mesh_.rotation.y * 2.5);
    this.controls_.update();
  }

  render_() {
    this.renderer_.render(this.scene_, this.camera_);
  }

  start() {
    this.update_();
    this.render_();
    requestAnimationFrame(this.start.bind(this));
  }
}
