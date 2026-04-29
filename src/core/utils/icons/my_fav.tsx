import Svg, { Path, SvgProps } from "react-native-svg";

const MyFavIcon = (props: SvgProps) => {
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 19">
      <Path
        fill="#FF89AB"
        d="m10 18.35-1.45-1.3q-2.525-2.275-4.175-3.925T1.75 10.162.388 7.75A6.7 6.7 0 0 1 0 5.5q0-2.35 1.575-3.925T5.5 0q1.3 0 2.475.55A5.9 5.9 0 0 1 10 2.1 5.9 5.9 0 0 1 12.025.55 5.8 5.8 0 0 1 14.5 0q2.35 0 3.925 1.575T20 5.5q0 1.15-.387 2.25-.388 1.1-1.363 2.412-.975 1.313-2.625 2.963T11.45 17.05z"
      />
    </Svg>
  );
};

export default MyFavIcon;
