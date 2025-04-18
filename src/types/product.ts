export type TDepartment = {
  map: any;
  length: number;
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TCategory = {
  subcategories: any;
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

export type TPopularProduct = {
  totalSold: number;
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: TCategory;
  brand: string;
};
