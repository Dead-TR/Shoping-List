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
    <G clipPath="url(#clip0_3_578)">
      <Path
        d="M4.39339 4.3934C-1.46444 10.2512 -1.46444 19.7488 4.39339 25.6066C10.2515 31.4648 19.7488 31.4644 25.6066 25.6066C31.4648 19.7484 31.4648 10.2516 25.6066 4.3934C19.7488 -1.46443 10.2515 -1.46476 4.39339 4.3934ZM24.3017 24.3017C19.1843 29.419 10.8366 29.3981 5.71917 24.2807C0.60182 19.1634 0.60182 10.8365 5.71917 5.71918C10.8365 0.601828 19.1634 0.601849 24.2807 5.71918C29.3981 10.8365 29.419 19.1843 24.3017 24.3017ZM18.9775 9.6967L15 13.6742L11.0225 9.6967C10.6566 9.33077 10.0626 9.33077 9.69669 9.6967C9.33076 10.0626 9.33076 10.6566 9.69669 11.0225L13.6742 15L9.69669 18.9775C9.33076 19.3434 9.33076 19.9374 9.69669 20.3033C10.0626 20.6692 10.6566 20.6692 11.0225 20.3033L15 16.3258L18.9775 20.3033C19.3434 20.6692 19.9374 20.6692 20.3033 20.3033C20.6692 19.9374 20.6692 19.3434 20.3033 18.9775L16.3258 15L20.3033 11.0225C20.6692 10.6566 20.6692 10.0626 20.3033 9.6967C19.9374 9.33077 19.3434 9.33077 18.9775 9.6967Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3_578">
        <Rect width={30} height={30} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;