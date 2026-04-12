import Svg, { Path, SvgProps } from "react-native-svg";

export const LockIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width ?? "16"}
      height={props.height ?? "21"}
      fill="none"
      viewBox="0 0 16 21"
    >
      <Path
        fill={props.fill ?? "#000"}
        d="M8 16a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 1 1 0 4m6 3V9H2v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9c0-1.11.89-2 2-2h1V5a5 5 0 1 1 10 0v2zM8 2a3 3 0 0 0-3 3v2h6V5a3 3 0 0 0-3-3"
        fillOpacity={props.fillOpacity ?? ".25"}
      />
    </Svg>
  );
};
