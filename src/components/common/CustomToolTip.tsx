import { Card, Flex, Typography } from "antd";
import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type PropsType = TooltipContentProps<ValueType, NameType> & {
  xAxisKey?: string;
};

const CustomToolTip = ({ active, payload, label, xAxisKey }: PropsType) => {
  if (!active || !payload || payload.length === 0) return null;
  const { Text } = Typography;
  const displayedLabel = xAxisKey === "month" ? `${label}月` : label;

  return (
    <Card
      styles={{
        body: {
          padding: 15,
        },
      }}
    >
      <Flex vertical>
        <Text style={{ marginBottom: 5 }}>{displayedLabel}</Text>
        {payload.map((entry, i) => (
          <Flex key={i} align="center" gap={8}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: entry.color,
                borderRadius: 2,
              }}
            />
            <Text key={i}>
              {entry.name}: {entry.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default CustomToolTip;
