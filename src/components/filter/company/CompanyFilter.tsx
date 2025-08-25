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
import { useEffect, useMemo, useState, type FC } from "react";
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
import getFiscalInfo from "./functions/getFiscalInfo";

type propsType = {
  companyParams: Params | null;
  setCompanyParams: React.Dispatch<React.SetStateAction<Params | null>>;
};

const CompanyFilter: FC<propsType> = (props) => {
  const { companyParams, setCompanyParams } = props;
  const [selectedFY, setSelectedFY] = useState<number | null>(null);
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

  useEffect(() => {
    form.setFieldsValue({ month: [] });
  }, [selectedFY, form]);

  const { years, allMonths, quarters, companies, getAvailableMonths } =
    getFiscalInfo();

  const monthData = useMemo(
    () => getAvailableMonths(selectedFY),
    [getAvailableMonths, selectedFY]
  );

  const yearOptins = years.map((year) => ({
    value: year,
    label: `FY${String(year).slice(-2)}`,
  }));

  const companyOptions = companies.map((company) => ({
    value: company,
    label: company,
  }));

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields(["year", "month", "company"]);
    // queryKeyで並び順も同じでないと同一データと判断されない為月は昇順で並び替え
    const sortedMonthParams = {
      ...values,
      month: [...values.month].sort((a, b) => a - b),
    };
    setCompanyParams(sortedMonthParams);
  };

  const handleQuarterClick = (range: number[]) => {
    const current: number[] = form.getFieldValue("month") || [];
    const target = monthData.filter((m) => range.includes(m));

    // その四半期が "すべて選択済み" かどうか
  const isAllSelected = target.every((m) => current.includes(m));

  const newValue = isAllSelected
    ? current.filter((m) => !target.includes(m)) // 全部入ってたら外す
    : [...new Set([...current, ...target])]; // 一部 or 0 なら全部追加
    
    form.setFieldsValue({ month: newValue });
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
                    <Select placeholder="企業を選択" options={companyOptions} />
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
                      options={yearOptins}
                      onChange={(value) => {
                        setSelectedFY(value);
                        form.setFieldsValue({ month: [] });
                      }}
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
                    <CheckboxGroup
                      value={form.getFieldValue("month")}
                      onChange={(val) => form.setFieldsValue({ month: val })}
                      style={{ paddingBottom: 8 }}
                    >
                      <Row gutter={[0, 8]}>
                        {allMonths.map((month) => (
                          <Col span={4} key={month} style={checkboxGroupStyle}>
                            <Checkbox
                              value={month}
                              disabled={!monthData.includes(month)}
                            >
                              {month}月
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </CheckboxGroup>
                  </Form.Item>
                  <Flex gap={8} style={{ marginBottom: 8 }}>
                    <Button
                      size="small"
                      onClick={() => {
                        const current = form.getFieldValue("month") || [];
                        if (current.length === monthData.length) {
                          // すでに全選択されていたら解除
                          form.setFieldsValue({ month: [] });
                        } else {
                          // 全部選択
                          form.setFieldsValue({ month: monthData });
                        }
                      }}
                    >
                      全選択
                    </Button>

                    {quarters.map((q) => (
                      <Button
                        key={q.label}
                        size="small"
                        onClick={() => handleQuarterClick(q.range)}
                      >
                        {q.label}
                      </Button>
                    ))}
                  </Flex>
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
