import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function EyePasswordHide(props: SvgProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M2 2l20 20M6.713 6.723C3.665 8.795 2 12 2 12s3.636 7 10 7c2.05 0 3.817-.727 5.271-1.712M11 5.058A8.595 8.595 0 0112 5c6.364 0 10 7 10 7s-.692 1.332-2 2.834M14 14.236a3 3 0 01-4.13-4.348"
        stroke={props.stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default EyePasswordHide;
