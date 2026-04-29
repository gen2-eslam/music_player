import Svg, { Path, SvgProps } from "react-native-svg";

export const TrashIcon = (props: SvgProps) => {
  return (
    <Svg width={props.width} height={props.height} fill="none" viewBox="0 0 16 18">
      <Path
        fill={props.fill}
        d="M3 18q-.824 0-1.412-.587A1.93 1.93 0 0 1 1 16V3H0V1h5V0h6v1h5v2h-1v13q0 .824-.588 1.413A1.93 1.93 0 0 1 13 18zM13 3H3v13h10zM5 14h2V5H5zm4 0h2V5H9zM3 3v13z"
      />
    </Svg>
  );
};
