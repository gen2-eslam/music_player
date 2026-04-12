import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

function EyePasswordShow(props: SvgProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M1 12s4-8 11-8 11 8 11 8M1 12s4 8 11 8 11-8 11-8"
        stroke={props.stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={3}
        stroke={props.stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default EyePasswordShow;
