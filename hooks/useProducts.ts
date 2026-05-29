"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  checkOrderPaymentFn,
  checkoutCartFn,
  createOrderFn,
  fetchMyOrders,
  fetchOrder,
  fetchProducts,
  submitOrderFn,
} from "@/apis/product";
import type { IOrder, OrderCreateResponse, OrderDetailResponse } from "@/types/product";

export function useProducts() {
  return useSWR("/products", fetchProducts, { revalidateOnFocus: false });
}

const POLL_STOP = new Set(["completed", "failed"]);

export function useOrder(id: string | null) {
  return useSWR<OrderDetailResponse>(
    id ? `/orders/${id}` : null,
    () => fetchOrder(id!),
    {
      refreshInterval: (data) => {
        const s = data?.data?.status;
        if (s && POLL_STOP.has(s)) return 0;
        return 3000;
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );
}

export function useCheckOrderPayment(id: string | null) {
  return useSWRMutation<
    { data: { paid: boolean; alreadyProcessed: boolean; order: import("@/types/product").IOrder } },
    Error,
    string,
    void
  >(
    id ? `/orders/${id}/check-payment` : "/orders/noop",
    async () => checkOrderPaymentFn(id!),
  );
}

export function useCheckoutCart() {
  return useSWRMutation<
    { data: { orders: import("@/types/product").IOrder[]; qpay: import("@/types/product").QPayInvoice; total: number } },
    Error,
    string,
    string[]
  >("/cart/checkout", async (_key, { arg }) => checkoutCartFn(arg));
}


export function useCreateOrder() {
  return useSWRMutation<OrderCreateResponse, Error, string, string>(
    "/orders",
    async (_key, { arg }) => createOrderFn(arg),
  );
}

export function useSubmitOrder(id: string | null) {
  return useSWRMutation<OrderDetailResponse, Error, string, Record<string, unknown>>(
    id ? `/orders/${id}/use` : "/orders/noop",
    async (_key, { arg }) => submitOrderFn(id!, arg),
  );
}

export function useMyOrders() {
  return useSWR<{ data: IOrder[]; pagination: Record<string, number> }>(
    "/orders",
    fetchMyOrders,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );
}
