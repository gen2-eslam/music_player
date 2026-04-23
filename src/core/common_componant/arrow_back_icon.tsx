import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowBackIcon = (props: SvgProps) => {
  return (
    <Svg width="22" height="15" viewBox="0 0 22 15">
      <Path
        d="m1.414 7.107 6.4-6.4m-6.4 6.4 6.4 6.4m-6.4-6.4h20"
        strokeWidth="2"
        stroke="black"
      />
    </Svg>
  );
};
