import { Empty, Flex } from "antd";
import { type FC } from "react";

const EmptyData: FC = () => {
  return (
    <Flex align="center" justify="center" style={{ height: 200 }}>
      <Empty />
    </Flex>
  );
};

export default EmptyData;
