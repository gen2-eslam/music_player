import Svg, { Path, SvgProps } from "react-native-svg";

export const PlayMusicIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width ?? 30}
      height={props.height ?? 30}
      fill="none"
      viewBox="0 0 30 30"
    >
      <Path
        fill="#000000"
        d="M11.25 21.75 21.75 15l-10.5-6.75zM15 30q-3.112 0-5.85-1.181t-4.762-3.206Q2.362 23.588 1.18 20.85.001 18.113 0 15q0-3.112 1.181-5.85t3.207-4.762Q6.413 2.362 9.15 1.18 11.888.001 15 0q3.112 0 5.85 1.181t4.762 3.207q2.026 2.025 3.207 4.762Q29.999 11.888 30 15q0 3.112-1.181 5.85t-3.206 4.762q-2.025 2.026-4.763 3.207Q18.113 29.999 15 30"
      />
    </Svg>
  );
};
