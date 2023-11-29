// generate react svg playground
//  https://react-svgr.com/playground/?native=true&svgo=false

import { default as AddSVG } from "./resources/Add";
import { default as PenSVG } from "./resources/Pen";
import { default as TrashSVG } from "./resources/Trash";
import { default as OkSVG } from "./resources/Ok";
import { default as CloseSVG } from "./resources/Close";

export const systemIcons = {
  add: AddSVG,
  pen: PenSVG,
  trash: TrashSVG,
  close: CloseSVG,
  ok: OkSVG,
};
