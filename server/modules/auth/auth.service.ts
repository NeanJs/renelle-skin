import type {
  LoginPayload,
  SignupPayload,
} from "../../../shared/types/auth.js";
import { wc } from "../../config/Woocommerce.config.js";

class AuthService {
  async signup(payload: SignupPayload) {
    const { data } = await wc.post("/auth/signup", payload);

    return data;
  }

  async login(payload: LoginPayload) {
    const { data } = await wc.post("/auth/login", payload);

    return data;
  }

  async getCustomer(token: string) {
    const { data } = await wc.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  async updateCustomer(token: string, payload: Partial<SignupPayload>) {
    const { data } = await wc.put("/auth/me", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  async deleteCustomer(token: string) {
    const { data } = await wc.delete("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
export const authService = new AuthService();
