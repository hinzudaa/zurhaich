export interface IProductMedia {
  url: string;
  type: "image";
  blurHash?: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  media: IProductMedia[];
  warnings: string[];
  category?: { _id: string; name: string };
  sortOrder: number;
}

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "processing"
  | "completed"
  | "failed";

export interface IOrder {
  _id: string;
  status: OrderStatus;
  product: Partial<IProduct>;
  qpayInvoiceId?: string;
  qpayAmount?: number;
  answer?: string;
  createdAt: string;
}

export interface QPayUrl {
  name: string;
  description: string;
  logo: string;
  link: string;
}

export interface QPayInvoice {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  urls: QPayUrl[];
}

export interface ProductListResponse {
  data: IProduct[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export interface OrderCreateResponse {
  data: { order: IOrder; qpay: QPayInvoice };
}

export interface OrderDetailResponse {
  data: IOrder;
}
