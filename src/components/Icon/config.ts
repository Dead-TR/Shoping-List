// generate react svg playground
//  https://react-svgr.com/playground/?native=true&svgo=false

import { default as AddSVG } from "./resources/Add";
import { default as PenSVG } from "./resources/Pen";
import { default as TrashSVG } from "./resources/Trash";
import { default as OkSVG } from "./resources/Ok";
import { default as CloseSVG } from "./resources/Close";
import { default as ArrowSVG } from "./resources/Arrow";
import { default as SwapSVG } from "./resources/Swap";

export const systemIcons = {
  arrow: ArrowSVG,
  trash: TrashSVG,
  close: CloseSVG,
  swap: SwapSVG,
  add: AddSVG,
  pen: PenSVG,
  ok: OkSVG,
};
