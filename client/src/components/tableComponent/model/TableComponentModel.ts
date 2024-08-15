import {ColumnsType} from 'antd/es/table';

export type TableComponentModel<T> = {
  data: {
    loading?: boolean;
    loadingTitle?: string;
    columns: ColumnsType<T>;
    dataSource: T[];
    handleTableChange?: () => Promise<void> | void;
    page: number,
    pageSize: number,
    total: number,
    totalTitle: string,
    scroll?: {x: number, y: number}
  };
};
