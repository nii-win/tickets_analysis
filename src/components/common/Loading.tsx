import { Card, Flex, Spin } from "antd";
import { type FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const Loading: FC = () => {
  return (
    <Card >
      <Flex vertical justify="center" style={{ height: 200 }}>
        <Spin tip="Loading" size="large" indicator={<LoadingOutlined spin />}>
          <div style={{ height: 200 }} />
        </Spin>
      </Flex>
    </Card>
  );
};

export default Loading;
