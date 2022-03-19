import { ConnectorManager } from './diagram/connector/connector-manager.js';
import { Diagram } from './diagram/diagram.js';
import { SvgPresenter } from './diagram/svg-presenter/svg-presenter.js';
import { connectorsInit, shapeCreate } from './diagram/svg-presenter/svg-shape/svg-shape-factory.js';

/**
 * @param {SVGSVGElement} svg
 * @param {ISvgPresenterShapeDecoratorFuctory=} shapeDecoratorFuctory
 * @returns {IDiagram}
 */
export function svgDiagramCreate(svg, shapeDecoratorFuctory) {
	/**
	 * @param {ISvgPresenterShapeFuctoryParam} param
	 * @returns {ISvgPresenterShape}
	 */
	function shapeFuctory(param) {
		/** @type {ISvgPresenterShape} */
		let shape = shapeCreate(param.svgCanvas, param.createParams);
		if (shapeDecoratorFuctory) {
			shape = shapeDecoratorFuctory(shape, param);
		}
		param.svgElemToPresenterObj.set(shape.svgEl, shape);

		connectorsInit(param.listener, param.svgElemToPresenterObj, shape);
		return shape;
	}

	const presenter = new SvgPresenter(svg, shapeFuctory);
	return new Diagram(presenter, new ConnectorManager(presenter));
}
