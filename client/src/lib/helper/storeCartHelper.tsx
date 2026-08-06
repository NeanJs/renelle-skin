export function isExpiredCartError(error: any) {
  const status = error?.response?.status;
  const code =
    error?.response?.data?.code || error?.response?.data?.error?.code;

  return status === 401 && code === "woocommerce_rest_missing_nonce";
}
