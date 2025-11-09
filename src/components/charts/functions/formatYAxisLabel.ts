//[\u0020-\u007E] ASCII文字全般（半角英数字、記号、空白）
//[\uFF65-\uFF9F] 半角カタカナのUnicode範囲
const isHalfWidthChar = (char: string) =>
  /[\u0020-\u007E]|[\uFF65-\uFF9F]/.test(char);


const truncateByWidth = (str: string, maxWidth: number) => {
  let truncatedStr = "";
  let currentWidth = 0;

  for (const char of str) {
    currentWidth += isHalfWidthChar(char) ? 0.5 : 1;
    if (currentWidth > maxWidth) break;
    truncatedStr += char;
  }

  return truncatedStr;
};

//YAxisのtickデータは現状支店名か講座名のどちらか
//支店名は9桁の数字 企業コード_支店名(例:123456789 PPP新宿支店)から支店名だけを抽出
//講座名は全角20文字分のみ抽出(y軸幅:250,fontsize:12としているため20文字)
const formatYAxisLabel = (value: string, nameKey: string) => {
  console.log("tick value:", value, "typeof:", typeof value);
  if (nameKey === "department") {
    const underscoreIndex = value.indexOf("_");
    return underscoreIndex !== -1 ? value.slice(underscoreIndex + 1) : value;
  } else {
    return truncateByWidth(value, 20);
  }
};

export default formatYAxisLabel;
