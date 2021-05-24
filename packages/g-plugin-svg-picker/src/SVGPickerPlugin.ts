import { inject, injectable } from 'inversify';
import { DisplayObjectPool, RenderingService, RenderingPlugin, SceneGraphService, PickingResult } from '@antv/g';
// import { ElementSVG } from '@antv/g-plugin-svg-renderer';

/**
 * pick shape(s) with Mouse/Touch event
 *
 * 1. find AABB with r-tree
 * 2. use elementFromPoint
 */
@injectable()
export class SVGPickerPlugin implements RenderingPlugin {
  static tag = 'SVGPickerPlugin';

  @inject(SceneGraphService)
  protected sceneGraphService: SceneGraphService;

  @inject(DisplayObjectPool)
  private displayObjectPool: DisplayObjectPool;

  apply(renderingService: RenderingService) {
    renderingService.hooks.pick.tap(SVGPickerPlugin.tag, (result: PickingResult) => {
      const { x, y, clientX, clientY } = result.position;

      // @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementFromPoint
      const element = document.elementFromPoint(clientX, clientY);

      // find by id
      let target = null;
      const id = element?.getAttribute('id');
      if (id) {
        target = this.displayObjectPool.getByName(id);
      }

      return {
        position: result.position,
        picked: target,
      };
    });
  }
}
