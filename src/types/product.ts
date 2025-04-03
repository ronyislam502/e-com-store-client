export type TDepartment = {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TCategory = {
  _id: string;
  department: TDepartment;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: TCategory;
  images: string[];
  brand: string;
  quantity: number;
  isStock: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
