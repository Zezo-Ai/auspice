import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import ColorBy, {ColorByInfo} from "./color-by";
import DateRangeInputs, {DateRangeInfo} from "./date-range-inputs";
import AnimationControls from "./animation-controls";
import ChooseExplodeAttr from "./choose-explode-attr";
import ChooseBranchLabelling from "./choose-branch-labelling";
import ChooseLayout from "./choose-layout";
import ChooseDataset from "./choose-dataset";
import ChooseSecondTree from "./choose-second-tree";
import ChooseTipLabel from "./choose-tip-label";
import ChooseMetric from "./choose-metric";
import PanelLayout from "./panel-layout";
import GeoResolution from "./geo-resolution";
import TransmissionLines from './transmission-lines';
import NormalizeFrequencies from "./frequency-normalization";
import AnimationOptions from "./animation-options";
import PanelToggles from "./panel-toggles";
import ToggleTangle from "./toggle-tangle";
import Language from "./language";
import { ControlsContainer } from "./styles";
import FilterData, {FilterInfo} from "./filter";
import {TreeOptionsInfo, MapOptionsInfo, AnimationOptionsInfo, PanelOptionsInfo,
  ExplodeTreeInfo, FrequencyInfo, MeasurementsOptionsInfo} from "./miscInfoText";
import { ControlHeader } from "./controlHeader";
import MeasurementsOptions from "./measurementsOptions";
import { RootState } from "../../store";

function Controls() {
  const { t } = useTranslation();

  const panelsToDisplay = useSelector((state: RootState) => state.controls.panelsToDisplay);

  const treeOn = panelsToDisplay.includes("tree");
  const mapOn = panelsToDisplay.includes("map");
  const frequenciesOn = panelsToDisplay.includes("frequencies");
  const measurementsOn = panelsToDisplay.includes("measurements");

  return (
    <ControlsContainer>
      <ChooseDataset />

      <ControlHeader title={t("sidebar:Date Range")} tooltip={DateRangeInfo}/>
      <DateRangeInputs />
      <AnimationControls />

      <ControlHeader title={t("sidebar:Color By")} tooltip={ColorByInfo}/>
      <ColorBy />

      <ControlHeader title={t("sidebar:Filter Data")} tooltip={FilterInfo}/>
      <FilterData measurementsOn={measurementsOn} />

      {treeOn &&
        <span>
          <ControlHeader title={t("sidebar:Tree Options")} tooltip={TreeOptionsInfo}/>
          <ChooseLayout />
          <ChooseMetric />
          <ChooseBranchLabelling />
          <ChooseTipLabel />
          <ChooseSecondTree />
          <ChooseExplodeAttr tooltip={ExplodeTreeInfo} />
          <ToggleTangle />
        </span>
      }

      {measurementsOn &&
        <span style={{ marginTop: "10px" }}>
          <ControlHeader title={t("sidebar:Measurements Options")} tooltip={MeasurementsOptionsInfo}/>
          <MeasurementsOptions />
        </span>
      }

      {mapOn &&
        <span style={{ marginTop: "10px" }}>
          <ControlHeader title={t("sidebar:Map Options")} tooltip={MapOptionsInfo}/>
          <GeoResolution />
          <TransmissionLines />
        </span>
      }

      {frequenciesOn &&
        <span style={{ marginTop: "10px" }}>
          <ControlHeader title={t("sidebar:Frequency Options")} tooltip={FrequencyInfo}/>
          <NormalizeFrequencies />
        </span>
      }

      <span style={{ marginTop: "10px" }}>
        <ControlHeader title={t("sidebar:Animation Options")} tooltip={AnimationOptionsInfo}/>
        <AnimationOptions />
      </span>

      <span style={{ paddingTop: "10px" }} />
      <ControlHeader title={t("sidebar:Panel Options")} tooltip={PanelOptionsInfo}/>
      <PanelLayout />
      <PanelToggles />

      <span style={{ paddingTop: "10px" }} />
      <ControlHeader title={t("sidebar:Language")}/>
      <Language />
    </ControlsContainer>
  );
}

export default Controls;
