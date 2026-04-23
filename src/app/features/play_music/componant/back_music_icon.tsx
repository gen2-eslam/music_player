import Svg, { Path, SvgProps } from "react-native-svg";

export const BackMusicIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 27 25"
    >
      <Path
        d="M1.5 23.686V.444M24.833 22.63V1.5l-13.61 10.565z"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </Svg>
  );
};
