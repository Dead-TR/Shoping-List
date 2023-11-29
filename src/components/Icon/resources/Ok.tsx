import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#clip0_3_580)">
      <Path
        d="M15 0C12.0333 0 9.13319 0.879735 6.66645 2.52796C4.19971 4.17618 2.27713 6.51886 1.14181 9.25975C0.00649925 12.0006 -0.290551 15.0166 0.288227 17.9263C0.867006 20.8361 2.29562 23.5088 4.3934 25.6066C6.49119 27.7044 9.16394 29.133 12.0736 29.7118C14.9834 30.2905 17.9994 29.9935 20.7403 28.8582C23.4811 27.7229 25.8238 25.8003 27.472 23.3335C29.1203 20.8668 30 17.9667 30 15C30 11.0217 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9783 0 15 0ZM15 27.8571C12.4571 27.8571 9.9713 27.1031 7.85696 25.6903C5.74261 24.2776 4.09468 22.2695 3.12155 19.9202C2.14843 17.5709 1.89381 14.9857 2.38991 12.4917C2.88601 9.99765 4.11053 7.70673 5.90863 5.90863C7.70674 4.11052 9.99766 2.886 12.4917 2.3899C14.9857 1.89381 17.5709 2.14842 19.9202 3.12155C22.2696 4.09467 24.2776 5.74261 25.6903 7.85695C27.1031 9.9713 27.8571 12.4571 27.8571 15C27.8571 18.4099 26.5026 21.6802 24.0914 24.0914C21.6802 26.5025 18.4099 27.8571 15 27.8571Z"
        fill="white"
      />
      <Path
        d="M23.6867 9.32039C23.786 9.42169 23.8648 9.54204 23.9186 9.67453C23.9723 9.80702 24 9.94906 24 10.0925C24 10.2359 23.9723 10.378 23.9186 10.5105C23.8648 10.643 23.786 10.7633 23.6867 10.8646L14.0886 20.6796C13.9896 20.7812 13.8719 20.8617 13.7423 20.9167C13.6128 20.9717 13.4739 21 13.3336 21C13.1933 21 13.0544 20.9717 12.9249 20.9167C12.7953 20.8617 12.6776 20.7812 12.5785 20.6796L8.31275 16.3174C8.1125 16.1126 8 15.8349 8 15.5453C8 15.2557 8.1125 14.9779 8.31275 14.7732C8.513 14.5684 8.7846 14.4533 9.0678 14.4533C9.35099 14.4533 9.62259 14.5684 9.82284 14.7732L13.3336 18.3655L22.1766 9.32039C22.2757 9.21883 22.3933 9.13826 22.5229 9.08328C22.6525 9.0283 22.7914 9 22.9316 9C23.0719 9 23.2108 9.0283 23.3404 9.08328C23.4699 9.13826 23.5876 9.21883 23.6867 9.32039Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3_580">
        <Rect width={30} height={30} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;