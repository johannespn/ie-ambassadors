import { Oval } from "react-loader-spinner";

export function LoadingSpinner({
  height,
  width,
  color,
  secondaryColor,
}: {
  height: number;
  width: number;
  color: string;
  secondaryColor?: string;
}) {
  return (
    <Oval
      height={height}
      width={width}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      color={color}
      secondaryColor={secondaryColor ? secondaryColor : color}
      strokeWidth={6}
      strokeWidthSecondary={2}
    />
  );
}
