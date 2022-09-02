import { assign } from "lodash";

// *
// * Colors
// *
const colors = [
  "#252525",
  "#525252",
  "#737373",
  "#969696",
  "#bdbdbd",
  "#d9d9d9",
  "#f0f0f0",
];

const charcoal = "#252525";
const grey = "#969696";
// const red = "rgb(253,190,190)"
const red = "rgb(190,10,8)"
const hourColor = "rgb(155,155,160)"
  // *
// * Typography
// *
const sansSerif = "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;
// *
// * Layout
// *
const baseProps = {
  colorScale: colors,
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize: 14,
  letterSpacing,
  padding: 10,
  fill: "rgb(210,210,210)",
  stroke: "transparent",
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, {
  fontFamily: sansSerif,
  fontSize: 12,
  letterSpacing,
  padding: 10,
  fill: "red",
  stroke: "transparent",
},);
// *
// * Strokes
// *
const strokeLinecap = "round";
const strokeLinejoin = "round";

export const custom = {
  area: assign(
    {
      style: {
        data: {
          fill: hourColor,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: hourColor,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
          stroke: "transparent",
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding: 25,
        }),
        grid: {
          fill: "none",
          stroke: "none",
          pointerEvents: "painted",
        },
        ticks: {
          fill: "transparent",
          size: 1,
          stroke: "transparent",
        },
        tickLabels: {
          fontFamily: sansSerif,
          fontSize: 13,
          letterSpacing,
          padding: 10,
          fill: "rgb(110,110,110)",
          stroke: "transparent",
        },
      },
    },
    baseProps,
  ),
  bar: assign(
    {
      style: {
        data: {
          fill: red,
          padding: 8,
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  chart: baseProps,
  errorbar: assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: "transparent",
          stroke: "white",
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps,
  ),
};