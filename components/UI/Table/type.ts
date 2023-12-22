type TableColumn<R = unknown> = {
  id: string;
  title: React.ReactNode | React.ReactNode[];
  dataIndex: keyof R;
  render?: (data: any, record: R, idx: number) => React.ReactNode | React.ReactNode[];
};

export type Columns<R = unknown> = TableColumn<R>[];
