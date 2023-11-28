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
    <G clipPath="url(#clip0_2_292)">
      <Path
        d="M15 0C6.71578 0 0 6.71578 0 15C0 23.2847 6.71578 30 15 30C23.2847 30 30 23.2847 30 15C30 6.71578 23.2847 0 15 0ZM15 28.1545C7.76297 28.1545 1.875 22.237 1.875 14.9999C1.875 7.76291 7.76297 1.87494 15 1.87494C22.237 1.87494 28.125 7.76294 28.125 14.9999C28.125 22.2369 22.237 28.1545 15 28.1545Z"
        fill="currentColor"
      />
      <Path
        d="M19.2102 9.48801L20.698 8.41266C21.0081 8.18865 21.3945 8.09701 21.7722 8.15791C22.1499 8.2188 22.4879 8.42723 22.7119 8.73736C22.9359 9.04749 23.0276 9.4339 22.9667 9.81159C22.9058 10.1893 22.6974 10.5273 22.3872 10.7513L9.71595 19.9041C9.24977 20.2406 8.70712 20.4557 8.13699 20.53L6.00001 20.8088L6.93628 18.8677C7.18595 18.3498 7.5607 17.9022 8.02668 17.5654L19.2109 9.48813L19.2102 9.48801ZM19.2102 9.48801L20.8905 11.8143"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2_292">
        <Rect width={30} height={30} fill="currentColor" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
