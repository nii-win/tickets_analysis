import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useState, type FC } from "react";
import {
  buttonColStyle,
  checkboxGroupStyle,
  colStyle,
  formItemStyle,
  formStyle,
} from "./style";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import type { CompanyAnalysis, Params } from "../../../api/company/types";
import { useQueryClient } from "@tanstack/react-query";

type propsType = {
  companyParams: Params | null;
  setCompanyParams: React.Dispatch<React.SetStateAction<Params | null>>;
};

const CompanyFilter: FC<propsType> = (props) => {
  const { companyParams, setCompanyParams } = props;
  const [isOpen, setIsOpen] = useState(true);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const companyAnalysis = queryClient.getQueryData([
    "companyAnalysis",
    companyParams,
  ]) as CompanyAnalysis | undefined;
  const { Title } = Typography;
  const CheckboxGroup = Checkbox.Group;

  useEffect(() => {
    if (companyAnalysis?.departments) {
      form.setFieldsValue({ department: companyAnalysis.departments });
    }
  }, [companyAnalysis, form]);

  const yearData = [2020, 2021, 2022, 2023, 2024, 2025];
  const monthData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const companyData = ["TPD", "TPE", "TPI", "THD"];

  const yearSelectOptins = yearData.map((year) => ({
    value: year,
    label: `${year}年`,
  }));

  const companySelectOptions = companyData.map((company) => ({
    value: company,
    label: company,
  }));

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields(["year", "month", "company"]);
    //queryKeyで並び順も同じでないと同一データと判断されない為月は昇順で並び替え
    const sortedMonthParams = {
      ...values,
      month: [...values.month].sort((a, b) => a - b),
    };
    setCompanyParams(sortedMonthParams);
  };

  return (
    <>
      <div>
        <Flex align="center" justify="center" style={{ margin: 15 }}>
          <Title level={5} style={{ margin: 0 }}>
            フィルターオプション
          </Title>
          <Button
            size="large"
            type="text"
            onClick={toggleFilter}
            icon={isOpen ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
          />
        </Flex>

        {isOpen && (
          <Card>
            <Form form={form} style={formStyle} layout="vertical">
              <Row gutter={32} align="stretch">
                <Col flex="1 1 0" style={colStyle}>
                  <Form.Item
                    name="company"
                    label="企業名"
                    style={formItemStyle}
                    rules={[
                      { required: true, message: "企業名を選択してください" },
                    ]}
                  >
                    <Select
                      placeholder="企業を選択"
                      options={companySelectOptions}
                    />
                  </Form.Item>
                </Col>
                <Col flex="1 1 0" style={colStyle}>
                  <Form.Item
                    label="年度"
                    name="year"
                    style={formItemStyle}
                    rules={[
                      { required: true, message: "年度を選択してください" },
                    ]}
                  >
                    <Select
                      placeholder="年度を選択"
                      options={yearSelectOptins}
                    />
                  </Form.Item>
                </Col>

                <Col flex="2 1 0" style={colStyle}>
                  <Form.Item
                    label="月"
                    name="month"
                    style={formItemStyle}
                    rules={[
                      {
                        required: true,
                        message: "月を1つ以上選択してください",
                      },
                    ]}
                  >
                    <CheckboxGroup>
                      <Row gutter={[0, 8]}>
                        {monthData.map((month) => (
                          <Col span={4} key={month} style={checkboxGroupStyle}>
                            <Checkbox value={month}>{month}月</Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </CheckboxGroup>
                  </Form.Item>
                </Col>

                <Col flex="0 0 100px" style={buttonColStyle}>
                  <Form.Item style={formItemStyle}>
                    <Button type="primary" onClick={handleSubmit}>
                      分析
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        )}
      </div>
    </>
  );
};

export default CompanyFilter;
