import { timerFlush } from "d3-timer";
import { NODE_VISIBLE } from "../../../util/globals";
import { numericToDateObject, prettifyDate } from "../../../util/dateHelpers";
import { getTraitFromNode } from "../../../util/treeMiscHelpers";

export const updateTipLabels = function updateTipLabels(dt) {
  if ("tipLabels" in this.groups) {
    this.groups.tipLabels.selectAll("*").remove();
  } else {
    this.groups.tipLabels = this.svg.append("g").attr("id", "tipLabels");
  }

  const tLFunc = this.callbacks.tipLabel;
  const xPad = this.params.tipLabelPadX;
  const yPad = this.params.tipLabelPadY;

  const inViewTips = (this.params.showStreamTrees ? this.nodes.filter((d) => !d.n.inStream) : this.nodes)
    .filter((d) => !d.n.hasChildren).filter((d) => d.inView);

  const inViewVisibleTips = inViewTips.filter((d) => d.visibility === NODE_VISIBLE);

  /* We show tip labels by checking the number of "inView & visible" tips */
  if (inViewVisibleTips.length < this.params.tipLabelBreakL1) {
    /* We calculate font size based on the total number of in view tips (both visible & non-visible) */
    let fontSize = this.params.tipLabelFontSizeL1;
    if (inViewTips.length < this.params.tipLabelBreakL3) {
      fontSize = this.params.tipLabelFontSizeL3;
    } else if (inViewTips.length < this.params.tipLabelBreakL2) {
      fontSize = this.params.tipLabelFontSizeL2;
    }

    window.setTimeout(() => {
      this.groups.tipLabels
        .selectAll(".tipLabel")
        .data(inViewVisibleTips)
        .enter()
        .append("text")
        .attr("x", (d) => d.xTip + xPad)
        .attr("y", (d) => d.yTip + yPad)
        .text((d) => tLFunc(d))
        .attr("class", "tipLabel")
        .style("font-size", fontSize.toString() + "px")
        .style("pointer-events", "none")
        .style("visibility", (d) => (d.visibility === NODE_VISIBLE ? "visible" : "hidden"));
    }, dt);
  }
};

export const removeTipLabels = function removeTipLabels() {
  if ("tipLabels" in this.groups) {
    this.groups.tipLabels.selectAll("*").remove();
  }
};

/** branchLabelSize
 * @param {str} key e.g. "aa" or "clade"
 * @return {str} font size of the branch label, e.g. "12px"
 */
const branchLabelSize = (key) => {
  if (key === "aa") return "10px";
  return "14px";
};

/** branchLabelFontWeight
 * @param {str} key e.g. "aa" or "clade"
 * @return {str} font weight of the branch label, e.g. "500"
 */
const branchLabelFontWeight = (key) => {
  if (key === "aa") return "500";
  return "700";
};

/** createBranchLabelVisibility (the return value should be passed to d3 style call)
 * @param {str} key e.g. "aa" or "clade"
 * @param {bool} showAll
 * @param {str} layout
 * @param {int} totalTipsInView visible tips also in view
 * @return {func} Returns a function with 1 argument: the current node (branch).
 *                This fn will return "visible" or "hidden".
 *                NOTE: the fn should only be provided nodes which have a label.
 */
const createBranchLabelVisibility = (key, showAll, layout, totalTipsInView) => (d) => {
  if (showAll) return "visible";
  if (d.visibility !== NODE_VISIBLE) return "hidden";
  const magicTipFractionToShowBranchLabel = 0.03;
  /* if the number of _visible_ tips descending from this node are over the
  magicTipFractionToShowBranchLabel (c/w the total number of _visible_ and
  _inView_ tips then display the label */
  if (d.n.tipCount > magicTipFractionToShowBranchLabel * totalTipsInView) {
    return "visible";
  }
  /* if the label is on the root of a subtree then always show it
  (unless the label is "aa" as these can be very long) */
  if (key!=='aa' && (d.n.name===d.n.parent.name || d.n.parent.name==="__ROOT")) {
    return "visible";
  }
  return "hidden";
};

export const updateBranchLabels = function updateBranchLabels(dt) {
  if (!this.groups.branchLabels) {
    return;
  }
  const visibility = createBranchLabelVisibility(
    this.params.branchLabelKey,
    this.params.showAllBranchLabels,
    this.layout,
    this.zoomNode.n.tipCount
  );
  const labelSize = branchLabelSize(this.params.branchLabelKey);
  const fontWeight = branchLabelFontWeight(this.params.branchLabelKey);
  this.groups.branchLabels
    .selectAll(".branchLabel")
    .transition().duration(dt)
    .attr("x", (d) => d.xTip - 5)
    .attr("y", (d) => d.yTip - this.params.branchLabelPadY)
    .style("visibility", visibility)
    .style("font-weight", fontWeight)
    .style("font-size", labelSize);
  if (!dt) timerFlush();
};

export const removeBranchLabels = function removeBranchLabels() {
  this.params.branchLabelKey = undefined;
  if ("branchLabels" in this.groups) {
    this.groups.branchLabels.selectAll("*").remove();
  }
};

export const drawBranchLabels = function drawBranchLabels(key) {
  /* salient props: this.zoomNode.n.tipCount, this.zoomNode.n.fullTipCount */
  this.params.branchLabelKey = key;
  const labelSize = branchLabelSize(key);
  const fontWeight = branchLabelFontWeight(key);
  const visibility = createBranchLabelVisibility(key, this.params.showAllBranchLabels, this.layout, this.zoomNode.n.tipCount);

  if (!("branchLabels" in this.groups)) {
    this.groups.branchLabels = this.svg.append("g").attr("id", "branchLabels").attr("clip-path", "url(#treeClip)");
  }

  const nodes = (this.params.showStreamTrees ? this.nodes.filter((d) => !d.n.inStream) : this.nodes)
    .filter((d) => d.n.branch_attrs && d.n.branch_attrs.labels && d.n.branch_attrs.labels[key]);

  this.groups.branchLabels
    .selectAll(".branchLabel")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "branchLabel")
    .attr("x", (d) => d.xTip + (this.params.orientation[0] > 0 ? -5 : 5))
    .attr("y", (d) => d.yTip - this.params.branchLabelPadY)
    .style("text-anchor", this.params.orientation[0] > 0 ? "end" : "start")
    .style("visibility", visibility)
    .style("fill", this.params.branchLabelFill)
    .style("font-family", this.params.branchLabelFont)
    .style("font-weight", fontWeight)
    .style("font-size", labelSize)
    .style("pointer-events", "none")
    .text((d) => d.n.branch_attrs.labels[key]);
};

/**
 * A helper factory to create the tip label function.
 * This (returned function) is typically set elsewhere
 * and stored on `this.callbacks.tipLabel` which is used
 * in the `updateTipLabels` function.
 */
export const makeTipLabelFunc = (tipLabelKey) => {
  /* special-case `num_date`. In the future we may wish to examine
  `metadata.colorings` and special case other scale types */
  if (tipLabelKey === "num_date") {
    return (d) => prettifyDate("DAY", numericToDateObject(getTraitFromNode(d.n, "num_date")));
  }
  return (d) => getTraitFromNode(d.n, tipLabelKey);
};
