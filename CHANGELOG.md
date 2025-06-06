# Changelog

* Added a `treeZoom=selected` query to load trees at the same zoom level after the "zoom to selected" button has been pressed, where applicable. See [the view settings docs](https://docs.nextstrain.org/projects/auspice/en/latest/advanced-functionality/view-settings.html) for more details. ([#1321](https://github.com/nextstrain/auspice/pull/1321))

## version 2.63.1 - 2025/06/04


* Fixed a bug where datasets without the (optional!) `display_defaults` would crash, which included newick files dragged onto auspice.us. ([#1986](https://github.com/nextstrain/auspice/pull/1986))

## version 2.63.0 - 2025/06/02

* **Streamtrees** are a new visualisation option for displaying phylogenetic trees. They require datasets with labels on internal nodes which we essentially use to partition the nodes of the tree and render each partition as a streamgraph. Such visualisations are useful for conveying relationships between parts of the tree as well as improving performance for very large trees. See the [added documentation](https://docs.nextstrain.org/projects/auspice/en/latest/advanced-functionality/streamtrees.html) for more details. ([#1902](https://github.com/nextstrain/auspice/issues/1902))

* Label URL queries (available when zoomed into a node which has an branch label) are now added in more cases and, when loading the page, we now remove the query if it is not valid. ([#1952](https://github.com/nextstrain/auspice/pull/1952))
* Datasets can define `display_defaults.label` to specify the starting zoom level of a tree, similarly to the `?label=...` URL query. ([#1952](https://github.com/nextstrain/auspice/pull/1952))
* The tree's "Reset Layout" button has been renamed "Zoom to Root". ([#1952](https://github.com/nextstrain/auspice/pull/1952))
* Removed the experimental markers from "Focus on selected" and "Explode Tree By" options. These seem to be working well. ([#1954](https://github.com/nextstrain/auspice/issues/1954))
* Toggling "Focus on selected" now updates the URL parameter `focus=selected`. URLs with this parameter can be shared to enable focus on initial page load. ([#1955](https://github.com/nextstrain/auspice/issues/1955))
* Added Chinese language support. ([#1959](https://github.com/nextstrain/auspice/pull/1959))
* Added flexibility to the way the "Built with …" sentence can be translated. ([#1964](https://github.com/nextstrain/auspice/pull/1964))
* Dropped support for Node.JS versions 16 & 18 and their corresponding NPM versions (7 & 8). ([#1975](https://github.com/nextstrain/auspice/pull/1975))

## version 2.62.0 - 2025/01/21


* Added a new color tree by measurements feature.
  Clicking on a group in the measurements panel will add a new coloring to the tree,
  where the colors represent an average of the measurement values for the matching
  test strain within the selected measurements group.
  For full details, please see [#1924](https://github.com/nextstrain/auspice/pull/1924).
* Dataset authors can display a warning banner at the top of the page by setting `.meta.warning` in the main dataset JSON.
  The warning can be plain text or markdown format.
  This can be incorporated into Nextstrain workflows using `augur export v2 --warning`, available as of Augur version 27.2.0.
  ([#1927](https://github.com/nextstrain/auspice/issues/1927))
* Bugfix: Clicking on the icons for FULL and GRID layout now changes the layout, just like clicking on the text ([#1911](https://github.com/nextstrain/auspice/issues/1911))
* The [1Password browser extension](https://support.1password.com/getting-started-browser/), since roughly late November 2024, has interfered with Auspice views, notably when rendering many visual elements which is often the case with a large number of samples and/or genome size. The 1Password developer team is continuing to investigate the issue. In the meantime, we have applied a workaround to mitigate the effects of the issue on Auspice. ([#1919](https://github.com/nextstrain/auspice/issues/1919))

_Internal changes._

* Added a "Cite this repository" button on the GitHub repo.
  ([#1921](https://github.com/nextstrain/auspice/pull/1921))
* Kept dependencies up to date.
  ([#1443](https://github.com/nextstrain/auspice/pull/1443),
   [#1923](https://github.com/nextstrain/auspice/pull/1923))
* Improved TypeScript usage.
  ([#1910](https://github.com/nextstrain/auspice/pull/1910),
   [#1913](https://github.com/nextstrain/auspice/pull/1913),
   [#1914](https://github.com/nextstrain/auspice/pull/1914),
   [#1915](https://github.com/nextstrain/auspice/pull/1915))
* Improved GitHub Actions usage.
  ([#1916](https://github.com/nextstrain/auspice/pull/1916),
   [#1920](https://github.com/nextstrain/auspice/pull/1920),
   [#1929](https://github.com/nextstrain/auspice/pull/1929))

## version 2.61.2 - 2024/11/19



* Bugfix: Fix errors where the tree wouldn't correctly update certain properties ([#1907](https://github.com/nextstrain/auspice/pull/1907))
* Bugfix: Fix incorrect parsing of root-node dates of 0-99 CE ([#1909](https://github.com/nextstrain/auspice/pull/1909))
* Bugfix: Fix an out-of-sync bug in the Entropy panel where the tooltip text would remain "Shannon entropy" and not update to "Num changes observed" (the value was correct). ([#1906](https://github.com/nextstrain/auspice/pull/1906))


## version 2.61.1 - 2024/11/14

* Bugfix: Restore shift-click behaviour for branches on the tree ([#1901](https://github.com/nextstrain/auspice/pull/1901))

## version 2.61.0 - 2024/11/14


* Error boundaries added for all panels (tree, map etc) so that in the case of uncaught errors we'll now show an error message rather than crashing Auspice. Hopefully these are never observed in production! ([#1897](https://github.com/nextstrain/auspice/pull/1897))
* Bugfix: Auspice would crash in some situations when the entropy panel was scrolled back into view (bug introduced in v2.60.0). ([#1898](https://github.com/nextstrain/auspice/pull/1898))

#### Internal / development changes
* Convert the tree component (and related tree-parsing functions) to TypeScript ([#1864](https://github.com/nextstrain/auspice/pull/1864))

## version 2.60.0 - 2024/11/07

> _Note: this release contains a few rather large bugs and we suggest you upgrade to 2.61.2 or later_

* Performance improvement: We no longer attempt to animate actions on trees with over 4000 tips which results in more responsive interactions. ([#1880](https://github.com/nextstrain/auspice/pull/1880))
* Performance improvement: We no longer recompute the entropy data (which can be expensive) when the entropy panel is toggled off or off-screen. ([#1879](https://github.com/nextstrain/auspice/pull/1879))
* Bugfix: narrative slide changes which removed a filter would not work as expected in some cases ([#1883](https://github.com/nextstrain/auspice/pull/1883))

#### Internal / development changes
* Refactor how the measurement-sidecar JSON is loaded ([#1881](https://github.com/nextstrain/auspice/pull/1881))
* Move jest config to TypeScript  ([#1885](https://github.com/nextstrain/auspice/pull/1885))
* Move jest-puppeteer with Playright  ([#1884](https://github.com/nextstrain/auspice/pull/1884))
* Verbose logging during CI ([#1876](https://github.com/nextstrain/auspice/pull/1876))


## version 2.59.1 - 2024/10/23


* Moved the "Focus on Selected" toggle next to the "Show confidence intervals" toggle.
  ([#1875](https://github.com/nextstrain/auspice/pull/1875))

## version 2.59.0 - 2024/10/22


* Added an experimental "Focus on Selected" toggle in the sidebar.
  When focusing on selected nodes, nodes that do not match the filter will occupy less vertical space on the tree.
  Only applicable to rectangular and radial layouts.
  ([#1373](https://github.com/nextstrain/auspice/pull/1373))

## version 2.58.0 - 2024/09/12


* Fix bug where drag-and-drop metadata columns were no longer included as tip labels ([#1845](https://github.com/nextstrain/auspice/pull/1845))
* Fixed a bug where internal node names were sometimes omitted from the branch info modal (arrived at via shift-clicking on a branch).
  They are now always displayed irrespective of the selected tip label.
  ([#1849](https://github.com/nextstrain/auspice/pull/1849))
* Added URL params for measurements panel controls: m_collection, m_display, m_groupBy, m_overallMean, m_threshold, and mf_*.
  See [docs](https://docs.nextstrain.org/projects/auspice/en/stable/advanced-functionality/view-settings.html#measurements-panel-url-query-options) for more details. ([#1848](https://github.com/nextstrain/auspice/pull/1848))

## version 2.57.0 - 2024/08/30


* Remove hardcoded color scale for LBI ([#1842](https://github.com/nextstrain/auspice/pull/1842))
* Any `node_attr` in the tree can be used as a tip label, as well as the special-cases of strain-name and "none".
  Previously we only allowed valid colorings.
  ([#1668](https://github.com/nextstrain/auspice/pull/1668))
* The specified tip label is surfaced more prominently within the the on-hover info boxes & on-click modals.
  ([#1668](https://github.com/nextstrain/auspice/pull/1668))
* Temporal colour scales can now use YYYY-MM-DD values (previously only numeric dates were allowed).
  Ambiguous (YYYY-MM-XX, YYYY-XX-XX) dates are allowed and the midpoint of the range will be used to choose the colour.
  ([#1832](https://github.com/nextstrain/auspice/pull/1832), [#1836](https://github.com/nextstrain/auspice/pull/1836))
* Parsing and error handling for URL query-encoded dates (`dmin`, `dmax`, `animate`) has been improved.
  ([#1832](https://github.com/nextstrain/auspice/pull/1832))
* Div-only trees (i.e. no timetree) now hide the date / animation sections in the sidebar.
  ([#1834](https://github.com/nextstrain/auspice/pull/1834))
* Improvements to how we use React within the measurements panel (should not result in any user-facing changes).
  ([#1838](https://github.com/nextstrain/auspice/pull/1838))

## version 2.56.1 - 2024/08/22


* Fix bug where app crashed if measurements JSON did not define thresholds ([#1802](https://github.com/nextstrain/auspice/pull/1802))
* Fix bug where measurements display did not honor the default `measurements_display` ([#1802](https://github.com/nextstrain/auspice/pull/1802))
* Only display download-JSON button if the dataset name can be parsed from pathname ([#1804](https://github.com/nextstrain/auspice/pull/1804))
* Fix bug where measurements panel did not display means for measurements that had an "undefined" coloring ([#1827](https://github.com/nextstrain/auspice/pull/1827))
* Measurement panel's x-axis min/max values are now limited by visible measurements ([#1827](https://github.com/nextstrain/auspice/pull/1827))

## version 2.56.0 - 2024/07/01


* We now use the reported confidence / entropy values to change the saturation of tips (circles) on the tree, which matches the behaviour seen for branches. If there is no (or very little) uncertainty in these nodes then the tips will appear the same as seen in previous versions of Auspice. ([#1796](https://github.com/nextstrain/auspice/pull/1796))
* We no longer show the "second tree" sidebar dropdown when there are no available options. The possible options are defined by [the charon/getAvailable API](https://docs.nextstrain.org/projects/auspice/en/stable/server/api.html) response and as such vary depending on the server in use. ([#1795](https://github.com/nextstrain/auspice/pull/1795))


## version 2.55.1 - 2024/06/25


* Small bugfix to the filter badge improvements introduced in v2.55.0 where we incorrectly showed the 2-tree display when viewing a single tree. ([#1794](https://github.com/nextstrain/auspice/pull/1794))

## version 2.55.0 - 2024/06/17


* A number of improvements when viewing multiple trees (tangletrees) ([#1788](https://github.com/nextstrain/auspice/pull/1788))
  * Attributes only present on the RHS tree are now available as filter options, as well as genotypes and node names unique to the RHS tree.
  * Filter badges (shown in the header) now indicate how many matches are present in both trees (formerly only the LHS tree was considered)
  * Branch labels unique to the RHS tree are now available
* remove missing warning when dataset JSON has no `.meta.geo_resolutions` field ([#1791](https://github.com/nextstrain/auspice/pull/1791))
* Add support for Node.js version 22. ([#1779](https://github.com/nextstrain/auspice/pull/1779))

## version 2.54.3 - 2024/06/12


* Minor improvement to the [onlyPanels](https://docs.nextstrain.org/projects/auspice/en/stable/advanced-functionality/view-settings.html#url-query-options) view - we now also hide the panel name and top-border. ([#1790](https://github.com/nextstrain/auspice/pull/1790))

## version 2.54.2 - 2024/06/12

* Tangletrees can now be coloured by genotype (previously such a colouring would only work for the LHS tree). This requires the genome annotation (in the dataset JSON) to be identical across both datasets. This can be especially useful when comparing trees generated from the same sequences or a similar set of sequences in order to understand the differences in tree structure. ([#1785](https://github.com/nextstrain/auspice/pull/1783))
* Bugfix: The legend entries shown for a tangletree may not have shown values only observed in the RHS tree when the dataset was first loaded. ([#1785](https://github.com/nextstrain/auspice/pull/1783))
* Bugfix: Multiple trees ("tanglegrams") now render correctly in Safari. ([#1786](https://github.com/nextstrain/auspice/pull/1786))
* Bugfix: The [onlyPanels](https://docs.nextstrain.org/projects/auspice/en/stable/advanced-functionality/view-settings.html#url-query-options) URL query now hides all parts of the footer, as intended. ([#1787](https://github.com/nextstrain/auspice/pull/1787))

## version 2.54.1 - 2024/06/10

* Fixed a big bug where clicking on tips (and shift-clicking on branches) on the RHS tree in a tanglegram would bring up a modal detailing a node in the LHS tree. ([#1783](https://github.com/nextstrain/auspice/pull/1783))
* Fixed a small bug where branch labels prevented you from hovering on the branch itself, a situation that was more common in tangletrees. ([#1783](https://github.com/nextstrain/auspice/pull/1783))


## version 2.54.0 - 2024/06/06

* Add a link-out to use datasets in Nextclade (this functionality is only enabled when running within the larger nextstrain.org ecosystem.)
This builds on functionality introduced in [Nextclade 3.7.0](https://github.com/nextstrain/nextclade/releases/tag/3.7.0) allowing an Auspice dataset to be used as a nextclade dataset so that users can then add new sequences (via drag-and-drop) and see them placed on the tree. ([#1776](https://github.com/nextstrain/auspice/pull/1776))

## version 2.53.0 - 2024/04/29

* Add a download-JSON button within the downloads modal. This is disabled for GISAID sourced data. ([#1764](https://github.com/nextstrain/auspice/pull/1764))
* Add link-outs to load the current dataset in external platforms MicrobeTrace and Taxonium. Note this functionality only works when Auspice is running within the larger nextstrain.org server. ([#1763](https://github.com/nextstrain/auspice/pull/1763))

_Internal changes._

* Use Nextstrain CLI to create PRs on other repos. ([#1765](https://github.com/nextstrain/auspice/pull/1765))
* Create PRs on projects which depend on Auspice by adding a label ([#1767](https://github.com/nextstrain/auspice/pull/1767) and [#1768](https://github.com/nextstrain/auspice/pull/1768))


## version 2.52.1 - 2024/02/21

* Bugfix: Restore the intended behaviour when hovering or clicking on terminal branches. ([#1753](https://github.com/nextstrain/auspice/pull/1753))

## version 2.52.0 - 2024/02/09

* Sidebar filtering now contains all non-continuous metadata defined across the tree (i.e. all data within `node.node_attrs`). The traits listed in `meta.filters` are now only used to determine which filters to list in the footer of the page. ([#1743](https://github.com/nextstrain/auspice/pull/1743))
* The interaction between strain-selected modals and the corresponding strain-filter has been improved. We now preserve the strain filter state present before the node was clicked. ([#1749](https://github.com/nextstrain/auspice/issues/1749))
* Added a link to this changelog from the Auspice view. ([#1727](https://github.com/nextstrain/auspice/pull/1727))
* Updated "contact us"-type links to point to nextstrain.org/contact. ([#1734](https://github.com/nextstrain/auspice/issues/1734))
* Bugfix: When showing the strain-selected modal, disabling the corresponding filter now clears the modal. ([#1749](https://github.com/nextstrain/auspice/issues/1749))

_Internal changes which should not result in any different behaviour while using Auspice._

* Updates to GitHub actions. ([#1739](https://github.com/nextstrain/auspice/issues/1739), [#1741](https://github.com/nextstrain/auspice/issues/1741))
* Updates to documentation setup. ([#1730](https://github.com/nextstrain/auspice/issues/1730))
* Updates to PR template. ([#1728](https://github.com/nextstrain/auspice/issues/1728))
* Updated and then reverted Webpack configuration ([#1733](https://github.com/nextstrain/auspice/issues/1733), [#1738](https://github.com/nextstrain/auspice/issues/1738))

## version 2.51.0 - 2023/11/16


* Redesigned the panel sections in the sidebar. ([#1704](https://github.com/nextstrain/auspice/pull/1704))
    * Moved panel visibility toggles to the header.
    * Added the ability to show/hide panel options.
* customisation: Renamed `sidebarTheme.unselectedBackground` to a more generic name, `sidebarTheme.alternateBackground`, while keeping backwards compatibility. ([#1704](https://github.com/nextstrain/auspice/pull/1704/commits/1ad4376bb3be9787181110d47fe8c5f26a207896))
* Fixed a bug that prevented the narratives debugger (`/edit/narratives`) from working. ([#1725](https://github.com/nextstrain/auspice/issues/1725))

## version 2.50.0 - 2023/10/30


* Fixed a bug that showed SVG-related errors in the development browser console when viewing a tree in the rectangular layout. ([#1714](https://github.com/nextstrain/auspice/pull/1714))
* Added "Data updated" date under the dataset title, in addition to the existing mention in the footer. ([#1715](https://github.com/nextstrain/auspice/pull/1715))
* Updated docs on customizing the sidebar style with `sidebarTheme`. ([#1718](https://github.com/nextstrain/auspice/pull/1718))

_Internal changes which should not result in any different behaviour while using Auspice._

* Updated Redux usage. ([#1710](https://github.com/nextstrain/auspice/pull/1710), [#1712](https://github.com/nextstrain/auspice/pull/1712))

## version 2.49.0 - 2023/09/28



* Allow the tip label key to be defined in the JSON via `display_defaults.tip_label`, in addition to being settable via a URL query.
See [the docs](https://docs.nextstrain.org/projects/auspice/en/stable/advanced-functionality/view-settings.html) or [PR #1668](https://github.com/nextstrain/auspice/pull/1668) for more.
* Tree-specific options in the sidebar are now hidden when the tree panel is not displayed. ([#1698](https://github.com/nextstrain/auspice/pull/1698))
* Fixed a bug where the radial trees would have their inner grid circles offset. ([#1693](https://github.com/nextstrain/auspice/pull/1693))
* Fixed a bug where SVG export of the entropy panel was invalid. ([#1694](https://github.com/nextstrain/auspice/pull/1694))

_Internal changes which should not result in any different behaviour while using Auspice._

* Read the Docs build config updated. ([#1700](https://github.com/nextstrain/auspice/pull/1700))
* CI improvements. ([#1702](https://github.com/nextstrain/auspice/pull/1702))

## version 2.48.0 - 2023/08/31

* Root sequence data may be inlined in the main dataset JSON
([Auspice PR #1688](https://github.com/nextstrain/auspice/pull/1688) and [Augur PR #1295](https://github.com/nextstrain/augur/pull/1295)).
* Bugfix: Fixes a crash when a dataset without the entropy panel attempted to change colorings. ([#1691](https://github.com/nextstrain/auspice/pull/1691))

## version 2.47.0 - 2023/08/21

* Entropy panel now supports more complex genome architectures and has improved styling.
The JSON schema has been extended to allow segmented CDSs, which allows us to represent CDSs such as those which
wrap the origin (common in HepB), and those with ribosomal slippage (nCoV, EBOV). The visual representation of CDSs
now better conveys overlapping CDSs, both in the lower "nav" axis where CDSs are stacked on top of each other and
in the upper "main" axis where we now view the translations for each CDS individually.
A number of small genotype-related bugs have also been fixed and the internal representation of the genome streamlined.
For full details please see [#1684](https://github.com/nextstrain/auspice/pull/1684), and the schema changes are
detailed in [augur PR #1281](https://github.com/nextstrain/augur/pull/1281).
* Fixed a bug where metadata TSV download was sometimes empty or incomplete, described in [issue #1411](https://github.com/nextstrain/auspice/issues/1411).
([PR #1681](https://github.com/nextstrain/auspice/pull/1681))
* Remove support for Node.js version 14. ([#1674](https://github.com/nextstrain/auspice/pull/1674))
* Add support for Node.js version 20. ([#1673](https://github.com/nextstrain/auspice/pull/1673))

## version 2.46.1 - 2023/06/12


* Fix a number of bugs related to continuous traits:
    * Negative (string) values are now correctly interpreted. See [issue #1626](https://github.com/nextstrain/auspice/issues/1626) and [PR #1655](https://github.com/nextstrain/auspice/pull/1655) for more.
    * Fix legend matching bounds (used when hovering over legend items). See [PR #1657](https://github.com/nextstrain/auspice/pull/1657) for more.
* Dependencies updated. See [PR #1669](https://github.com/nextstrain/auspice/pull/1669) for more.

## version 2.46.0 - 2023/05/15
* Fixed a bug where narratives with multiple datasets that had measurements panels would error when switching datasets. ([#1603](https://github.com/nextstrain/auspice/issues/1603))

_There have been a number of internal changes with this release, most of which should not result in any different behavior while using Auspice._

* Add basic TypeScript support ([#1450](https://github.com/nextstrain/auspice/pull/1450))
* Minor dev docs updates ([#1660](https://github.com/nextstrain/auspice/pull/1660))
* Overhaul of ESLint rules ([#1665](https://github.com/nextstrain/auspice/pull/1665))

## version 2.45.2 - 2023/03/22


* Fixed a bug for continuous color scales where tips with values of zero wouldn't appear on legend-hover or in the frequencies panel.
See [PR #1643](https://github.com/nextstrain/auspice/pull/1643) for more.
* Fixed a bug where downloaded TSVs may have unescaped quotes which resulted in incorrect parsing.
See [PR #1649](https://github.com/nextstrain/auspice/pull/1649) for more.
* Minor documentation updates. See [PR #1638](https://github.com/nextstrain/auspice/pull/1638) for more.

## version 2.45.1 - 2023/03/14

* Small improvements to Auspice documentation. ([#1588](https://github.com/nextstrain/auspice/pull/1588))

## version 2.45.0 - 2023/03/08


* Remove support for Node.js version 12. ([#1560](https://github.com/nextstrain/auspice/pull/1560))
* Add support for Node.js version 18 and NPM version 9. ([#1560](https://github.com/nextstrain/auspice/pull/1560))

## version 2.44.0 - 2023/03/02


* Added support for [Plausible Analytics](https://plausible.io) and deprecated support for Google Analytics. See the [documentation on configuring analytics](https://docs.nextstrain.org/projects/auspice/en/stable/customise-client/api.html#tracking-analytics). ([#1597](https://github.com/nextstrain/auspice/pull/1597))

## version 2.43.0 - 2023/02/07
* Improvements to the measurements panel including multiple thresholds, jitter of raw measurements within color-by groups, and a sticky x-axis. See [PR 1631](https://github.com/nextstrain/auspice/pull/1631).

## version 2.42.0 - 2022/12/15
* You can now turn off tip labels by selecting "none" in the dropdown. See [PR #1618](https://github.com/nextstrain/auspice/pull/1618)
* A bug in the measurements panel was fixed where the mean/SD may disappear. See [PR #1593](https://github.com/nextstrain/auspice/pull/1593)

_There have been a number of internal changes with this release, most of which should not result in any different behavior while using Auspice._

* Upgraded webpack 4 → 5. See [PR #1520](https://github.com/nextstrain/auspice/pull/1520) for more.
* Upgraded lockfile to the npm 7/8 format. See [PR #1602](https://github.com/nextstrain/auspice/pull/1602) for more.
* Webpack cleanups via [PR #1605](https://github.com/nextstrain/auspice/pull/1605)
* Documentation autobuilding via [PR #1609](https://github.com/nextstrain/auspice/pull/1609)
* Spelling fixes ([PR #1619](https://github.com/nextstrain/auspice/pull/1619), [PR #1620](https://github.com/nextstrain/auspice/pull/1620))

## version 2.41.0 - 2022/11/10
* A narratives debugger has been added at `/edit/narratives`.
See [PR #1590](https://github.com/nextstrain/auspice/pull/1590) or the new [Narratives Tutorial](https://docs.nextstrain.org/en/latest/tutorials/narratives-how-to-write.html) for more details.
Note: this functionality will prevent auspice from viewing a _dataset_ JSON named `edit_narratives.json`.


## version 2.40.1 - 2022/11/07
* Fixed a bug where downloaded Newick trees may be empty - often this happens when there is no newick representation for the tree being displayed and in these cases a warning notification is shown. See [PR #1591](https://github.com/nextstrain/auspice/pull/1591) for more.
* Fixed a bug where branch labels prevented clicking on the underlying branches. See [PR #1584](https://github.com/nextstrain/auspice/pull/1584) for more.

## version 2.40.0 - 2022/10/21
* Keep the measurements panel's color-by means in a stable order while filtering. See [PR #1566](https://github.com/nextstrain/auspice/pull/1566) for more.
* Allow setting the "show all branch labels" toggle via the URL query `?showBranchLabels=all`. See [PR #1575](https://github.com/nextstrain/auspice/pull/1575) for more.
* Fix a bug where ordinal scales wouldn't be colored correctly in the frequency pane. See [Issue #843](https://github.com/nextstrain/auspice/issues/843) and [PR #1578](https://github.com/nextstrain/auspice/pull/1578) for more.
* The legend can no longer have duplicate entries (both for user provided color scales and for continuous scales), which also prevents the display bug where legend items may be overlapping when switching to a different coloring. See issues [#1521](https://github.com/nextstrain/auspice/issues/1521) and [#1547](https://github.com/nextstrain/auspice/issues/1547), and [PR 1576](https://github.com/nextstrain/auspice/pull/1576).
* Re-enable temporal confidence bars for trees which include this data. See [PR #1577](https://github.com/nextstrain/auspice/pull/1577) for more.

## version 2.39.0 - 2022/10/06
* A range of improvements to the measurements panel including reference sera coloring
and more informative tooltips. See [PR 1557](https://github.com/nextstrain/auspice/pull/1557) for more.
* Color-by genotype dropdown: nuc (nucleotide) is now the first item in the list.
See [PR 1550](https://github.com/nextstrain/auspice/pull/1550) for more.
* Fixed a bug where zooming out one level would instead jump multiple levels.
See [PR 1552](https://github.com/nextstrain/auspice/pull/1552) for more.
* Added a toggle to force the display of all branch labels, rather than only those meeting
a certain threshold. See [PR 1554](https://github.com/nextstrain/auspice/pull/1554) for more.
* Install documentation updated. See [PR 1551](https://github.com/nextstrain/auspice/pull/1551) for more.


## version 2.38.0 - 2022/09/16
* Mutations now separate out "undeletions" & add information on what the categories represent.
See [PR 1542](https://github.com/nextstrain/auspice/pull/1542) for more.
* Bugfix where certain GISAID accessions may cause a crash when clicked.
See [PR 1531](https://github.com/nextstrain/auspice/pull/1531) for more.
* Duplicate / missing node names now emit a warning to the console, not an error.
See [PR 1543](https://github.com/nextstrain/auspice/pull/1543) for more.

#### Internal (Nextstrain-related) changes
* Documentation theme added. See [PR 1535](https://github.com/nextstrain/auspice/pull/1535) for more.
* Bioconda rebuild instructions added. See [PR 1539](https://github.com/nextstrain/auspice/pull/1539) for more.
* Minor docs formatting fixes. See [PR 1533](https://github.com/nextstrain/auspice/pull/1533) for more.


## version 2.37.3 - 2022/06/16
* Allow temporal colour scales.
See [PR 1523](https://github.com/nextstrain/auspice/pull/1523) for more.
* Change ordering of sidebar tree options.
See [PR 1524](https://github.com/nextstrain/auspice/pull/1524) for more.
* (Docs) Corrected note about CORS.
See [PR 1525](https://github.com/nextstrain/auspice/pull/1525) for more.
* (Internal) Automated how we make GitHub releases.
See [PR 1518](https://github.com/nextstrain/auspice/pull/1518) for more.

## version 2.37.2 - 2022/05/27
* Allow trees with duplicate node names / missing node names (but raise an error in the console).
See [PR 1514](https://github.com/nextstrain/auspice/pull/1514) for more.
* Fix a bug where the right hand side of the tree could disappear.
See [PR 1513](https://github.com/nextstrain/auspice/pull/1513) for more.

## version 2.37.1 - 2022/05/11
* Ensure legend colours are exactly the same as the tip colours.
See [PR 1506](https://github.com/nextstrain/auspice/pull/1506) for more.
* Always show branch labels if they are the root of a subtree.
See [PR 1503](https://github.com/nextstrain/auspice/pull/1503) for more.
* Docs improvements. See [PR 1507](https://github.com/nextstrain/auspice/pull/1507) for more.
* CI improvements. See [PR 1505](https://github.com/nextstrain/auspice/pull/1505) for more.

## version 2.37.0 - 2022/04/28
* Improved footer styling of tables.
See [PR 1502](https://github.com/nextstrain/auspice/pull/1502) for more.
* Branch labels are now shown/hidden depending according to the proportion of visible tips they define.
See [PR 1501](https://github.com/nextstrain/auspice/pull/1501) for more.

## version 2.36.0 - 2022/03/28

### Functional improvements

* Dynamically update regression lines to reflect filtered data.
See [PR 1484](https://github.com/nextstrain/auspice/pull/1484) for more.
* Scatterplot axes can now use "node-order" which is the order nodes appear on the rectangular tree.
See [PR 1494](https://github.com/nextstrain/auspice/pull/1494) for more.
* Show an "experimental" icon and on-hover info text for the explode-tree functionality.
See [PR 1486](https://github.com/nextstrain/auspice/pull/1486) for more.
* You can now use the escape key to remove a tip/branch info modal over the tree.
See [PR 1485](https://github.com/nextstrain/auspice/pull/1485) for more.

### Bugfixes

* Drag-n-drop metadata now works for the second tree.
See [PR 1489](https://github.com/nextstrain/auspice/pull/1489) for more.
* Available filters are now correct when switching from a narrative to exploding the data.
See [PR 1493](https://github.com/nextstrain/auspice/pull/1493) for more.
* The auspice server only accepts valid sidecar file types.
See [PR 1495](https://github.com/nextstrain/auspice/pull/1495) for more.

## version 2.35.0 - 2022/03/16
* Upgrade how we render dropdown menus, which greatly improves the display of long options (e.g. submitting labs).
See [PR 1482](https://github.com/nextstrain/auspice/pull/1482) for more.


## version 2.34.1 - 2022/03/08
* (Minor change) expose functions for use in auspice.us. See [PR 1478](https://github.com/nextstrain/auspice/pull/1478) for more.

## version 2.34.0 - 2022/03/02

#### Major changes
* Measurements panel intended for displaying titer or DMS data where a tip in the tree has multiple values associated with it.
This function requires a dataset with a `_measurements.json` sidecar file
See [PR 1452](https://github.com/nextstrain/auspice/pull/1452) for more.

#### Minor changes
* Improved YAML parsing for narratives
See [PR 1472](https://github.com/nextstrain/auspice/pull/1472) for more.
* Remove unused properties from tip-frequencies panel.
See [PR 1471](https://github.com/nextstrain/auspice/pull/1471) for more.
* Fixed a bug where shift+clicking on branches for trees without mutations defined caused a crash.
See [PR 1475](https://github.com/nextstrain/auspice/pull/1475) for more.



## version 2.33.0 - 2022/02/15

* (Experimental) Explode phylogeny into subtrees and allow multiple trees to be provided in the dataset.
See [PR 1442](https://github.com/nextstrain/auspice/pull/1442) for more.
* Categorise mutations to better understand sequence changes on branches and tips.
See [PR 1449](https://github.com/nextstrain/auspice/pull/1449) for more.
* Add a datepicker to allow precise changes to the selected date range.
See [PR 1412](https://github.com/nextstrain/auspice/pull/1412) for more.
* Allow build-time customizable fine print.
See [PR 1448](https://github.com/nextstrain/auspice/pull/1448) for more.
* Remove scrollbar in panels when no scrolling is possible
See [PR 1439](https://github.com/nextstrain/auspice/pull/1439) for more.
* Allow searching in the color-by dropdown.
See [PR 1456](https://github.com/nextstrain/auspice/pull/1456) for more.

There have also been internal changes related to how we run CI. These should not affect using Auspice as a library / CLI.

## version 2.32.1 - 2021/11/11
* Fix URL parsing to allow the string "narratives" to be in a dataset without it being interpreted as a narrative itself.
See [PR 1428](https://github.com/nextstrain/auspice/pull/1428) for more.

## version 2.32.0 - 2021/10/20

* Tree info boxes are now improved, and you can shift+click on a branch to see more information about that branch.
See [PR 1420](https://github.com/nextstrain/auspice/pull/1420) for more.
* Filters in footer are now expandable to improve usability and discoverability of the true footer.
See [PR 1414](https://github.com/nextstrain/auspice/pull/1414) for more.
* Fixed a bug with CSV (drag & drop) parsing. See [PR 1401](https://github.com/nextstrain/auspice/pull/1401) for more.
* Removed unnecessary postinstall step. See [PR 1419](https://github.com/nextstrain/auspice/pull/1419) for more.
* Improved image sizing in narratives. See [PR 1408](https://github.com/nextstrain/auspice/pull/1408) for more.
* Improved documentation around how to build auspice documentation!


## version 2.31.0 - 2021/09/16
* Improvements to our ability to zoom out in a tree, both by exposing the root branch and via a new icon next to "Zoom to Selected".
See [PR 1392](https://github.com/nextstrain/auspice/pull/1392) for more.

## version 2.30.0 - 2021/09/07

* Narratives can now load sidecar files and second trees.
This allows allowing frequency panel display, colouring by root-sequence, and tanglegrams.
See [PR 1305](https://github.com/nextstrain/auspice/pull/1305) for more.
* Excel (`.xlsx`) files can be used as additional metadata for drag-and-drop.
See [PR 1386](https://github.com/nextstrain/auspice/pull/1386) for more.
* Trees are now clipped to improve axes visibility.
See [PR 1383](https://github.com/nextstrain/auspice/pull/1383) for more.
* Improved accession URL creation.
See [PR 1382](https://github.com/nextstrain/auspice/pull/1382) for more.
* minor documentation improvements.

## version 2.29.1 - 2021/07/16

* Update TravisCI script to improve how we publish Auspice to npm.
See [PR 1380](https://github.com/nextstrain/auspice/pull/1380) for more.

## version 2.29.0 - 2021/07/15

**Note: this version may not install from npm. Please use v2.29.1 instead**

* Branch labels are no longer displayed if the branch is not in the selected view.
See [PR 1370](https://github.com/nextstrain/auspice/pull/1370) for more.
* Clicking on a tip and then closing the info-box will result in that tip remaining as a inactivated filter.
See [PR 1372](https://github.com/nextstrain/auspice/pull/1372) for more.
* Category filters in the sidebar can now be used to inactivate all active filters in a category, and if all are inactive then this may be used to re-activate them all.
See [PR 1371](https://github.com/nextstrain/auspice/pull/1371) for more.
* On-hover tooltip widths are improved for the tree. See [PR 1375](https://github.com/nextstrain/auspice/pull/1375) for more.
* [bugfix] Colour scales can now have 37 values. See [PR 1355](https://github.com/nextstrain/auspice/pull/1355) for more.

#### Minor updates
* Docs updates
* Updated files fetched by `npm run get-data`

## version 2.28.0 - 2021/07/05

* Remove ability to download metadata TSV from GISAID datasets. Replace with acknowledgments TSV. See [PR 1366](https://github.com/nextstrain/auspice/pull/1366).
* Cleanup header fields when downloading metadata TSV, including switch to use name (eg `pango_lineage`) instead of title (eg `PANGO lineage`). See [PR 1367](https://github.com/nextstrain/auspice/pull/1367).
* Update styling of footer text. See [PR 1364](https://github.com/nextstrain/auspice/pull/1364).

## version 2.27.0 - 2021/06/05

* Adjust greyscale colour ramp.
See [PR 1353](https://github.com/nextstrain/auspice/pull/1353) for more.
* (Bugfix) Fixed the situation where the regression toggle would not appear for clock layouts.
See [PR 1352](https://github.com/nextstrain/auspice/pull/1352) for more.

## version 2.26.0 - 2021/05/25
* Scatterplot improvements:
  * Non-continuous variables can now be used, which allows all colourings (including Genotype, if that's the current colouring) to be scatterplot variables.
  * Jittering is applied when the spacing between axis variables is more than 50 pixels.
  * See [PR 1346](https://github.com/nextstrain/auspice/pull/1346) for more.
* Normalized frequency values now tend to zero in the absence of data.
See [PR 1325](https://github.com/nextstrain/auspice/pull/1325) for more.
* Colour scale improvements:
  * Continuous colourings can provide a scale, which we interpolate between to get the colour scheme
  * Custom legend data can be provided, including display text and, for continuous variables, bounds to map legend entries to values in the data.
  * Displayed legend entires may be restricted by specifying them in the dataset JSON.
  * See [PR 1340](https://github.com/nextstrain/auspice/pull/1340) for more.
* Filtering via the sidebar UI now returns options which match each of the space-separated queries, rather than requiring an exact match of the query.
See [PR 1344](https://github.com/nextstrain/auspice/pull/1344) for more.
* Legend text now takes the maximum available space.
See [PR 1328](https://github.com/nextstrain/auspice/pull/1328) for more.

## version 2.25.1 - 2021/04/07
* Bugfix for cases where certain interactions with scatterplot variables would cause auspice to crash.
See [PR 1332](https://github.com/nextstrain/auspice/pull/1332) for more.


## version 2.25.0 - 2021/03/31

* Scatterplots are now available as a tree layout.
These allow graphs to be created between any two continuous traits (colourings), similar to the "clock" layout but with user-definable variables
Branches and regression lines can be toggled on/off, and nodes which do not define valid values for both variables will be hidden.
Note that the regression line is calculated with a free intercept, which differs from the clock view where we force it to pass through the root.
See [PR 1310](https://github.com/nextstrain/auspice/pull/1310) and [PR 1326](https://github.com/nextstrain/auspice/pull/1326) for more.
* Datasets may now define "data provenance" which will be rendered in the byline.
See [PR 1313](https://github.com/nextstrain/auspice/pull/1313) for more.
* Names within the filtering UI now use the metadata-provided title, which is clearer.
See [PR 1327](https://github.com/nextstrain/auspice/pull/1327) for more.
* Frequency rounding is improved for small values.
See [PR 1301](https://github.com/nextstrain/auspice/pull/1301) for more.
* Node traits may define a URL which will result in the value being displayed as a link.
See [PR 1308](https://github.com/nextstrain/auspice/pull/1308) for more.
* A bug was fixed which caused some datasets to crash auspice when metadata files were dragged on.
See [PR 1319](https://github.com/nextstrain/auspice/pull/1319) for more.

## version 2.24.1 - 2021/03/19

* [bugfix] Fixes a bug introduced in v2.24.0 where certain datasets wouldn't load

## version 2.24.0 - 2021/03/17

* Frequencies are no longer normalized when the data is lacking.
See [PR 1278](https://github.com/nextstrain/auspice/pull/1278) for more.
* Fixed a stack size bug, which mainly affected the TB dataset on certain browsers.
See [PR 1293](https://github.com/nextstrain/auspice/pull/1293) for more.
* Root-to-tip mutations are now displayed in the tip-clicked info box.
See [PR 1280](https://github.com/nextstrain/auspice/pull/1280) for more.
* Datasets may now define the default language.
See [PR 1303](https://github.com/nextstrain/auspice/pull/1303) for more.
* Polish language added.
See [PR 1288](https://github.com/nextstrain/auspice/pull/1288) for more.
* Tips in the tree should no longer be obscured behind the legend.
See [PR 1302](https://github.com/nextstrain/auspice/pull/1302) for more.
* Dates BCE are now correctly displayed in the phylogeny axis.
See [PR 1297](https://github.com/nextstrain/auspice/pull/1297) for more.


## version 2.23.0 - 2021/01/28
* [feature] Implement genotype filtering.
The sidebar, typing-based filter UI now includes genotypes (for datasets which define mutations on branches).
See [PR 1265](https://github.com/nextstrain/auspice/pull/1265) for more.
* [bugfix] Update how we generate the bundle hashes as the fix introduced in v2.22.2 was insufficient.
See [PR 1272](https://github.com/nextstrain/auspice/pull/1272) for more.

## version 2.22.2 - 2021/01/14
* [bugfix] Updated how we generate hashes for the transpiled, chunked client bundles.
This prevents subtle bugs where bundles could have the same hash, but different contents, and thus stale (browser cached) chunks may be used in certain situations.
This bug most probably arose in v2.22.0, so please update to this version if possible!
See [PR 1263](https://github.com/nextstrain/auspice/pull/1263) for more.

## version 2.22.1 - 2021/01/13
* Updated package-lock JSON file

## version 2.22.0 - 2021/01/11

* The address Auspice uses to fetch map tiles, including the API token, has been updated and will now only work for local installs of auspice.
For help on how to specify your own address, which lets you specify custom map tile sets, see [the Auspice docs](https://docs.nextstrain.org/projects/auspice/en/stable/customise-client/api.html#specifying-the-api-server-address).
See [PR 1261](https://github.com/nextstrain/auspice/pull/1261) for more.
* Animation controls have moved and are now in the sidebar, underneath the date-slider.
See [PR 1262](https://github.com/nextstrain/auspice/pull/1262) for more.
* The footer has been updated to streamline the Nextstrain accreditation and now displays "Powered by Nextstrain".
If you are serving your own version of auspice we ask for this accreditation to remain be maintained, in keeping with the spirit of scientific citations.
Please also remember that customised version of auspice must make their source code available, as per Auspice's licence.
See [PR 1260](https://github.com/nextstrain/auspice/pull/1260) for more.

## version 2.21.0 - 2021/01/06

### Improved Functionality

* Tree rendering and zooming has been improved.
  * A new **Zoom to Selected** button has been added which allows you to zoom the tree to the clade containing the currently selected tips ([PR 1257](https://github.com/nextstrain/auspice/pull/1257)).
  * Branches ancestral to the common ancestor of the currently selected tips are now correctly rendered ([PR 1248](https://github.com/nextstrain/auspice/pull/1248)).
* The **Download Data** functionality has been improved to export data reflecting the currently viewed subset of data.
Additionally we export annotated Nexus trees which can be parsed by [FigTree](http://tree.bio.ed.ac.uk/software/figtree/).
See [PR 1245](https://github.com/nextstrain/auspice/pull/1245) for more.
* The **drag & drop metadata** functionality has been improved to facilitate easier filtering, custom locations and colours.
See [PR 1244](https://github.com/nextstrain/auspice/pull/1244) or [these docs](https://docs.nextstrain.org/projects/auspice/en/latest/advanced-functionality/drag-drop-csv-tsv.html) for more.
* **Tip labels** are now user-selectable via a drop-down in the sidebar.
See [PR 1246](https://github.com/nextstrain/auspice/pull/1246) for more.
* **Legend values** now dynamically update to reflect those in the current view.
See [PR 1250](https://github.com/nextstrain/auspice/pull/1250) for more.


#### Other Changes

* Italian translation added. See [PR 1256](https://github.com/nextstrain/auspice/pull/1256).
* Amino acid labels are only shown on branches leading to big clades.
See [PR 1249](https://github.com/nextstrain/auspice/pull/1249) for more.
* Colour scale generation has been refactored and a (rare) bug fixed where color-bys which defined a scale in the JSON could cause tips with no trait value set to have a colour rather than a shade of grey.
See [PR 1237](https://github.com/nextstrain/auspice/pull/1237).
* Warnings added to documentation pages which are imported into Nextstrain's (main) RTD project.
See [PR 1234](https://github.com/nextstrain/auspice/pull/1234).
* Disabled a smoke-test which was stochastically failing on GitHub Actions (but which worked locally).
See [PR 1258](https://github.com/nextstrain/auspice/pull/1258) for more.



## version 2.20.1 - 2020/11/19
* Small bugfixes and performance improvements relating to to the features introduced in 2.20.0

## version 2.20.0 - 2020/11/18

See [PR 1200](https://github.com/nextstrain/auspice/pull/1200).
* Add on-hover tooltips to the sidebar to better convey the functionality available.
See [PR 1200](https://github.com/nextstrain/auspice/pull/1200).
* Improve how we space temporal grid lines (phylogeny & frequencies panels).
See [PR 1229](https://github.com/nextstrain/auspice/pull/1229).
* Fix a bug in how we detected HTTP status codes.
See [PR 1226](https://github.com/nextstrain/auspice/pull/1226).
* Auspice documentation is now switched to the Read The Docs platform, and available at https://docs.nextstrain.org/projects/auspice.
Redirects have been added for the old GitHub pages site, and can be found in the [redirect-documentation](https://github.com/nextstrain/auspice/tree/redirect-documentation) branch.
See [PR 1220](https://github.com/nextstrain/auspice/pull/1220).


## version 2.19.0 - 2020/10/07
* The auspice client now makes a request for the root-sequence JSON, which allows colouring of the tree by genotypes where there are no mutations.
See [PR 1197](https://github.com/nextstrain/auspice/pull/1197).
* polyfill `Promise` to avoid crashes in old browsers.
See [PR 1217](https://github.com/nextstrain/auspice/pull/1217).


## version 2.18.4 - 2020/09/28
* (Bugfix) Update dependencies to restore behavior of the leaflet-scroll overlay.
See [nextstrain.org PR #223](https://github.com/nextstrain/nextstrain.org/issues/223) for context, implemented in [PR 1214](https://github.com/nextstrain/auspice/pull/1214)

## version 2.18.3 - 2020/09/22
This version reverts the change to URL parsing introduced in 2.18.2 which broke Auspice on Safari (and perhaps other browsers).

## version 2.18.2 - 2020/09/19
* (Bugfix) Ensure generated SVG ids are escaped correctly. See [PR 1209](https://github.com/nextstrain/auspice/pull/1209).
* Improve parsing of auspice URLs with colon characters in the pathname. See [PR 1210](https://github.com/nextstrain/auspice/pull/1210).

## version 2.18.1 - 2020/08/07
* Add between-paragraph padding for text rendering in (non-mobile) narratives.

## version 2.18.0 - 2020/08/03
* Parse narratives client side.
See [PR 1193](https://github.com/nextstrain/auspice/pull/1193) and [PR 1172](https://github.com/nextstrain/auspice/pull/1172).
This shifts the default client behavior to request a narrative in markdown format and parse it client-side.
The server still retains the ability to parse narratives server-side and return narratives in JSON format, so there are no breaking changes.

* Narratives can now contain multiple datasets.
See [PR 1193](https://github.com/nextstrain/auspice/pull/1193), [PR 1176](https://github.com/nextstrain/auspice/pull/1176) and [PR 1164](https://github.com/nextstrain/auspice/pull/1164).
Narrative slides may now define their own unique datasets, with datasets preemptively fetched and cached to improve performance.
Invalid datasets will show an error notification and fallback to the dataset defined by the frontmatter of the narrative.

* (Bugfix) Zooming in the entropy panel by using shift/option + mouseWheel now appropriately updates the URL query.
See [PR 1188](https://github.com/nextstrain/auspice/pull/1188)

* (Bugfix) The animation occuring when zooming the phylogeny is now restored.
See [PR 1192](https://github.com/nextstrain/auspice/pull/1192)

## version 2.17.4 - 2020/07/21
* (Bugfix) Improve parsing of narrative files where a regex on a large string (e.g. image encoded as a blob) would hang the server

## version 2.17.3 - 2020/07/14
* (Bugfix) Allow `auspice view` to serve custom auspice client if one exists.
See [PR 1182](https://github.com/nextstrain/auspice/pull/1182).


## version 2.17.2 - 2020/07/13
* (Bugfix) Send error messages in the (HTTP) response body, not the status line.
See [PR 1181](https://github.com/nextstrain/auspice/pull/1181).


## version 2.17.1 - 2020/06/25
* (Bugfix) Metadata from drag-and-drop CSVs now shows up in the color-by menu.
See [PR 1177](https://github.com/nextstrain/auspice/pull/1177).

## version 2.17.0 - 2020/06/19
* You can now toggle whether the data in the frequencies panel is normalized.
See [PR 1158](https://github.com/nextstrain/auspice/pull/1158).
* You can now set the starting state of the transmissions-line toggle via the JSON or a URL query.
See [PR 1152](https://github.com/nextstrain/auspice/pull/1152) and [PR 1165](https://github.com/nextstrain/auspice/pull/1129).
* Improve the caching settings for the auspice server.
See [PR 1146](https://github.com/nextstrain/auspice/pull/1146).
* The performance of Auspice is improved when transmission lines are not rendered.
See [PR 1153](https://github.com/nextstrain/auspice/pull/1153).
* The "narratives" folder is now part of this repo and contains a number of test narratives.
See [PR 1170](https://github.com/nextstrain/auspice/pull/1170) for more details.
* A bug was fixed where narrative slides would sometimes fail to update the tree as expected.
See [PR 1169](https://github.com/nextstrain/auspice/pull/1169).
* A bug was fixed where loading a tree zoomed to a clade would prevent zooming out.
See [PR 1156](https://github.com/nextstrain/auspice/pull/1156).
* A bug was fixed where numeric branch labels couldn't be used as URL queries.
See [PR 1157](https://github.com/nextstrain/auspice/pull/1157).
* The list of allowed nodejs versions was expanded.
See [PR 1166](https://github.com/nextstrain/auspice/pull/1166).

## version 2.16.0 - 2020/05/29

#### Features
* Drastically improve how we bundle our JavaScript to improve loading times and allow more stable caching.
[See PR 1126](https://github.com/nextstrain/auspice/pull/1126) for more.
* Add a toggle for whether or not to show transmission lines on the map.
[See PR 1147](https://github.com/nextstrain/auspice/pull/1147) and [PR 1103](https://github.com/nextstrain/auspice/pull/1147) for more.
* Dynamically adjust deme circle size on the map when filtering.
[See PR 1135](https://github.com/nextstrain/auspice/pull/1135) for more.
* Allow the genomic diversity data (the data behind the entropy panel) to be downloaded as a TSV.
[See PR 1144](https://github.com/nextstrain/auspice/pull/1144) for more.
* When running the auspice server incomplete URLs can now be expanded by the server.
[See PR 1129](https://github.com/nextstrain/auspice/pull/1129) for more.


#### Other
* Temporarily disable integration tests from the GitHub CI. [See PR 1148](https://github.com/nextstrain/auspice/pull/1148) for more.
* Add a CC-BY license for the downloaded SVG (screenshots) . [See PR 1140](https://github.com/nextstrain/auspice/pull/1140) for more.
* Improvement in code which decides which footers to show.
[See PR 1118](https://github.com/nextstrain/auspice/pull/1118) for more.
* Documentation improvements -- see [PR 1127](https://github.com/nextstrain/auspice/pull/1127) for more.
* Fix an error in map positioning in some narrative slides. [See PR 958](https://github.com/nextstrain/auspice/pull/958) for more.
* Rename test snapshots for Windows support. [See PR 1122](https://github.com/nextstrain/auspice/pull/1122) for more.
* Certain errors preventing the server from running are now caught & helpful messages printed.
[See PR 1140](https://github.com/nextstrain/auspice/pull/1112) for more.

## version 2.15.0 - 2020/05/06

* Render "nice" dates for the frequency graph. [See PR 1096](https://github.com/nextstrain/auspice/pull/1096) for more.
* Allow SVG in narrative markdown. [See PR 1087](https://github.com/nextstrain/auspice/pull/1087) for more.
* Arabic translation. [See PR 1107](https://github.com/nextstrain/auspice/pull/1107) for more.
* CSS fixes. See [PR 1092](https://github.com/nextstrain/auspice/pull/1094) and [PR 1094](https://github.com/nextstrain/auspice/pull/1094) for more.


## version 2.14.0 - 2020/04/24

#### Testing
* Add screenshot integration testing using puppeteer and jest-image-snapshot, and run this through the GitHub CI.
[See PR 1068](https://github.com/nextstrain/auspice/pull/1068) & [PR 1084](https://github.com/nextstrain/auspice/pull/1084)

#### Features
* Turkish translation. [See PR 1079](https://github.com/nextstrain/auspice/pull/1079)

#### Bug fixes
* Tip labels are now rendered below tips. [See PR 1069](https://github.com/nextstrain/auspice/pull/1069)
* The included server now uses the appropriate content-type for datasets returned from the `getDataset` API.
[See PR 1080](https://github.com/nextstrain/auspice/pull/1080)

#### Other
* We now use `git-lfs` for storing large objects.
Currently this is only the screenshot images used for testing.
[See PR 1083](https://github.com/nextstrain/auspice/pull/1083)
* Update the datasets fetched by `npm run get-data`. [See PR 1088](https://github.com/nextstrain/auspice/pull/1088)


## version 2.13.0 - 2020/04/20

#### Testing
* Add smoke-testing to check that certain URLs render by checking the presence of strings in the DOM.
This is a big step towards a comprehensive testing suite in Auspice.
[See PR 1057](https://github.com/nextstrain/auspice/pull/1057)
* Add GitHub CI workflow to run tests etc automatically on PRs.
[See PR 1046](https://github.com/nextstrain/auspice/pull/1059)
* Add bundle size checks to the CI.
[See PR 1069](https://github.com/nextstrain/auspice/pull/1069)

#### Features
* Allow the display of URL confidences to be set by a URL query (`?ci`).
This will allow narratives to render slides with the CI displayed.
[See PR 1046](https://github.com/nextstrain/auspice/pull/1046)
* Add the ability to export per-strain metadata of only those strains currently being displayed.
[See PR 1067](https://github.com/nextstrain/auspice/pull/1067)
* Move to using `react-icons` which allows the removal of the font-awesome CSS.
This improves ease-of-use and reduces the bundle size.
[See PR 1065](https://github.com/nextstrain/auspice/pull/1065), [PR 1041](https://github.com/nextstrain/auspice/pull/1041)
& [PR 1073](https://github.com/nextstrain/auspice/pull/1073)
* Improve rendering of the narrative cover slide and add a license field.
[See PR 1060](https://github.com/nextstrain/auspice/pull/1060) & [PR 1061](https://github.com/nextstrain/auspice/pull/1061)
* Improve error handling in the parsing of markdown in the footer.
[See PR 1058](https://github.com/nextstrain/auspice/pull/1058)
* Add a dot in the progress bar & a URL query for the end-of-narrative slide.
[See PR 1063](https://github.com/nextstrain/auspice/pull/1063)


#### Bug Fixes
* Fix a bug where the layout couldn't be changed after the animation had been paused.
[See PR 1062](https://github.com/nextstrain/auspice/pull/1062)
* Reduce unnecessary (and expensive) react updates while changing the coloring.
[See PR 1075](https://github.com/nextstrain/auspice/pull/1075)
* Fix a couple of cases where functions were being called with extra (unused) arguments.
[See PR 1078](https://github.com/nextstrain/auspice/pull/1078) & [PR 1077](https://github.com/nextstrain/auspice/pull/1077)



## version 2.12.0 - 2020/04/08
* Add a legend to the map! [See PR 935](https://github.com/nextstrain/auspice/pull/935)
* Improve the animation smoothness, especially for datasets with limited temporal range. [See PR 920](https://github.com/nextstrain/auspice/pull/920)
* Add Japanese translation [See PR 1045](https://github.com/nextstrain/auspice/pull/1045)
* Reinstate the `lang` URL query to allow the URL to choose the language.
* Remove unnecessary lodash code from the bundles. [See PR 1018](https://github.com/nextstrain/auspice/pull/1018)
* Update how the `Root` component is imported. [See PR 1029](https://github.com/nextstrain/auspice/pull/1029)
* Fix errors in the sizing of the map buttons. [See PR 1040](https://github.com/nextstrain/auspice/pull/1040)
* Improve rendering of tree tip labels by only counting the selected (visible) tips. [See PR 1043](https://github.com/nextstrain/auspice/pull/1043)

## version 2.11.4 - 2020/04/04
* Temporarily remove SVG gradients in the tree due to bugs in multiple browsers. [See PR 1042](https://github.com/nextstrain/auspice/pull/1042)

## version 2.11.3 - 2020/04/02
* Add Portuguese translation. [See PR 1017](https://github.com/nextstrain/auspice/pull/1017)
* Fig bug where some branches would not display on certain browsers. [See PR 1022](https://github.com/nextstrain/auspice/pull/1022)
* Fix bug with selected dates shown when no genomes were selected. [See PR 1011](https://github.com/nextstrain/auspice/pull/1011)
* Show `--includeTiming` argument when viewing help (`--help`).
* Add second node version to TravisCI.  [See PR 1023](https://github.com/nextstrain/auspice/pull/1023)
* Fix docs typo. [See PR 1027](https://github.com/nextstrain/auspice/pull/1027)

## version 2.11.2 - 2020/03/30
* Add French translation - [See PR 1020](https://github.com/nextstrain/auspice/pull/1020)
* Improve rendering of long strain names in strain search - [See PR 1026](https://github.com/nextstrain/auspice/pull/1026)
* Lithuanian translation fixes

## version 2.11.1 - 2020/03/28
* Add Lithuanian translation
* Fig bugs in translation strings which contained `:` or `.`
* Fix syntax error in docs - [See PR 1010](https://github.com/nextstrain/auspice/pull/1010)

## version 2.11.0 - 2020/03/27
* You can now zoom out to the parent clade in the tree by clicking on the basal in-view branch.
[See PR 1001](https://github.com/nextstrain/auspice/pull/1001)
* Scroll gestures can now zoom the map. [See PR 1002](https://github.com/nextstrain/auspice/pull/1002)
* Which panels are displayed by default can now be defined by the dataset JSON.
[See PR 1006](https://github.com/nextstrain/auspice/pull/1006)
* Mapbox attribution logo added to the map. [See PR 1003](https://github.com/nextstrain/auspice/pull/1003)
* New translations!
  * Russian -- [See PR 995](https://github.com/nextstrain/auspice/pull/995) & [See PR 1004](https://github.com/nextstrain/auspice/pull/1004)
  * German -- [See PR 996](https://github.com/nextstrain/auspice/pull/996)
  * Spanish translation completed
  * Sentence structure improved to facilitate future Japanese translation. [See PR 994](https://github.com/nextstrain/auspice/pull/994)
* Improvements to contributing documentation. [See PR 1000](https://github.com/nextstrain/auspice/pull/1000)


## version 2.10.0 - 2020/03/24
* Tree branches which have an inferred state which differes between parent & child (i.e. different colours) now show a gradient across the branch.
[See PR 947](https://github.com/nextstrain/auspice/pull/947)
* Hovering on a deme in the map now emphasizes the tips in the tree which make up that deme.
[See PR 940](https://github.com/nextstrain/auspice/pull/940)
* Fix multiple bugs related to incorrect rendering of the map when downloading the SVG.
[See PR 925](https://github.com/nextstrain/auspice/pull/925)
* Fix a bug relating to the ordering of legend items.
[See PR 979](https://github.com/nextstrain/auspice/pull/979).
* Update Spanish locale data (still in a partially complete state).
See [commit f9c8ad2](https://github.com/nextstrain/auspice/commit/f9c8ad209a1e5d304fc6f15ec708f3d0be3dec43)
* Reorganisation and general improvements to documentation around contributing to auspice development.
[See PR 978](https://github.com/nextstrain/auspice/pull/978),
[commit 707f563](https://github.com/nextstrain/auspice/commit/707f563aab0a62e0504e393af0cd23da3e4504e0) and
[commit 9f002c9](https://github.com/nextstrain/auspice/commit/9f002c96a676e4603b7b9c06ef7df8a26be6d04c)
* Fix a bug where the narrative table styling introduced in 2.9.0 were applied outside the narratives.
* Fix all linting errors and warnings (potentially the first time this has happened!)

## version 2.9.1 - 2020/03/23
* Bugfix related to the byline for SARS-CoV-2 datasets when viewed on nextstrain.org

## version 2.9.0 - 2020/03/23
* Add language support for auspice! Currently we have an incomplete translation of the strings into
Spanish, but we can now begin to crowd-source translations. [See PR 953](https://github.com/nextstrain/auspice/pull/953)
* Add shebang to shell scripts. [See PR 962](https://github.com/nextstrain/auspice/pull/962)
* Add styling to tables in narratives. [See PR 966](https://github.com/nextstrain/auspice/pull/966)
* Improve accessiblity of slide-dots in narratives. [See PR 972](https://github.com/nextstrain/auspice/pull/972)
* Fix typo in readme. [See PR 963](https://github.com/nextstrain/auspice/pull/963)
* Improve file modes in docs. [See PR 964](https://github.com/nextstrain/auspice/pull/964)
* Fix broken links in docs. [See PR 967](https://github.com/nextstrain/auspice/pull/967)
* Linting fixes. [See PR 931](https://github.com/nextstrain/auspice/pull/931)

## version 2.8.1 - 2020/03/20
* Fix bug in dependencies which could prevent auspice from being built

## version 2.8.0 - 2020/03/20
* Allow right-to-left text in narratives [See PR 960](https://github.com/nextstrain/auspice/pull/960)
* Introduce a testing framework. [See PR 943](https://github.com/nextstrain/auspice/pull/943)
* Modify byline for SARS-CoV-2 datasets when viewed on nextstrain.org

## version 2.7.0 - 2020/03/15
* Add axis labels to the tree. [See PR 942](https://github.com/nextstrain/auspice/pull/942)
* Fix a bug where the map would jump to an incorrect view position in narratives. [See PR 950](https://github.com/nextstrain/auspice/pull/950)
* Do not display "github.com" in the built-by byline (link is unchanged). [See PR 949](https://github.com/nextstrain/auspice/pull/949)
* Improve the REAMDE.
* Allow translators to be specified in narratives & translators and authors (and their links) can be set as arrays. [See PR 937](https://github.com/nextstrain/auspice/pull/937)
* Add documentation about CSV/TSV drag-and-drop functionality


## version 2.6.0 - 2020/03/09
* Highlight tips which (partially) match strain search. [See PR 930](https://github.com/nextstrain/auspice/pull/930)
* Allow HTML tables in narratives (main-auspice-display-markdown). [See PR 924](https://github.com/nextstrain/auspice/pull/924)
* Add hidden URL query to force open / close state of legend. [See PR 923](https://github.com/nextstrain/auspice/pull/923)
* Make tree-text unselectable. [See PR 922](https://github.com/nextstrain/auspice/pull/922)

## version 2.5.7 - 2020/03/09
* Allow lat-longs for locations only set on internal nodes.

## version 2.5.6 - 2020/03/09
* Fig bug in legend for numerical values (introduced in 2.5.5). [See PR 927](https://github.com/nextstrain/auspice/pull/927)
* Improve documentation. [See PR 919](https://github.com/nextstrain/auspice/pull/919)

## version 2.5.5 - 2020/03/04
* Improve legend display for long names. [See PR 914](https://github.com/nextstrain/auspice/pull/914)
* Fix a bug which prevented CSV drag&drop working on Windows machines. [See PR 913](https://github.com/nextstrain/auspice/pull/913)
* Better display clades with extremely low divergence (i.e. polytomies) [See PR 909](https://github.com/nextstrain/auspice/pull/909)
* Improved branch labeling display. [See PR 908](https://github.com/nextstrain/auspice/pull/908)


## version 2.5.4 - 2020/02/26
* Improve entropy blending on branches. [See PR 898](https://github.com/nextstrain/auspice/pull/898)
* Bugfix: temporal scale was poorly displayed when a second tree was displayed ("tangletrees"). [See PR 910](https://github.com/nextstrain/auspice/pull/910)
* Bugfix: CSV drag-and-drop now works again. [See PR 904](https://github.com/nextstrain/auspice/pull/904)


## version 2.5.3 - 2020/02/12
* Improve how we display mutations to distinguish between gaps & Ns, and to not show undetermined AAs. [See PR 895](https://github.com/nextstrain/auspice/pull/895)
* Improve mapbox attribution. [See PR 894](https://github.com/nextstrain/auspice/pull/894)
* Add windows-specific documentation [See PR 893](https://github.com/nextstrain/auspice/pull/893)

## version 2.5.2 - 2020/02/11
* Allow npm scripts to run on windows. [See PR 868](https://github.com/nextstrain/auspice/pull/868)
* Improve the zoom level for the map when automatically zooming to one (or very few) demes. [See PR 891](https://github.com/nextstrain/auspice/pull/891)

## version 2.5.1 - 2020/02/07
* Allow narrative markdown files to have CRLF line endings.

## version 2.5.0 - 2020/02/05
* Add URL query options to facilitate embedding nextstrain via an iframe. [See PR 884](https://github.com/nextstrain/auspice/pull/884)
  * Sidebar state can be set via JSON & URL query.
  * A special URL query will disable rendering of the footer & header.
* Improve tree & map zooming. [See PR 886](https://github.com/nextstrain/auspice/pull/886)
  * The map will now automatically zoom upon changes in tree visibility (e.g. filters, time scrubbing, zoom-into-branch) or geographic resolution, unless the map has been interacted with.
  * The tree URL query for specifying which node in the tree is zoomed has been changed to `?label=<labelName>:<labelValue>`, and the docs updated accordingly. The old syntax `?clade=<cladeName>` will still work and automatically correct to the new syntax.
  * The set of branch labels to be displayed is now customisable.
* Add documentation surrounding auspice view-settings
* Improve text rendering in certain situations when the lato font is not available. [See PR 882](https://github.com/nextstrain/auspice/pull/882)

## version 2.4.1 - 2020/02/01
* Fix two bigs in narrative UI. [See PR 881](https://github.com/nextstrain/auspice/pull/881)

## version 2.4.0 - 2020/01/31
* Implement a new narratives view for mobile displays. [See PR 857](https://github.com/nextstrain/auspice/pull/857)
* Subsequent map-pages in narratives will reset the zoom if the geo resolution has changed. [See PR 866](https://github.com/nextstrain/auspice/pull/866)
* Fix narrative progress-bar styling. [See PR 875](https://github.com/nextstrain/auspice/pull/875)

## version 2.3.7 - 2020/01/30
* Fix a number of narrative bugs [See PR 865](https://github.com/nextstrain/auspice/pull/865)

## version 2.3.6 - 2020/01/30
* Improve wording related to reported mutation rates. [See PR 860](https://github.com/nextstrain/auspice/pull/860)
* Hide tip labels when animating. [See PR 859](https://github.com/nextstrain/auspice/pull/859)
* Improve sizing of tip-clicked infobox. [See PR 862](https://github.com/nextstrain/auspice/pull/862)

## version 2.3.5 - 2020/01/28
* Fix bug during branch-hover introduced in 2.3.3. [See PR 855](https://github.com/nextstrain/auspice/pull/855)
* Fix bug related to back-button behavior. [See PR 852](https://github.com/nextstrain/auspice/pull/852)

## version 2.3.4 - 2020/01/28
* Reinstate `width` prop passed to nav-bar extensions & update documentation. [See PR 853](https://github.com/nextstrain/auspice/pull/853)

## version 2.3.3 - 2020/01/27
* Improved display of divergence values > 0.01 when hovering on a branch
* Modified behavior specifically related to display of nCoV datasets:
  * Accession display modified if the node has the field `gisaid_epi_isl` [See PR 850](https://github.com/nextstrain/auspice/pull/850)
  * GISAID attribution added to byline for nextstrain.org/ncov datasets [See PR 850](https://github.com/nextstrain/auspice/pull/850)

## version 2.3.2 - 2020/01/24
* Minor styling changes to: (1) change min map zoom, (2) hide sidebar on GISAID pages and (3) show author in hover box. [See PR 849](https://github.com/nextstrain/auspice/pull/849)

## version 2.3.1 - 2020/01/24
* Improvements to narrative text styling with the intention that narratives are more functional on mobile devices.
* This version introduces experimental support for writing narratives where a page may define a section of markdown to be displayed in the main panel, instead of a tree or map. Documentation is forthcoming.

## version 2.3.0 - 2020/01/23
* Improved positioning of temporal grid lines for the phylogeny [See PR 846](https://github.com/nextstrain/auspice/pull/846)
* Improved browser title & SEO information [See PR 845](https://github.com/nextstrain/auspice/pull/845)
* Added the nCoV dataset to the get-data script

## version 2.2.4 - 2020/01/11
* Fix bug in computing state when nodes lack `num_date` attributes

## version 2.2.3 - 2020/01/06
* Improved display of numerical values in the tip clicked modal. [See PR 840](https://github.com/nextstrain/auspice/pull/840)
* Fix certain cases where the back button resulted in an inconsistent state being displayed. [See PR 841](https://github.com/nextstrain/auspice/pull/841)

## version 2.2.2 - 2020/01/03
* Remove unnecessary console log statements.

## version 2.2.1 - 2020/01/03
* Improve conversion functions to go between numeric & calendar dates. [See PR 839](https://github.com/nextstrain/auspice/pull/839)

## version 2.2.0 - 2019/12/16
* Update datasets fetched via `npm run get-data` to reflect the move to v2 (unified) JSONs.
* Allow datasets to define their own footer text via a string of markdown formatted text. Harcoded footers are now only used on the nextstrain.org domain and will be removed as they are incorporated into their respective builds. [See PR 834](https://github.com/nextstrain/auspice/pull/834) and [augur PR 423](https://github.com/nextstrain/augur/pull/423).
* Copy contributing docs into a top-level CONTRIBUTING.md file. [See PR 833](https://github.com/nextstrain/auspice/pull/833).
* Include fonts & other CSS assets in the auspice build to improve the behavior of auspice when offline. [See PR 826](https://github.com/nextstrain/auspice/pull/826).
* UI improvement: Display build source (if defined via `JSON.meta.build_url`), GitHub avatar (if build source is a GitHub repo) and maintainers as a byline under the title. [See PR 821](https://github.com/nextstrain/auspice/pull/821).
* Performance improvement: Stream (v2) datasets between auspice server & auspice client. [See PR 825](https://github.com/nextstrain/auspice/pull/825).

## version 2.1.0 - 2019/11/15
* Added support in the narratives to navigate via arrow keys. In addition to improved UI, this allows `decktape` to convert narratives to PDFs, and a guide has been added to the auspice docs for this.
[See PR 824](https://github.com/nextstrain/auspice/pull/824).
* Added GISAID and GISRS logos to the footer for flu datasets.
[See PR 822](https://github.com/nextstrain/auspice/pull/822).
* Bugfix: Fix the broken implementation of the "serverAddress" client customisation and update [the relevant documentation](https://nextstrain.github.io/auspice/customise-client/api)
* Bugfix: Colorings in v2 JSONs were not being correctly ordered. They now maintain the order specified in the JSON.
The ordering of v1 JSONs is still sorted, as per auspice v1 behavior.
[See PR 823](https://github.com/nextstrain/auspice/pull/823).
* Bugifx: The "download author data (TSV)" button no longer appears if no author information is defined in the dataset.
* Minor auspice docs improvements.

## version 2.0.3 - 2019/11/06
Bugfix: Correctly handle the `url` and `accession` of strains both in the tip-clicked info box and in the strain TSV download. [See PR 819](https://github.com/nextstrain/auspice/pull/819).

## version 2.0.2 - 2019/10/30
Bugfix: The ability to download per-strain metadata as a TSV file is now working again.
See [issue #816](https://github.com/nextstrain/auspice/issues/816).

## version 2.0.1 - 2019/10/25
Improved handling of traits associated with tips:
  * Added documentation around how auspice displays missing or unknown trait values
  * It a trait is defined as a coloring, then use the provided title in the tree info boxes
  * Improve logic as to whether a value is inferred (i.e. display associate confidence) or known. See [this issue](https://github.com/nextstrain/augur/issues/386) for more details.

Fix a bug where two trees couldn't be colored by date.

## version 2.0.0 - 2019/10/21

Please see the [release notes](https://nextstrain.github.io/auspice/releases/v2) for a full list of features and changes associated with auspice's v2 release.
Associated with the v2 release are much improved documentation at [nextstrain.github.io/auspice](https://nextstrain.github.io/auspice)

Here is a summary of the main changes:

* Pie charts to represent discrete variables on a map
* New dataset JSON format:
    * Strings parsed unchanged
    * Both metadata and tree data in a single JSON
    * Gene / Genome definitions are now in GFF format
    * Changes to how node data is stored
    * Multiple maintainers
    * Continous, Categorical, Ordinal, and Boolean Color Scales
* More information in tree info boxes
* Display of second trees
* Display better dates on the tree axis
* Map "reset zoom" button zooms to include all demes
* Consistent colouring of missing data in the tree
* Removal of Twitter & Google Analytics
* Improvements in the entropy panel
* Auspice responds to server redirects for datasets
* Importing (server) code from Auspice
* New Auspice subcommand: `auspice convert`
* Ability to show a "build" source URL in the sidebar
* `auspice view` uses a custom Auspice client if present

## version 1.39.1 - 2019/10/21

This release marks the final v1 release before auspice v2 is released.
Auspice v1 may still receive bug-fixes, and will be [npm-tagged](https://docs.npmjs.com/cli/dist-tag) with "version1" so that it may be installed via `npm install --global auspice@version1`.

* Minor dependency version upgrades.

## version 1.39.0 - 2019/09/12
* Slight changes to the auspice splash page wording to remove the word "Locally".
* `getDataset` API calls may now return code 204 ("no content") resulting in the auspice splash page displayed without an error message.
* Default styling of narrative text much improved.


## version 1.38.2 - 2019/09/06

* Fix footer for INRB Ebola builds.

## version 1.38.1 - 2019/09/06

* Update footer for INRB Ebola builds.
cd
## version 1.38.0 - 2019/08/29

* Add support for frequency projections. [See PR 777](https://github.com/nextstrain/auspice/pull/777)
* Local Auspice servers listen on only localhost by default instead of all interfaces. [See PR 781](https://github.com/nextstrain/auspice/pull/781)
* update dependencies


## version 1.37.5 - 2019/08/09
* Allo increased zoom levels in map. [See PR 765](https://github.com/nextstrain/auspice/pull/765

## version 1.37.4 - 2019/08/04
* Improved layout of unrooted trees when zoomed into a clade. [See PR 754](https://github.com/nextstrain/auspice/pull/754)
* Remove link to "deprecated" nextflu.org site from flu page footer.

## version 1.37.3 - 2019/07/29
* Reinstate github dataset link in sidebar for community builds

## version 1.37.2 - 2019/07/20
* Fix two bugs related to (a) "root" appearing as the selected clade in the URL and (b) applying filtering would remove the selected clade from the URL. See [issue #744](https://github.com/nextstrain/auspice/issues/744) and [PR 746](https://github.com/nextstrain/auspice/pull/746).
* Fix bug where auspice would crash if the JSON contained an "annotation" property but not a "annotation.nuc" key. See [issue #732](https://github.com/nextstrain/auspice/issues/732)
* The Map panel title is now "Grography" when transmissions are not inferred. See [issue #743](https://github.com/nextstrain/auspice/issues/743)

## version 1.37.1 - 2019/07/13
* Fig a bug where "unknown" values of a discrete scales (e.g. "?") could be given a colour. They are now grey.

## version 1.37.0 - 2019/07/09
* Fix two bugs relating to narratives and the Map component. [See PR 736](https://github.com/nextstrain/auspice/pull/736)
* Improve logic behind when to display tip labels on the tree

## version 1.36.6 - 2019/05/18
* Improve minor axis tick spacing on tree. [See PR 725](https://github.com/nextstrain/auspice/pull/725)
* Entropy calculations ignore ambiguous bases [See PR 723](https://github.com/nextstrain/auspice/pull/723)


## version 1.36.5 - 2019/04/17
* Fix a bug in the initial rendering of the date slider. [See PR 713](https://github.com/nextstrain/auspice/pull/713)

## version 1.36.4 - 2019/03/16
* Fix map deme border coloring.

## version 1.36.3 - 2019/03/11
* Various map improvements, including transmission ribbons, improved initial map
  bounds and improved deme circle sizing.
  [See PR 712](https://github.com/nextstrain/auspice/pull/712)
* Check mutation type against tree. (See PR 709)[https://github.com/nextstrain/auspice/pull/709]

## version 1.36.2 - 2019/03/04
* Update footer information. Don't display "live" footers for "community" URLs.

## version 1.36.1 - 2019/02/27
* Update npm packages identified as security vulnerabilities
* Fixes a bug (only in v1.36.0) where, for some datasets, interacting with the tree would cause the app to crash. [Issue 708](https://github.com/nextstrain/auspice/issues/708)
* `auspice build` now exits (with non-zero exit code) if there are errors during webpack bundling

## version 1.36.0 - 2019/02/25
* Improve app load times using code splitting. [See PR 701](https://github.com/nextstrain/auspice/pull/701)

## version 1.35.5 - 2019/02/08
* Add acknowledgements to mumps page.
* Preserve URL during 404. [Issue #700](https://github.com/nextstrain/auspice/issues/700)

## version 1.35.4 - 2019/01/28
* Restore download modal functionality. [Issue 699](https://github.com/nextstrain/auspice/issues/699)

## version 1.35.3 - 2019/01/25
* Show useful help message if port is in use. [See PR 694](https://github.com/nextstrain/auspice/pull/694)
* Fixed a bug where URL query strings may become corrupted in certain cases. [See PR 695](https://github.com/nextstrain/auspice/pull/695)
* Restore (deprecated) "npm run {server,dev}" commands. [See PR 692](https://github.com/nextstrain/auspice/pull/692)
* Fix broken links in documentation. [See PR 690](https://github.com/nextstrain/auspice/pull/690)
* Update WNV footer text

## version 1.35.2 - 2019/01/16
* Auspice is now extensible (at build stage), allowing customisations and serverless builds. [See PR 688](https://github.com/nextstrain/auspice/pull/688)
* Documentation is now available via github pages -- [nextstrain.github.io/auspice](https://nextstrain.github.io/auspice/)

## version 1.34.4 - 2019/01/15
* Update mumps footer

## version 1.34.3 - 2018/12/18
* Don't display deme circle if lat/long is absent

## version 1.34.2 - 2018/12/05
* Update mumps footer
* Modify the casing of how labels are displayed [See PR 685](https://github.com/nextstrain/auspice/pull/685)

## version 1.34.1 - 2018/11/29
* Small change to make the 'Second Tree' option appear when virus segments are named according to "segment1", "segment2" etcetera. [See PR 684](https://github.com/nextstrain/auspice/pull/684)

## version 1.34.0 - 2018/11/19
* Community builds are now sourced from githubusercontent, which is the official source for "raw" files from GitHub. [PR 682](https://github.com/nextstrain/auspice/pull/682)

## version 1.33.0 - 2018/11/18
* Gene names can now include `-` and `_`, as well as code improvements to genotype encoding/decoding -- [PR 681](https://github.com/nextstrain/auspice/pull/681)

## version 1.32.0 - 2018/11/02
* Allow `hidden` property on tree nodes -- [PR 676](https://github.com/nextstrain/auspice/pull/676)
* Update packages & package.json metadata -- [PR 677](https://github.com/nextstrain/auspice/pull/677) [PR 678](https://github.com/nextstrain/auspice/pull/678) [PR 679](https://github.com/nextstrain/auspice/pull/679)
* Restore hot-reloading ability for development (above PRs)

## version 1.31.0 - 2018/10/29
* Allow time-only trees or div-only trees -- [PR 670](https://github.com/nextstrain/auspice/pull/670)
* Minor fixes to handle trees with missing data -- [PR 673](https://github.com/nextstrain/auspice/pull/673)


## version 1.30.3 - 2018/09/19
* Colours were sometimes inconsistent when two trees were displayed -- [PR 665](https://github.com/nextstrain/auspice/pull/665)
* Clicking on a tip while two trees were displayed no longer causes a crash -- [PR 666](https://github.com/nextstrain/auspice/pull/666)

## version 1.30.2 - 2018/09/07

* Publish the package to the npm registry from the release branch automatically. [[#660](https://github.com/nextstrain/auspice/pull/660), [#662](https://github.com/nextstrain/auspice/pull/662)]
* Fix inability to run `npm` locally introduced by repo's `.npmrc` file. [[#661](https://github.com/nextstrain/auspice/issues/661)]

## version 1.30.1 - 2018/09/05

## version 1.30.0 - 2018/09/05

* Auspice is now globally installable and published as a npm package [npmjs.com/package/auspice](https://www.npmjs.com/package/auspice)
* AA entropy calculation bug fixed  - [PR 657](https://github.com/nextstrain/auspice/pull/657)
* Narrative scroll bars are fixed for Linux & Windows browsers - [PR 653](https://github.com/nextstrain/auspice/pull/653)
* Tree legend placement improved  - [PR 650](https://github.com/nextstrain/auspice/pull/650)
* `npm run start` is no longer deprecated

## version 1.29.0 - 2018/08/31
* The visibility of nodes on the tree now more accurately reflects the selected date range - [PR 644](https://github.com/nextstrain/auspice/pull/644)
* Info text is easier to read & the date range reflects the genomes in view - [PR 639](https://github.com/nextstrain/auspice/pull/639)

### Narrative improvements
* Toggle between narrative & interactive mode is much clearer - [PR 648](https://github.com/nextstrain/auspice/pull/648)
* URL queries with no clade set zoom to the entire tree - [PR 644](https://github.com/nextstrain/auspice/pull/644)

## version 1.28.0 - 2018/08/25
* Narratives -- see [nextstrain.org/docs/visualisation/narratives](https://nextstrain.org/docs/visualisation/narratives) for documentation.
* Time slicing & non-highlighted branches are now displayed in a cleaner fashion - [PR 638](https://github.com/nextstrain/auspice/pull/638)
* Selected clades (i.e. the tree has been zoomed) are now part of URL state - [PR 633](https://github.com/nextstrain/auspice/pull/633)

## version 1.27.1 - 2018/08/24
* Fixed broken navigation links
* Entropy zooming bug fixed - [PR 637](https://github.com/nextstrain/auspice/pull/637)

## version 1.27.0 - 2018/08/20
* Saved SVGs now include two trees (if displayed) - [PR 630](https://github.com/nextstrain/auspice/pull/630)

## version 1.26.0 - 2018/08/20
* Entropy panel zoom changes are now reflected in URL state - [PR 626](https://github.com/nextstrain/auspice/pull/626)

## version 1.25.2 - 2018/08/17

* Negative dates (BCE) are now handled correctly - [PR 627](https://github.com/nextstrain/auspice/pull/627)
* Small entropy zooming fixes - [PR 624](https://github.com/nextstrain/auspice/pull/624)
* Bugfix to prevent the grid being drawn over the branches / tips in some situations - [PR 629](https://github.com/nextstrain/auspice/pull/629)
* Transmissions which involve demes without lat/longs now show an error notification - [PR 608](https://github.com/nextstrain/auspice/pull/608)

## version 1.25.1 - 2018/08/10
* Small fixes to entropy zooming behaviour
* Gaps are not counted in the entropy calculations & are not displayed in the info panel pop up

## version 1.25.0 - 2018/08/09
* New Entropy panel zooming functionality - [PR 609](https://github.com/nextstrain/auspice/pull/609)

## version 1.24.1 - 2018/08/08
* Upgrade dependencies
* Bugfix when changing between staging datasets - [issue 618](https://github.com/nextstrain/auspice/issues/618)

## version 1.24.0 - 2018/08/05
* Tree grid improvements - [PR 610](https://github.com/nextstrain/auspice/pull/610)
  * Allow negative (i.e. BCE) dates
  * Display y-dates and horizontal lines in the clock layout view
  * Improved spacing between grid points
* SVG elements in the DOM are now in named groups which improves debugging and prevents incorrect-layering bugs. [PR 612](https://github.com/nextstrain/auspice/pull/612)
* Fixed a bug where the available datasets (dropdowns in sidebar) contained invalid values [PR 614](https://github.com/nextstrain/auspice/pull/614)
* Community sourced datasets (nextstrain.org/community/...) display a link to the github repo in the sidebar [PR 615](https://github.com/nextstrain/auspice/pull/615)
* Since v1.22.3 changing datasets preserved the URL queries (e.g. `?l=radial`).
A number of bugs relating to this have been fixed, where these queries were no longer valid for the new dataset.
This also fixed potential issues related to loading datasets where the URL queries were invalid.
[PR 613](https://github.com/nextstrain/auspice/pull/613)


## version 1.23.2 - 2018/07/30
* Increase the padding when displaying two panels side by side to avoid bugs on different browsers / OSs. [issue 574](https://github.com/nextstrain/auspice/issues/574)

## version 1.23.1 - 2018/07/30
* Improved the alignment of branch labels for the second tree

## version 1.23.0 - 2018/07/28

* The server no longer needs to be transpiled
* The interaction between data sources (local / staging / live) has been changed.
  * The first part of the URL now defines the source, e.g. /flu is live, /local/flu is local, /staging/flu...
  * Accordingly, `npm run server.js localData` no longer has the effect it used to!
  * Github committed JSONs are now accessible via /community/orgName/repoName (slightly experimental and subject to change)
* JSONs are now delivered to the client using compression (when available)
* Frequency JSONs are only fetched when the frequency panel is specified (in the meta JSON)
* The server combines the tree & meta JSONs into a single "unified" JSON, in preparation for a move to v2.0 JSONs.
* Manifest files / parsing have been moved from the server
* Various improvements to the narratives (still experimental and the API is subject to change)
* Second trees are specified by `/na:ha/` rather than `/na/...?tt=ha`. The old syntax is still supported for backwards compatibility.


## version 1.22.3 - 2018/07/19
* Trigger Docker Hub automated build to rebuild via Travis CI when master branch is pushed and tests are successful
* Simplify counting of traits across tree
* Improve README
* Remove Electron
* Restored the ability to run the non-dev server with local data [PR 589](https://github.com/nextstrain/auspice/pull/589)

## version 1.22.2 - 2018/07/10
* Bugfix in tip attribute counting algorithm

## version 1.22.1 - 2018/07/09
* Legend items no longer include duplicates, and include month for dates within the past 10 years - thanks @emmahodcroft[PR 592](https://github.com/nextstrain/auspice/pull/592)
* Bugfix related to colorBy values only specified on internal nodes [issue 593](https://github.com/nextstrain/auspice/issues/593)

## version 1.22.0 - 2018/07/03
* Auspice can now run with an incomplete metadata file, or even without a metadata file at all! [PR 586](https://github.com/nextstrain/auspice/pull/586)
* Download modal reinstated [PR 587](https://github.com/nextstrain/auspice/pull/587)
  * Improved styling
  * All panes now saved to a single SVG
  * Map panning SVG-save bugs (mostly) fixed
  * TSV used instead of CSV
* Fix WNV colorBy link in footer -- [issue 590](https://github.com/nextstrain/auspice/issues/590)

## version 1.21.3 - 2018/06/27
* Show tree titles (e.g. `NA`) when two trees are displayed
* Multi-part datasets (e.g. `flu/seasonal/h3n2...`) which are not in the manifest file can now be loaded; various bugs fixed for running locally without a manifest file.
* Other minor bugfixes & package upgrades

## version 1.21.2 - 2018/06/07
* Disable Untangling

## version 1.21.1 - 2018/06/04
* Narratives are now sourced from [the static github repo](https://github.com/nextstrain/static/tree/eea71fc22299c1d7febd25ea0ec1b00dcd286a3a~/narratives)

## version 1.21.0 - 2018/06/01
* Untangling via a simple algorithm upon 2nd tree load
* Segment names displayed above trees (if 2 trees)
* Fix hover-info-box date bug -- [issue 572](https://github.com/nextstrain/auspice/pull/572)

## version 1.20.3 - 2018/05/30
* Narratives now accessed via `/narratives/...` URLs
* App now works without needing a manifest file (but the datasets dropdown needs it)
* Initial load simplified
* Sidebar doesn't appear until the data is ready to be displayed


## version 1.20.2 - 2018/05/21
* Changes to the frequencies threshold

## version 1.20.1 - 2018/05/21
* Changes to the frequencies threshold
* Narratives restored

## version 1.20.0 - 2018/05/15
**Auspice is now served via the nextstrain.org server together with the static (gatsbyjs) site**
* Changes to the server code organisation
* Static content removed
* New splash page listing the (should only be accessed from local instances or 404s, live site splash is via the static site)
* Improved page navigation API
* Travis CI 🎉
* Auspice version is displayed in the footer
* Release script modified (Travis CI listens to `release` and pushes a successful build to S3 which is fetched by the live server)


## version 1.19.1 - 2018/05/09
* Fixed a bug where proteins starting with a number (e.g. 2K) were assumed to be nucleotide genotypes.

## version 1.19.0 - 2018/05/09
* Improved sidebar styling on both mobile & desktop
* Reset layout button doesn't re-instantiate the PhyloTree object, rather it resets the branch thicknesses & sets the whole tree to be in view
* Padding improvements - tip labels are now visible, and small clades render better.
* Tip names now shown for up to 100 taxa
* Branch thickness restored -- [issue 544](https://github.com/nextstrain/auspice/pull/544)
* Tree panning has been removed (we no longer use `react-svg-pan-zoom`)

## version 1.18.10 - 2018/05/07

* Separate Nucleotide mutations from gaps / Ns in info-box - thanks @emmahodcroft [PR 552](https://github.com/nextstrain/auspice/pull/552)
* Frequencies y-axis is no longer rounded to the nearest 0.05

## version 1.18.9 - 2018/05/03
* update flu footer
* start using travis CI

## version 1.18.8 - 2018/05/02
* temporary fix for map transmissionIndices errors (bug still exists, [issue 547](https://github.com/nextstrain/auspice/issues/547))

## version 1.18.7 - 2018/05/02
* Fix frequencies panel x-axis bug
* Linting
* Minor style changes

## version 1.18.6 - 2018/04/30
* update WNV footer

## version 1.18.5 - 2018/04/27
* update WNV footer

## version 1.18.4 - 2018/04/26
* Use exponential notation for the clock rate

## version 1.18.3 - 2018/04/23
* Updated the footer for LASV & WNV

## version 1.18.2 - 2018/04/16
* LBI color scale domain is [0, 0.7] [Issue 541](https://github.com/nextstrain/auspice/issues/541)
* Fix bug with antigenic advance & frequencies [Issue 540](https://github.com/nextstrain/auspice/issues/540)
* Hovering over a tree legend value of zero now correctly highlights matching tips
* Undefined color traits are now grey on a discrete scale
* Removed all references to `node.attr.strain` (tree JSON) and `seq_author_map` (meta JSON)

## version 1.18.1 - 2018/04/15
* Make date slider spacing consistent between animation and drag

## version 1.18.0 - 2018/04/14
* Tanglegrams enabled! (bugfixes & reinstate controls dropdown)
* Status pages: nextstrain.org/status & nextstrain.org/status/staging
* Narrative files are sourced from nextstrain.org repository

## version 1.17.4 - 2018/04/10
* Updated LASV footer

## version 1.17.3 - 2018/04/04

* Allowed arbitrary user manifests to be served
* Changed how the tanglegram updates, so that it is now triggered straight after the trees update.
* Updated the files downloaded from `get_data.sh`
* Add lassa (LASV) footer acknowledgments.

## version 1.17.2 - 2018/04/02
* Job ad on splash page.

## version 1.17.1 - 2018/03/28
* Fix tree SVG bug [Issue 535](https://github.com/nextstrain/auspice/issues/535)

## version 1.17.0 - 2018/03/26

#### Narrative
* Now exposed via a "hidden" URL query. E.g. `flu/h3n2/3y?n=1`
* Frequencies added to narrative
* block in focus is part of the URL query, and can be reloaded via the URL

#### Second Tree / Tanglegram
* Second tree can be loaded via a URL (e.g. `?tt=na`). Sidebar dropdown currently disabled.
* In this mode, trees are forced to be rectangular, and the map & frequencies are not displayed.
* Tanglegram exists, but no untangling (yet)
* Bugs still exist (which is why the sidebar has been disabled)

#### Internals
* All JSONs (incl. frequencies, narrative) are loaded within a single Promise & dispatch
* `phylotree.change()` only ever called once, and always in componentDidUpdate (fixes bugs where it fired in both CWRP and CDU)
* old & deprecated code removed


## version 1.16.5 - 2018/03/26
* Authors filter is now an explicit setting in the JSONs [PR 532](https://github.com/nextstrain/auspice/pull/532)


## version 1.16.4 - 2018/03/22
* Flu footer updated
* Fix bug in genotype colouring [PR 531](https://github.com/nextstrain/auspice/pull/531)
* Adjust vaccine cross styling & remove dashed line [PR 529](https://github.com/nextstrain/auspice/pull/529)


## version 1.16.3 - 2018/03/21
* Flu footer updated


## version 1.16.2 - 2018/03/21
* Add redirect of www.nextstrain.org to nextstrain.org via express middleware [PR 528](https://github.com/nextstrain/auspice/pull/528)


## version 1.16.1 - 2018/03/16
* Fix bug in the color scales where clades were coloured white after switching trees.


## version 1.16.0 - 2018/03/16
### Browser support
* Now works on Internet Explorer 11 (tested on windows 7)
* Grid layout issue fixed for Firefox on linux/windows
* Embedding Nextstrain in an iFrame works - see `/scripts/gisaid_iframe.html`


## version 1.15.1 - 2018/03/14
* Fix Firefox branch / tip hover bug [Issue 525](https://github.com/nextstrain/auspice/issues/525)


## version 1.15.0 - 2018/03/12
* Multiple genotypes (for the same amino acid) by typing in multiple comma separated AA/nuc positions.
[PR 523](https://github.com/nextstrain/auspice/pull/523).


## version 1.14.4 - 2018/03/05
* Restore staging server toggle [issue 514](https://github.com/nextstrain/auspice/issues/514)


## version 1.14.3 - 2018/03/01
* Bug fix where tip colours reverted to their initial colours after a layout change. [issue 519](https://github.com/nextstrain/auspice/issues/519)

## version 1.14.2 - 2018/02/28
* [PR 518](https://github.com/nextstrain/auspice/pull/518)
    * Frequency y-axis is now dynamic
    * Frequency text box is more readable
    * Frequency normalisation has been removed

## version 1.14.1 - 2018/02/27
* Style tip stroke separately from branch stroke (`node.stroke` replaced with `node.branchStroke` & `node.tipStroke`)

## version 1.14.0 - 2018/02/27

### Features
* Strain search (using [awesomplete](https://projects.verou.me/awesomplete/)).
This highlights the path to a single tip and increases the tip radius.
Strain is stored in the URL query (`s=...`) and can be restored via URL.
Selected strain also appears in the info panel (top of screen).
* Amino acid branch labels (for every tree) as well as clade labels if specified by the `clade_annotation` attribute.
AA labels are shown where the descendent visible tips account for more than 5% of the total visible tips (same as nextflu).
Clade labels are always displayed.
* Default geneotype gene is now HA1 if available (previously nucleotide).
* ColorBy ordering (sidebar dropdown) is now ordered (via an array in `globals.js`)

### Internals
* The JSON processing on initial load has been shifted from the reducers to a single action - fewer dispatches, fewer potential bugs, faster code.
* Frequencies are initialised in a single action (previously 2).
* tip-frequencies are now downloaded via `get_data.sh`
* Frequency actions are not dispatched unless the frequency panel is loaded.

## version 1.13.2 - 2018/02/26
* Improve consistency of panel controls
* Show `unassigned` in tree legend (if applicable)

## version 1.13.1 - 2018/02/26
* Tree button "reset layout" now at top right

## version 1.13.0 - 2018/02/26

### Features
* Frequencies are now displayed via a stream graph panel - see [PR 497](https://github.com/nextstrain/auspice/pull/497).
These require the fetching of a separate `tip-frequencies` JSON, and must be specified in the `panels` array of the meta.JSON.
* "Panels To Display" toggles in the sidebar allow customisation of the display, and this is reflected in the URL.
* The `+` `-` buttons in the tree have been replaced by a "reset tree" button.
This resets the bounds to the entire tree & completely re-renders the tree (filters are maintained).
Pan behaviour is unchanged.

### Internals
* React-PhyloTree interface is completely rewritten to use `phylotree.change()` - see [PR 501](https://github.com/nextstrain/auspice/pull/501) for the API.
The new interface is both easier to understand and quicker.
* `changePageQuery` (used for changing narrative blocks) is now a single action
* Ongoing narrative work (still disabled).
* React sidebar has been removed (no UI changes).

## version 1.12.0 - 2018/02/14

### Features
* Vaccine strains are shown at their use date (in temporal trees), with dotted lines connecting them to their tips (representing collection date) ([PR 498](https://github.com/nextstrain/auspice/pull/498))

### Internals
* `updateGeometryFade` uses counters to know when transitions are finished rather than `setTimeout`

## version 1.11.0 - 2018/02/05

### Features
* Vaccine strains are now displayed if they are specified in `metaJSON.vaccine_choices` ([PR 490](https://github.com/nextstrain/auspice/pull/490))

### Internals
* Tree components and PhyloTree have been reorganized (in `src/components/tree`) and the syntax improved ([PR 493](https://github.com/nextstrain/auspice/pull/493))
* Upgraded to React 16, as well as upgrading redux & react-svg-pan-zoom ([PR 494](https://github.com/nextstrain/auspice/pull/494))

## version 1.10.0 - 2018/02/05

### Features
* Local Branching Index (LBI) coloring can be calculated in Auspice (code identical to nextflu) if specified in `color_options` (meta JSON) ([PR 491](https://github.com/nextstrain/auspice/pull/491))

### Internals
* `get_data.sh` script updated to no longer download sequences & entropy JSONs
* action logging middleware available for debugging / development

## version 1.9.0 - 2018/01/30

### Animation
* Animations can now loop! This is selected via a toggle in the sidebar.
* While animating, the URL displays information which defines the animation (bounds, looping, cumulative, speed). This allows the animation to start automatically by linking to this URL.
* The code for the animation (i.e. the setInterval code) has been moved out of `Map` and into a separate `AnimationController` component.
* Animation is stopped & started by examining redux state, rather than with imperative controls.

### misc
* The narrative machinery has been moved forward, but this functionality is still disabled and not present in production code.
* The (rather expensive) `calendarToNumeric` calculations have become part of `state.controls` so that components no longer have to calculate them from the string form.

## version 1.8.0 - 2018/01/18

#### entropy calculated via tree
* The entropy panel data is now computed within Auspice by examining mutations throughout the tree, and is throttled to improve speed under load.
* Both entropy and number of mutations are available via a toggle similar to AA/NT
* This results in `entropy.JSON` no longer being fetched.
* The entropy data is stored in redux state rather than the react component
* The D3 code has been reorganised
* Note that the entropy values are slightly different to those exported by Augur in some situations - see https://github.com/nextstrain/auspice/pull/478#issuecomment-358496901

#### genotype calculated via tree
* This results in `sequences.JSON` no longer being fetched.
* Augur was updated to export `annotations` which are needed for entropy gene display.

#### middleware / react router
* All changes to the URL are now performed via middleware rather than side-effects within the action definition.
* React router has been removed
* Browser back/forward is detected via `window.addEventListener('popstate', this.onURLChanged)` which also fires on initial page load.
* Pages are selected via the `<PageSelect>` component.

#### other
* The number of proteins displayed while hovering over a branch has been limited to 7 (issue #484)
* The presence of author data is checked before display (issue #488)
* This changelog has been created and a step in the `releaseNewVersion` script added to prepend the version number upon release.



## version 1.7.2 - 2018/1/4

#### Narrative / situational report
* Functionality has been added, but is currently disabled via a flag in `globals.js`.
* This is currently rendered in a right-hand sidebar. This feature is not yet complete.

#### URL queries

* The following state has been added to the URL query:
  * filters, e.g. `f_authors=Tong_et_al,Capobianchi_et_al&f_division=kerouane`
  * genotype URLs (these were previously set as the URL but not parsed)
  * panel layout (grid/full)
* A number of bugs regarding URL query state parsing (esp with genotype colorBys) have been fixed.

## version 1.7.1 - 2017/10/31

* Added mumps acknowledgment

## version 1.7.0 - 2017/10/17
## version  - 2018/01/18
