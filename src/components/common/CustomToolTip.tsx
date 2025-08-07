import { Card, Flex, Typography } from "antd";
import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const CustomToolTip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload || payload.length === 0) return null;
  const { Text } = Typography;

  return (
    <Card
      styles={{
        body: {
          padding: 15,
        },
      }}
    >
      <Flex vertical>
        <Text style={{ marginBottom: 5 }}>{label}</Text>
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
