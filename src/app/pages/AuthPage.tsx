import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { toast } from "sonner";
import {
  Field,
  PasswordField,
  SocialButton,
  Divider,
  GoogleIcon,
  AppleIcon,
  PrimaryButton,
  validateEmail,
  validatePassword,
  validateRequired,
} from "@/app/components/auth";

type Tab = "login" | "signup";

const HERO =
  "https://images.unsplash.com/photo-1679581356089-e65ea18c7f61?w=1200&h=1800&fit=crop&auto=format&q=80";

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
