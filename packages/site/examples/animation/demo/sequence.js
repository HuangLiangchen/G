import { Circle, Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import * as dat from 'dat.gui';
import Stats from 'stats.js';

// create a renderer
const canvasRenderer = new CanvasRenderer();
const webglRenderer = new WebGLRenderer();
const svgRenderer = new SVGRenderer();

// create a canvas
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  renderer: canvasRenderer,
});

const circle = new Circle({
  style: {
    x: 200,
    y: 200,
    r: 60,
    fill: '#1890FF',
    stroke: '#F04864',
    lineWidth: 4,
    shadowColor: 'black',
    shadowBlur: 30,
  },
});

canvas.appendChild(circle);

(async () => {
  const moveRight = circle.animate(
    [
      {
        transform: 'translate(0)',
      },
      {
        transform: 'translate(100px)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fill: 'both',
    },
  );
  await moveRight.finished;

  const moveDown = circle.animate(
    [
      {
        transform: 'translate(0)',
      },
      {
        transform: 'translate(0, 100px)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fill: 'both',
    },
  );
  await moveDown.finished;

  const moveLeft = circle.animate(
    [
      {
        transform: 'translate(0)',
      },
      {
        transform: 'translate(-100px)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fill: 'both',
    },
  );
  await moveLeft.finished;

  const moveUp = circle.animate(
    [
      {
        transform: 'translate(0)',
      },
      {
        transform: 'translate(0, -100px)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fill: 'both',
    },
  );
  await moveUp.finished;
})();

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
const $wrapper = document.getElementById('container');
$wrapper.appendChild($stats);
canvas.on('afterRender', () => {
  if (stats) {
    stats.update();
  }
});

// GUI
const gui = new dat.GUI({ autoPlace: false });
$wrapper.appendChild(gui.domElement);
const rendererFolder = gui.addFolder('renderer');
const rendererConfig = {
  renderer: 'canvas',
};
rendererFolder.add(rendererConfig, 'renderer', ['canvas', 'webgl', 'svg']).onChange((renderer) => {
  canvas.setRenderer(
    renderer === 'canvas' ? canvasRenderer : renderer === 'webgl' ? webglRenderer : svgRenderer,
  );
});
rendererFolder.open();