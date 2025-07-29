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
          <Text key={i}>
            {entry.name}: {entry.value}
          </Text>
        ))}
      </Flex>
    </Card>
  );
};

export default CustomToolTip;
