import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import times from "lodash/times";
import isFunction from "lodash/isFunction";
import Hexagon from "react-hexagon";

function UpbeatGrid() {
  const rows = 5;
  const cols = 5;
  let hexagons = times(rows, (row) => times(cols, (col) => (col) + (cols * row)));
  const gridWidth = 500;
  const colsWidth = gridWidth * (4 / (4 + 3 * (cols - 1)))
  const gridHeight = ((colsWidth / 4) * (3 / Math.sqrt(3)) * (1 + 2 * rows))
  const hexSize = gridWidth / (cols * 1.5 + 0.5);
  const hexWidth = hexSize * 2
  const hexHeight = Math.ceil(hexSize * Math.sqrt(3))

  const getHexDimensions = (row, col) => {
    const dimensions = {
      width: `${hexWidth}px`,
      height: `${hexHeight}px`,
      x: (col - 1) * (hexSize / 2) * 3 + hexSize * (3 / 2),
      y: (row + 1) * (hexSize * (Math.sqrt(3) / 2))
    };
    if (col % 2 === 1) {
      dimensions.y = (row) * (hexSize * (Math.sqrt(3) / 2))
    }
    return dimensions;
  };

  const getRowDimensions = (row) => {
    const dimensions = {
      y: `${row * (hexSize * (Math.sqrt(3) / 2))}px`,
      height: `${((colsWidth / 4) * (3 / Math.sqrt(3)) * (1 + 2 * rows))}px`,
      width: gridWidth
    };
    return dimensions;
  };

  const getHexProps = (hexagon) => {
    return {
      style: {
        fill: "#007aff",
        stroke: "white"
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
    };
  };

  const renderHexagonContent = (hexagon) => {
    return (
      <text
        x="50%"
        y="50%"
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: "white" }}
        textAnchor="middle"
      >
        {hexagon}
      </text>
    );
  };

  const tryInvoke = (func, params = [], defaultValue = null) => {
    return isFunction(func) ? func(...params) : defaultValue;
  };

  return (
    <svg width={gridWidth} height={gridHeight} x={0} y={0}>
      {hexagons.map((row, rIdx) => {
        const rowDim = getRowDimensions(rIdx);
        return <svg
          key={rIdx}
          width={rowDim.width}
          height={rowDim.height}
          y={rowDim.y}
        >{row.map((col, cIdx) => {
          const hexDim = getHexDimensions(rIdx, cIdx);
          const _hexProps = tryInvoke(getHexProps(hexagons[rIdx][cIdx]), [hexagons[rIdx][cIdx]], getHexProps(hexagons[rIdx][cIdx]));
          return <svg
            key={(cIdx) + (cols * rIdx)}
            height={hexDim.height}
            width={hexDim.width}
            x={`${hexDim.x}px`}
            y={`${hexDim.y}px`}
          >
            <Hexagon {..._hexProps} flatTop>
              {tryInvoke(renderHexagonContent, [hexagons[rIdx][cIdx]], <tspan />)}
            </Hexagon>
          </svg>
        })}</svg>
      })}
    </svg>
  );
}

export default UpbeatGrid;