import React from "react";
import { withTheme } from 'styled-components';
import * as icons from "../framework/svg-icons";
import { NODE_VISIBLE, nucleotide_gene } from "../../util/globals";
import { materialButton } from "../../globalStyles";
import * as helpers from "./helperFunctions";
import { getFullAuthorInfoFromNode } from "../../util/treeMiscHelpers";
import { getNumSelectedTips } from "../../util/treeVisibilityHelpers";
import { getDatasetNamesFromUrl } from "../../actions/loadData";

const RectangularTreeIcon = withTheme(icons.RectangularTree);
const PanelsGridIcon = withTheme(icons.PanelsGrid);
const MetaIcon = withTheme(icons.Meta);
const DatasetIcon = withTheme(icons.Dataset);
const iconWidth = 25;

/**
 * A React Component displaying buttons which trigger data-downloads. Intended for display within the
 * larger Download modal component
 */
export const DownloadButtons = ({dispatch, t, tree, entropy, metadata, colorBy, distanceMeasure, panelsToDisplay, panelLayout, visibility, relevantPublications}) => {
  const totalTipCount = metadata.mainTreeNumTips;
  const selectedTipsCount = getNumSelectedTips(tree.nodes, tree.visibility);
  const partialData = selectedTipsCount !== totalTipCount;
  const filePrefix = getFilePrefix();
  const temporal = distanceMeasure === "num_date";

  /* set gisaidProvenance based on supplied JSON metadata */
  const gisaidProvenance = (metadata?.dataProvenance || []).filter((el) => el.name.toUpperCase()==='GISAID').length>0;
  /* Verify that we can parse dataset name from URL to support Auspice JSON download */
  const datasetNames = getDatasetNamesFromUrl(window.location.pathname);
  const supportAuspiceJsonDownload = !gisaidProvenance && datasetNames.some(Boolean);

  const entropyBar = entropy?.selectedCds===nucleotide_gene ? "nucleotide" : "codon";

  return (
    <>
      <div style={{fontWeight: 500, marginTop: "0px", marginBottom: "20px"}}>
        Downloaded data represents the currently displayed view.
        By zooming the tree, changing the branch-length metric, applying filters etc, the downloaded data will change accordingly.
        <p/>
        NOTE: We do not support downloads of multiple subtrees, which are usually created with the date range filter or genotype filters.
        Downloading multiple subtrees will result in an empty Newick tree!
        <p/>
        {partialData ? `Currently ${selectedTipsCount}/${totalTipCount} tips are displayed and will be downloaded.` : `Currently the entire dataset (${totalTipCount} tips) will be downloaded.`}
      </div>
      {supportAuspiceJsonDownload && (
        <Button
          name="Auspice (Nextstrain) JSON"
          description={`The main Auspice dataset JSON(s) for the current view`}
          icon={<DatasetIcon width={iconWidth} selected />}
          onClick={() => helpers.auspiceJSON(dispatch, datasetNames)}
        />
      )}
      <Button
        name={`${temporal ? 'TimeTree' : 'Tree'} (Newick)`}
        description={`Phylogenetic tree in Newick format with branch lengths in units of ${temporal?'years':'divergence'}.`}
        icon={<RectangularTreeIcon width={iconWidth} selected />}
        onClick={() => helpers.exportTree({isNewick: true, dispatch, filePrefix, tree, temporal})}
      />
      <Button
        name={`${temporal ? 'TimeTree' : 'Tree'} (Nexus)`}
        description={`Phylogeny in Nexus format with branch lengths in units of ${temporal?'years':'divergence'}. Colorings are included as annotations.`}
        icon={<RectangularTreeIcon width={iconWidth} selected />}
        onClick={() => helpers.exportTree({dispatch, filePrefix, tree, colorings: metadata.colorings, colorBy, temporal})}
      />
      {gisaidProvenance ?
        <Button
          name="Acknowledgments (TSV)"
          description={`Per-sample acknowledgments (n = ${selectedTipsCount}).`}
          icon={<MetaIcon width={iconWidth} selected />}
          onClick={() => helpers.acknowledgmentsTSV(dispatch, filePrefix, tree.nodes, tree.visibility)}
        /> :
        <Button
          name="Metadata (TSV)"
          description={`Per-sample metadata (n = ${selectedTipsCount}).`}
          icon={<MetaIcon width={iconWidth} selected />}
          onClick={() => helpers.strainTSV(dispatch, filePrefix, tree.nodes, tree.visibility)}
        />
      }
      {helpers.areAuthorsPresent(tree) && (
        <Button
          name="Author Metadata (TSV)"
          description={`Metadata for ${selectedTipsCount} samples grouped by their ${getNumUniqueAuthors(tree.nodes, tree.visibility)} authors.`}
          icon={<MetaIcon width={iconWidth} selected />}
          onClick={() => helpers.authorTSV(dispatch, filePrefix, tree)}
        />
      )}
      {entropy.loaded && (
        <Button
          name="Genetic diversity data (TSV)"
          description={`The data behind the diversity panel showing ${entropy.showCounts?`a count of changes across the tree`:`normalised shannon entropy`} per ${entropyBar}.`}
          icon={<MetaIcon width={iconWidth} selected />}
          onClick={() => helpers.entropyTSV(dispatch, filePrefix, entropy)}
        />
      )}
      <Button
        name="Screenshot (SVG)"
        description="Screenshot of the current nextstrain display in SVG format; CC-BY licensed."
        icon={<PanelsGridIcon width={iconWidth} selected />}
        onClick={() => helpers.SVG(
          dispatch,
          t,
          metadata,
          tree.nodes,
          visibility,
          getFilePrefix(),
          panelsToDisplay,
          panelLayout,
          relevantPublications
        )}
      />
    </>
  );
};

/**
 * React Component for an individual button
 */
function Button({name, description, icon, onClick}) {
  const buttonTextStyle = Object.assign({}, materialButton, {backgroundColor: "rgba(0,0,0,0)", paddingLeft: "10px", color: "white", minWidth: "300px", textAlign: "left" });
  const buttonLabelStyle = { fontStyle: "italic", fontSize: "14px", color: "lightgray" };
  return (
    <div key={name} onClick={onClick} style={{cursor: 'pointer' }}>
      {icon}
      <button style={buttonTextStyle} name={name}>
        {name}
      </button>
      <div style={{ display: "inline-block", height: "30px", verticalAlign: "top", paddingTop: "6px" }}>
        <label style={buttonLabelStyle} htmlFor={name}>
          {description}
        </label>
      </div>
    </div>
  );
}

function getNumUniqueAuthors(nodes, nodeVisibilities) {
  const authors = new Set(nodes
    .filter((n, i) => nodeVisibilities[i] === NODE_VISIBLE && n.shell.inView)
    .map((n) => getFullAuthorInfoFromNode(n))
    .filter((a) => a && a.value)
    .map((a) => a.value)
  );
  return authors.size;
}

function getFilePrefix() {
  return "nextstrain_" +
    window.location.pathname
        .replace(/^\//, '')       // Remove leading slashes
        .replace(/:/g, '-')       // Change ha:na to ha-na
        .replace(/\//g, '_');     // Replace slashes with spaces
}
