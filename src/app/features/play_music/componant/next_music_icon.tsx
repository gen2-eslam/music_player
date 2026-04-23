import Svg, { Path, SvgProps } from "react-native-svg";

export const NextMusicIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 27 25"
    >
      <Path
        d="M24.834.443v23.243M1.5 1.5v21.13l13.611-10.565z"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </Svg>
  );
};
