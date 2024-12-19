export type SelectOps = {
  label: string;
  value: unknown;
};

export type TreeSelectOps = {
  title: string;
  value: unknown;
  key: unknown;
  children?: Array<{
    title: TreeSelectOps["title"];
    value: TreeSelectOps["value"];
    key: TreeSelectOps["key"];
  }>;
};

export type MultiSelectOps = {
  label: string;
  value: unknown;
}[];
