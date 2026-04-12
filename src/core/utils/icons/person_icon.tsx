import Svg, { Path, SvgProps } from "react-native-svg";

export const PersonIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width ?? 16}
      height={props.height ?? 16}
      fill="none"
      viewBox="0 0 16 16"
    >
      <Path
        fill={props.fill ?? "#000"}
        d="M5.175 6.825Q4 5.65 4 4t1.175-2.825T8 0t2.825 1.175T12 4t-1.175 2.825T8 8 5.175 6.825M0 16v-2.8q0-.85.438-1.562A2.93 2.93 0 0 1 1.6 10.55a14.8 14.8 0 0 1 3.15-1.162 13.8 13.8 0 0 1 6.5 0q1.6.39 3.15 1.162.725.375 1.163 1.088T16 13.2V16z"
        fillOpacity={props.fillOpacity ?? 0.25}
      />
    </Svg>
  );
};
