export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: string;
  profileImg?: string;
  isDeleted: string;
  iat: number;
  exp: number;
  createdAt: string;
  updatedAt: string;
};
