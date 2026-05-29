import { siteUrl } from "@/config/site";
import { HttpRequest } from "@/utils/request";
import type {
  IOrder,
  OrderCreateResponse,
  OrderDetailResponse,
  ProductListResponse,
} from "@/types/product";

const http = new HttpRequest(null, siteUrl);

export const fetchProducts = (): Promise<ProductListResponse> =>
  http.get("/products");

export const createOrderFn = (productId: string): Promise<OrderCreateResponse> =>
  http.post("/orders", { productId });

export const fetchOrder = (id: string): Promise<OrderDetailResponse> =>
  http.get(`/orders/${id}`);

export const checkOrderPaymentFn = (id: string): Promise<{
  data: { paid: boolean; alreadyProcessed: boolean; order: IOrder; updated?: number };
}> => http.post(`/orders/${id}/check-payment`);

export const checkoutCartFn = (productIds: string[]): Promise<{
  data: { orders: import("@/types/product").IOrder[]; qpay: import("@/types/product").QPayInvoice; total: number };
}> => http.post("/cart/checkout", { productIds });

export const submitOrderFn = (
  id: string,
  body: Record<string, unknown>,
): Promise<OrderDetailResponse> => http.post(`/orders/${id}/use`, body);

export const fetchMyOrders = (): Promise<{
  data: IOrder[];
  pagination: Record<string, number>;
}> => http.get("/orders");
