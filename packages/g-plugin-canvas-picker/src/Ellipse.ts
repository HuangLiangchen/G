import { SceneGraphNode, DisplayObject } from '@antv/g';

function ellipseDistance(squareX: number, squareY: number, rx: number, ry: number) {
  return squareX / (rx * rx) + squareY / (ry * ry);
}

export function isPointInPath(displayObject: DisplayObject, { x, y }: { x: number; y: number }): boolean {
  const {
    attributes: { rx = 0, ry = 0, fill, stroke, lineWidth = 0 },
  } = displayObject.getEntity().getComponent(SceneGraphNode);
  const [cx, cy] = displayObject.getPosition();
  const halfLineWith = lineWidth / 2;
  const squareX = (x - cx) * (x - cx);
  const squareY = (y - cy) * (y - cy);
  // 使用椭圆的公式： x*x/rx*rx + y*y/ry*ry = 1;
  if (fill && stroke) {
    return ellipseDistance(squareX, squareY, rx + halfLineWith, ry + halfLineWith) <= 1;
  }
  if (fill) {
    return ellipseDistance(squareX, squareY, rx, ry) <= 1;
  }
  if (stroke) {
    return (
      ellipseDistance(squareX, squareY, rx - halfLineWith, ry - halfLineWith) >= 1 &&
      ellipseDistance(squareX, squareY, rx + halfLineWith, ry + halfLineWith) <= 1
    );
  }
  return false;
}