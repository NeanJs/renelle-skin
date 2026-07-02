import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { toast } from "sonner";

type Tab = "login" | "signup";

const HERO =
  "https://images.unsplash.com/photo-1679581356089-e65ea18c7f61?w=1200&h=1800&fit=crop&auto=format&q=80";

// ── Tiny shared input ────────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  rightSlot?: React.ReactNode;
  required?: boolean;
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  rightSlot,
  required,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-[#1C1C1C]"
        style={{ letterSpacing: "0.02em" }}
      >
        {label}
        {required && <span className="text-[#C4836A] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full h-12 px-4 text-sm bg-[#FAFAF9] border rounded-xl outline-none transition-all placeholder:text-[#B8B4AE] ${
            error
              ? "border-[#C4836A] focus:border-[#C4836A] focus:ring-2 focus:ring-[#C4836A]/15"
              : "border-[#E5E2DC] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/8"
          } ${rightSlot ? "pr-11" : ""}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-[#C4836A]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Password field with show/hide ────────────────────────────────────────────
function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: Omit<FieldProps, "type" | "rightSlot">) {
  const [show, setShow] = useState(false);
  return (
    <Field
      id={id}
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder ?? "••••••••"}
      autoComplete={autoComplete}
      required
      rightSlot={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-[#B8B4AE] hover:text-[#0A0A0A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/30 rounded"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}

// ── Social button ────────────────────────────────────────────────────────────
function SocialButton({
  provider,
  icon,
  onClick,
}: {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 w-full h-11 border border-[#E5E2DC] rounded-xl bg-white text-sm font-medium text-[#1C1C1C] hover:bg-[#F8F7F5] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {icon}
      Continue with {provider}
    </button>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-[#E5E2DC]" />
      <span
        className="text-xs text-[#B8B4AE] uppercase tracking-widest"
        style={{ letterSpacing: "0.12em", fontSize: "0.62rem" }}
      >
        or
      </span>
      <div className="flex-1 h-px bg-[#E5E2DC]" />
    </div>
  );
}

// ── Google icon ──────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ── Apple icon ───────────────────────────────────────────────────────────────
function AppleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.068 9.36c-.018-1.854 1.512-2.754 1.584-2.808-0.864-1.26-2.214-1.44-2.7-1.458-1.152-.117-2.25.675-2.835.675-.585 0-1.494-.657-2.448-.639-1.26.018-2.43.738-3.078 1.872-1.314 2.286-.339 5.661.936 7.515.621.9 1.368 1.908 2.34 1.872.936-.036 1.296-.603 2.43-.603 1.134 0 1.458.603 2.448.585.999-.018 1.638-.909 2.25-1.818.711-1.035 1.008-2.043 1.026-2.097-.027-.009-1.962-.756-1.98-2.961l.027.063z"
        fill="#0A0A0A"
      />
      <path
        d="M11.169 3.402c.513-.63.864-1.503.765-2.376-.738.03-1.638.495-2.169 1.125-.477.549-.9 1.44-.789 2.286.828.063 1.674-.423 2.193-1.035z"
        fill="#0A0A0A"
      />
    </svg>
  );
}

// ── Validation helpers ───────────────────────────────────────────────────────
const validateEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ? ""
    : "Please enter a valid email address.";
const validatePassword = (v: string) =>
  v.length >= 8 ? "" : "Password must be at least 8 characters.";
const validateRequired = (v: string, label: string) =>
  v.trim() ? "" : `${label} is required.`;

// ── Main component ───────────────────────────────────────────────────────────
export function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [loginLoading, setLoginLoading] = useState(false);

  // Sign up state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [receiveOffers, setReceiveOffers] = useState(true);
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [signupLoading, setSignupLoading] = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const emailErr = validateEmail(loginEmail);
    const passErr = validateRequired(loginPassword, "Password");
    if (emailErr) errs.loginEmail = emailErr;
    if (passErr) errs.loginPassword = passErr;
    setLoginErrors(errs);
    if (Object.keys(errs).length) return;

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      toast.success("Welcome back!", {
        description: "You have been signed in.",
      });
      navigate("/account");
    }, 1400);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!lastName.trim()) errs.lastName = "Last name is required.";
    const emailErr = validateEmail(signupEmail);
    const passErr = validatePassword(signupPassword);
    if (emailErr) errs.signupEmail = emailErr;
    if (passErr) errs.signupPassword = passErr;
    if (confirmPassword !== signupPassword)
      errs.confirmPassword = "Passwords do not match.";
    setSignupErrors(errs);
    if (Object.keys(errs).length) return;

    setSignupLoading(true);
    setTimeout(() => {
      setSignupLoading(false);
      toast.success("Account created!", {
        description: "Welcome to Renelle Skin — your first kit awaits.",
      });
      navigate("/account");
    }, 1600);
  };

  const handleSocial = (provider: string) => {
    toast.info(`${provider} sign-in`, {
      description: "OAuth integration pending WooCommerce setup.",
    });
  };

  const switchTab = (next: Tab) => {
    setTab(next);
    setLoginErrors({});
    setSignupErrors({});
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 min-h-screen bg-[#F8F7F5] flex">
      {/* ── Left panel — editorial image ─────────────────────────────────── */}
      <div className="hidden lg:block lg:w-[45%] xl:w-[50%] relative overflow-hidden bg-[#EAE8E3] flex-shrink-0">
        <ImageWithFallback
          src={HERO}
          alt="Renelle Skin — luxury skincare editorial"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark gradient at bottom for any overlay text */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Brand stamp */}
        <div className="absolute bottom-10 left-10 text-white">
          <p
            className="text-xs uppercase tracking-widest opacity-60 mb-1"
            style={{ letterSpacing: "0.16em", fontSize: "0.62rem" }}
          >
            Renelle Skin
          </p>
          <p
            className="text-sm font-light opacity-80 max-w-[220px] leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Skincare formulated for your concern. Delivered monthly.
          </p>
        </div>
      </div>

      {/* ── Right panel — auth card ───────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-5 py-12 md:px-10 lg:px-14 xl:px-20">
        <div className="w-full max-w-[420px]">
          {/* Card */}
          <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.08)] px-8 py-10 md:px-10 md:py-12">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <span
                  className="text-xl text-[#0A0A0A]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Renelle Skin
                </span>
              </Link>
            </div>

            {/* Tab toggle */}
            <div
              className="relative flex bg-[#F2F1EF] rounded-full p-1 mb-8"
              role="tablist"
            >
              {/* Sliding indicator */}
              <motion.div
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_1px_6px_rgba(0,0,0,0.1)]"
                animate={{ x: tab === "login" ? 4 : "calc(100% + 0px)" }}
                transition={{ type: "spring", stiffness: 480, damping: 38 }}
              />
              {(["login", "signup"] as Tab[]).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => switchTab(t)}
                  className="relative z-10 flex-1 py-2 text-xs font-medium uppercase tracking-widest transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/20"
                  style={{
                    letterSpacing: "0.1em",
                    fontSize: "0.68rem",
                    color: tab === t ? "#0A0A0A" : "#9C988F",
                  }}
                >
                  {t === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Form area with animated transition */}
            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Login heading */}
                  <div className="mb-7">
                    <h1
                      className="text-2xl text-[#0A0A0A] mb-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        lineHeight: 1.15,
                      }}
                    >
                      Welcome back
                    </h1>
                    <p
                      className="text-sm text-[#9C988F]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Sign in to your Renelle Skin account.
                    </p>
                  </div>

                  {/* Login form */}
                  <form onSubmit={handleLogin} noValidate className="space-y-4">
                    <Field
                      id="login-email"
                      label="Email address"
                      type="email"
                      value={loginEmail}
                      onChange={(v) => {
                        setLoginEmail(v);
                        if (loginErrors.loginEmail)
                          setLoginErrors((e) => ({ ...e, loginEmail: "" }));
                      }}
                      error={loginErrors.loginEmail}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />

                    <div>
                      <PasswordField
                        id="login-password"
                        label="Password"
                        value={loginPassword}
                        onChange={(v) => {
                          setLoginPassword(v);
                          if (loginErrors.loginPassword)
                            setLoginErrors((e) => ({
                              ...e,
                              loginPassword: "",
                            }));
                        }}
                        error={loginErrors.loginPassword}
                        autoComplete="current-password"
                      />
                      <div className="flex justify-end mt-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            toast.info("Password reset link sent", {
                              description: "Check your email inbox.",
                            })
                          }
                          className="text-xs text-[#9C988F] hover:text-[#0A0A0A] transition-colors focus:outline-none focus-visible:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    <PrimaryButton
                      loading={loginLoading}
                      label="Continue"
                      loadingLabel="Signing in…"
                    />
                  </form>

                  <Divider />

                  <div className="space-y-3">
                    <SocialButton
                      provider="Google"
                      icon={<GoogleIcon />}
                      onClick={() => handleSocial("Google")}
                    />
                    <SocialButton
                      provider="Apple"
                      icon={<AppleIcon />}
                      onClick={() => handleSocial("Apple")}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Sign up heading */}
                  <div className="mb-7">
                    <h1
                      className="text-2xl text-[#0A0A0A] mb-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        lineHeight: 1.15,
                      }}
                    >
                      Join Renelle Skin
                    </h1>
                    <p
                      className="text-sm text-[#9C988F]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Create your account to start your skincare journey.
                    </p>
                  </div>

                  {/* Sign up form */}
                  <form
                    onSubmit={handleSignup}
                    noValidate
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        id="firstName"
                        label="First name"
                        value={firstName}
                        onChange={(v) => {
                          setFirstName(v);
                          if (signupErrors.firstName)
                            setSignupErrors((e) => ({ ...e, firstName: "" }));
                        }}
                        error={signupErrors.firstName}
                        placeholder="Jane"
                        autoComplete="given-name"
                        required
                      />
                      <Field
                        id="lastName"
                        label="Last name"
                        value={lastName}
                        onChange={(v) => {
                          setLastName(v);
                          if (signupErrors.lastName)
                            setSignupErrors((e) => ({ ...e, lastName: "" }));
                        }}
                        error={signupErrors.lastName}
                        placeholder="Smith"
                        autoComplete="family-name"
                        required
                      />
                    </div>

                    <Field
                      id="signup-email"
                      label="Email address"
                      type="email"
                      value={signupEmail}
                      onChange={(v) => {
                        setSignupEmail(v);
                        if (signupErrors.signupEmail)
                          setSignupErrors((e) => ({ ...e, signupEmail: "" }));
                      }}
                      error={signupErrors.signupEmail}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />

                    <PasswordField
                      id="signup-password"
                      label="Password"
                      value={signupPassword}
                      onChange={(v) => {
                        setSignupPassword(v);
                        if (signupErrors.signupPassword)
                          setSignupErrors((e) => ({
                            ...e,
                            signupPassword: "",
                          }));
                      }}
                      error={signupErrors.signupPassword}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                    />

                    <PasswordField
                      id="confirm-password"
                      label="Confirm password"
                      value={confirmPassword}
                      onChange={(v) => {
                        setConfirmPassword(v);
                        if (signupErrors.confirmPassword)
                          setSignupErrors((e) => ({
                            ...e,
                            confirmPassword: "",
                          }));
                      }}
                      error={signupErrors.confirmPassword}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                    />

                    {/* Offers checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={receiveOffers}
                          onChange={(e) => setReceiveOffers(e.target.checked)}
                          className="sr-only"
                          id="receive-offers"
                        />
                        <div
                          className="w-4 h-4 rounded border transition-all"
                          style={{
                            borderColor: receiveOffers ? "#0A0A0A" : "#C4B89A",
                            backgroundColor: receiveOffers
                              ? "#0A0A0A"
                              : "white",
                          }}
                          onClick={() => setReceiveOffers((v) => !v)}
                        >
                          {receiveOffers && (
                            <svg
                              viewBox="0 0 12 12"
                              fill="none"
                              className="w-3 h-3 m-0.5"
                            >
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span
                        className="text-xs text-[#6B6560] leading-relaxed"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Receive skincare tips and exclusive offers from Renelle
                        Skin
                      </span>
                    </label>

                    <PrimaryButton
                      loading={signupLoading}
                      label="Create Account"
                      loadingLabel="Creating account…"
                    />
                  </form>

                  <Divider />

                  <SocialButton
                    provider="Google"
                    icon={<GoogleIcon />}
                    onClick={() => handleSocial("Google")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer links below card */}
          <div className="mt-6 text-center space-y-3">
            <p
              className="text-xs text-[#9C988F]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tab === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => switchTab("signup")}
                    className="text-[#0A0A0A] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => switchTab("login")}
                    className="text-[#0A0A0A] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="#"
                className="text-xs text-[#B8B4AE] hover:text-[#6B6560] transition-colors"
              >
                Terms &amp; Conditions
              </a>
              <span className="text-[#E5E2DC]">·</span>
              <a
                href="#"
                className="text-xs text-[#B8B4AE] hover:text-[#6B6560] transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Primary CTA button ────────────────────────────────────────────────────────
function PrimaryButton({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className="w-full h-12 rounded-xl bg-[#0A0A0A] text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 mt-2 hover:bg-[#1C1C1C] active:bg-[#333] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/30 focus-visible:ring-offset-2"
      style={{ letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </motion.button>
  );
}
