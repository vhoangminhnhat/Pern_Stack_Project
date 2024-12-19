import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
} from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import {
  createFormRules,
  getFormInitialVals,
} from "utils/helpersInTs/helpersInTs";
import {
  MultiSelectOps,
  SelectOps,
  TreeSelectOps,
} from "../selectComponent/model/SelectOpsModel";
import { DetailActionsType } from "./model/ActionsComponentModel";
import { AuthenticationContext } from "context/AuthenticationContext";

const ActionsComponent = <T extends Object>(props: DetailActionsType<T>) => {
  const { data, info } = props;
  const {localStrings} = AuthenticationContext();
  return (
    <>
      {data?.map((item) => {
        return (
          <Col span={24} lg={!!item?.colLg ? item?.colLg : 24}>
            <Form.Item
              key={item?.name}
              name={item?.name}
              label={item?.label}
              rules={createFormRules(
                item?.createFormRules?.stricted,
                item?.createFormRules?.type,
                item?.createFormRules?.message
              )}
              initialValue={
                !item?.initialVals
                  ? getFormInitialVals<T>(info, item?.detailKey as keyof T)
                  : item?.initialVals
              }
            >
              {item?.type === "date" ? (
                <span style={{ fontWeight: "bold" }}>
                  {moment(item?.initialVals as string).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </span>
              ) : item?.type === "input" && item?.pointerEvents === false ? (
                <Input style={item?.style} placeholder={item?.placeholder} className="rounded-lg" />
              ) : item?.forPhone === true && item?.type === "input" ? (
                <Input
                style={item?.style}
                  placeholder={item?.placeholder}
                  className="rounded-lg border-gray-300"
                  maxLength={10}
                  prefix={item?.icon}
                />
              ) : item?.type === "input-number" ? (
                <InputNumber<number>
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  style={{ width: "100%" }}
                />
              ) : item?.type === "input" && item?.pointerEvents === true ? (
                <Input
                  placeholder={item?.placeholder}
                  style={{
                    pointerEvents: isEmpty(info) ? "all" : "none",
                  }}
                  className="rounded-lg border-gray-300"
                />
              ) : item?.type === "select" ? (
                <Select
                  defaultValue={getFormInitialVals<T>(
                    info,
                    item?.detailKey as keyof T
                  )}
                  allowClear={item?.allowClear === true ? true : false}
                  onSelect={(value) => item?.onSelect && item?.onSelect!(value)}
                  onChange={(value) => item?.onChange && item?.onChange!(value)}
                  placeholder={item?.placeholder}
                  options={item?.options as SelectOps[]}
                  showSearch
                  disabled={item?.disableForSelect === true ? true : false}
                  style={{
                    pointerEvents:
                      item?.pointerEvents === true ? "none" : "all",
                  }}
                  filterOption={(inputValue, option) => {
                    if (typeof option?.label === "string") {
                      return option?.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase());
                    }
                    return false;
                  }}
                />
              ) : item?.type == "tree-select" ? (
                <TreeSelect
                  style={{ width: "100%" }}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  showSearch
                  filterTreeNode={(inputValue, treeNode) => {
                    if (typeof treeNode.title === "string") {
                      return treeNode.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase());
                    }
                    return false;
                  }}
                  onSelect={(value) => item?.onSelect && item?.onSelect!(value)}
                  onChange={(value) => item?.onChange && item?.onChange!(value)}
                  treeData={item?.options as any}
                  placeholder={item?.placeholder}
                  treeDefaultExpandAll
                />
              ) : item?.type === "password" ? (
                <Input.Password
                  placeholder={item?.placeholder}
                  className="rounded-lg border-gray-300"
                />
              ) : item?.type === "multi-select" ? (
                <Select
                  mode="multiple"
                  allowClear={item?.allowClear === true ? true : false}
                  onSelect={(value) => item?.onSelect && item?.onSelect!(value)}
                  onChange={(value) => item?.onChange && item?.onChange!(value)}
                  placeholder={item?.placeholder}
                  options={item?.options as MultiSelectOps}
                  showSearch
                  disabled={item?.disableForSelect === true ? true : false}
                  style={{
                    pointerEvents:
                      item?.pointerEvents === true ? "none" : "all",
                  }}
                  filterOption={(inputValue, option) =>
                    option?.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                />
              ) : item?.type === "dynamic-form" ? (
                <Form.List name={[item.name, "country"]}>
                  {(fields, { add, remove }) => (
                    <div
                      style={{
                        display: "flex",
                        rowGap: 16,
                        flexDirection: "column",
                      }}
                    >
                      {fields.map((field) => (
                        <Card
                          size="small"
                          key={field.key}
                          extra={
                            <CloseOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          }
                        >
                          <Form.Item name={[field.name, "id"]}>
                            <Select
                              placeholder="Select a country"
                              options={item.countries}
                              fieldNames={{ label: "name", value: "id" }}
                            />
                          </Form.Item>

                          <Form.Item>
                            <Form.List name={[field.name, "roamingPartner"]}>
                              {(subFields, subOpt) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: 16,
                                  }}
                                >
                                  {subFields.map((subField) => (
                                    <div
                                      key={subField.key}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 8,
                                      }}
                                    >
                                      <Form.Item name={[subField.name, "id"]}>
                                        <Select
                                          placeholder="Select a roaming partner"
                                          options={item.roamingPartners}
                                          fieldNames={{
                                            label: "name",
                                            value: "id",
                                          }}
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        name={[subField.name, "handSet"]}
                                      >
                                        <Input placeholder="Handset" />
                                      </Form.Item>
                                      <Form.Item
                                        name={[
                                          subField.name,
                                          "codeMobileDevice",
                                        ]}
                                      >
                                        <Input placeholder="Code Mobile Device" />
                                      </Form.Item>
                                      <Form.Item
                                        name={[
                                          subField.name,
                                          "transferredAccountDataInterchangeGroup",
                                        ]}
                                      >
                                        <Input placeholder="Transferred Account Data Interchange Group" />
                                      </Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() =>
                                          subOpt.remove(subField.name)
                                        }
                                        style={{ alignSelf: "flex-end" }}
                                      >
                                        Remove Partner
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="dashed"
                                    onClick={() => subOpt.add()}
                                    block
                                  >
                                    {
                                      localStrings.RoamingManagement.RoamingPartner
                                        .Add
                                    }
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Form.Item>
                        </Card>
                      ))}
                      <Button type="dashed" onClick={() => add()} block>
                        + Add Country
                      </Button>
                    </div>
                  )}
                </Form.List>
              ) : (
                <Input.TextArea
                  placeholder={item?.placeholder}
                  style={{
                    overflow: "hidden",
                    pointerEvents:
                      item?.pointerEvents === true ? "none" : "all",
                  }}
                />
              )}
            </Form.Item>
          </Col>
        );
      })}
    </>
  );
};

export default ActionsComponent;
