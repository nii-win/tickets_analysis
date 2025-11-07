import type { FC } from "react";
import type { LabelProps } from "recharts";

type propsType = LabelProps & {
  fontsize?: number;
};

// バーラベルの表示位置をy軸にはみ出さない無いように調整するためのカスタムコンポーネント
const CustomBarLabel: FC<propsType> = ({
  x,
  y,
  width,
  height,
  value,
  fontsize = 14,
}) => {
  // const { x, y, width, height, value } = props;
  // 40：ラベルの最大幅が大体40と想定されるため
  const shortBar = width && Number(width) < 40;
  const xPosition = shortBar
    ? Number(x) + Number(width) + 2 // 短いときはバーの終わりから右に少し離す
    : Number(x) + Number(width) - 2; // バーの終わりから左に少し離す
  // ラベルは整数はそのまま、小数点は第2位で切り上げ表示
  const num = Number(value);
  const displayValue = num === 0 ? "" : num % 1 === 0 ? num : num.toFixed(2);
  return (
    <text
      x={xPosition}
      y={Number(y) + Number(height) / 2 + 4} // 高さの中央に表示するために調整
      //バーが短いならテキストのはじまりをx位置に合わせる、長いならテキストの終わり位置をx位置に合わせて表示
      textAnchor={shortBar ? "start" : "end"}
      fontSize={fontsize}
      fill={"#808080"}
    >
      {displayValue}
    </text>
  );
};

export default CustomBarLabel;
