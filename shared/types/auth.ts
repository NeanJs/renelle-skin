export type SignupPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
