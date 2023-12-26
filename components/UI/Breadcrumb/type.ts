type BreadcrumbItem = {
  id: string;
  label: React.ReactNode | React.ReactNode[];
  actived?: boolean;
};

export type BreadcrumbItems = BreadcrumbItem[];
