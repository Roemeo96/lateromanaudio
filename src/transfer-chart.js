import * as d3 from 'd3';

const WIDTH = 760;
const HEIGHT = 540;

const MARGIN = {
  top: 30,
  right: 50,
  bottom: 65,
  left: 125,
};

/**
 * Erstellt das SVG-Diagramm.
 *
 * @param {SVGSVGElement} svgElement
 * @returns {{ update: Function }}
 */
export function createTransferChart(svgElement) {
  const svg = d3
    .select(svgElement)
    .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const plotLeft = MARGIN.left;
  const plotRight = WIDTH - MARGIN.right;
  const plotTop = MARGIN.top;
  const plotBottom = HEIGHT - MARGIN.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([plotLeft, plotRight]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 5])
    .range([plotBottom, plotTop]);

  const xAxis = d3
    .axisBottom(xScale)
    .tickValues([]);

  const yAxis = d3
    .axisLeft(yScale)
    .tickValues([0, 5])
    .tickSize(0)
    .tickPadding(12)
    .tickFormat(value => (
      value === 0
        ? 'HEEL-DOWN'
        : 'TOE-DOWN'
    ));

  const xGrid = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickSize(-(plotBottom - plotTop))
    .tickFormat('');

  const yGrid = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickSize(-(plotRight - plotLeft))
    .tickFormat('');

  svg
    .append('g')
    .attr('class', 'chart-grid')
    .attr('transform', `translate(0, ${plotBottom})`)
    .call(xGrid);

  svg
    .append('g')
    .attr('class', 'chart-grid')
    .attr('transform', `translate(${plotLeft}, 0)`)
    .call(yGrid);

  svg
    .append('g')
    .attr('class', 'chart-axis')
    .attr('transform', `translate(0, ${plotBottom})`)
    .call(xAxis);

  svg
    .append('g')
    .attr('class', 'chart-axis')
    .attr('transform', `translate(${plotLeft}, 0)`)
    .call(yAxis);

  svg
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', (plotLeft + plotRight) / 2)
    .attr('y', HEIGHT - 15)
    .attr('text-anchor', 'middle')
    .text('Input Volume');

  svg
    .append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(plotTop + plotBottom) / 2)
    .attr('y', 22)
    .attr('text-anchor', 'middle')
    .text('Expression Position');

  const lineGenerator = d3
    .line()
    .x(point => xScale(point.input))
    .y(point => yScale(point.output));

  const curvePath = svg
    .append('path')
    .attr('class', 'transfer-curve');

  const inputGuide = svg
    .append('line')
    .attr('class', 'current-guide');

  const outputGuide = svg
    .append('line')
    .attr('class', 'current-guide');

  const currentPoint = svg
    .append('circle')
    .attr('class', 'current-point')
    .attr('r', 8);

  let previousInput = null;

  /**
   * Aktualisiert Kennlinie und aktuellen Arbeitspunkt.
   *
   * @param {object} data
   * @param {{ input: number, output: number }[]} data.points
   * @param {number} data.currentInput
   * @param {number} data.currentOutput
   * @param {number} data.attackMs
   * @param {number} data.releaseMs
   */
  function update({
    points,
    currentInput,
    currentOutput,
    attackMs,
    releaseMs,
  }) {
    let transitionDuration = 0;

    if (previousInput === null) {
      transitionDuration = 0;
    } else if (currentInput > previousInput) {
      transitionDuration = attackMs;
    } else if (currentInput < previousInput) {
      transitionDuration = releaseMs;
    }

    svg.style(
      '--output-transition-duration',
      `${transitionDuration}ms`,
    );

    curvePath
      .datum(points)
      .attr('d', lineGenerator);

    const pointX = xScale(currentInput);
    const pointY = yScale(currentOutput);

    inputGuide
      .attr('x1', pointX)
      .attr('x2', pointX)
      .attr('y1', plotBottom)
      .attr('y2', pointY);

    outputGuide
      .attr('x1', plotLeft)
      .attr('x2', pointX)
      .attr('y1', pointY)
      .attr('y2', pointY);

    currentPoint
      .attr('cx', pointX)
      .attr('cy', pointY);

    previousInput = currentInput;
  }

  return {
    update,
  };
}