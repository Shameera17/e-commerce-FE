// auth types
export type IUserInfo = {
  _id: string;
  name: string;
  email: string;
  role: "seller" | "buyer";
};

export type IAction = {
  type: "register" | "login" | null;
  loading: boolean;
};

export interface IAuthReducer {
  userInfo: IUserInfo | null;
  token: null | string;
  action: IAction;
  isModalVisible: boolean;
}

// product
export type IProduct = {
  _id?: string;
  name: string;
  quanity: string;
  originalQuantity: number;
  sellerId?: string;
};

export type IProductAction = {
  type: "create" | "delete" | "fetchOne" | "fetchAll" | null;
  loading: boolean;
};

export interface IProductReducer {
  productInfo: IProduct | null;
  action: IProductAction;
  products: IProduct[] | [];
}

// cart
export type ICartItem = {
  name: string;
  quantity: number;
  sellerId: string;
  productId: string;
  price: number;
  imageFile: string;
};

export type ICartAction = {
  type: "add" | "remove" | null;
  loading: boolean;
};

export interface ICartReducer {
  cartItemInfo: ICartItem | null;
  action: ICartAction;
  cartItems: ICartItem[] | [];
}

export interface ICreatedProduct {
  _id: string;
  name: string;
  originalQuantity: number;
  remainingQuantity: number;
  price: number;
  sellerId: string;
  imageFile: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
