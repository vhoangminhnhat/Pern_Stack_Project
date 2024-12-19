import { Col, DatePicker, Form, Input, Select, TreeSelect } from 'antd';
import {
  SelectOps,
  TreeSelectOps,
} from '../selectComponent/model/SelectOpsModel';
import { FilterAttributes } from './model/FilterComponentsModel';

export const FilterComponent = <T extends FilterAttributes[]>(data: T) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <Col span={24} lg={item?.colLg} key={item?.filterName}>
            <div>{item?.labelName}</div>
            {item?.filterType === "input" ? (
              <Form.Item name={item?.filterName}>
                <Input
                  style={{ width: '100%' }}
                  placeholder={item?.placeholder}
                  prefix={item?.prefixIcon}
                />
              </Form.Item>
            ) : item?.filterType === "select" ? (
              <Form.Item name={item?.filterName}>
                <Select
                  defaultValue={item?.defaultValue}
                  showSearch
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  filterOption={(input, options) => {
                    if (typeof options?.label === "string") {
                      return options?.label
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }
                    return false;
                  }}
                  options={item?.options as SelectOps[]}
                  onChange={(value) => !!item?.onChange ? item?.onChange(value) : null}
                />
              </Form.Item>
            ) : item?.filterType === 'range-date' ? (
              <Form.Item name={item?.filterName}>
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  allowClear={false}
                  defaultValue={item?.defaultRangeDay}
                  onChange={(value) => !!item?.onChange ? item?.onChange(value) : null}
                />
              </Form.Item>
            ) : (
              <Form.Item name={item?.filterName}>
                <TreeSelect
                  style={{ width: '100%' }}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  defaultValue={item?.defaultValue}
                  showSearch
                  filterTreeNode={(inputValue, treeNode) => {
                    if (typeof treeNode.title === "string") {
                      return treeNode.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase());
                    }
                    return false;
                  }}
                  treeData={item?.options as any}
                  placeholder={item?.placeholder}
                  treeDefaultExpandAll
                />
              </Form.Item>
            )}
          </Col>
        );
      })}
    </>
  );
};
