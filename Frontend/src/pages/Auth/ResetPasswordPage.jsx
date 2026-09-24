/**
 * PragatiPath — Reset Password Page
 * Cryptographic token-based password reset interface matching PragatiPath visual system:
 * Warm cream background (#FAF8F5), deep orange accent (#FF5500), dark navy text (#0B1320),
 * glassmorphism card, and real backend API validation.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
  MdErrorOutline,
  MdArrowBack,
  MdCheck,
  MdClose,
} from 'react-icons/md';
import { Logo } from '../../components/shared/Logo';
import { resetPassword, forgotPassword } from '../../services/api';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  // Password state (when token is provided)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Request new link state (if no token or token expired)
  const [requestEmail, setRequestEmail] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Validation rules
  const hasMinLength = newPassword.length >= 6;
  const hasMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!hasMinLength) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify both fields.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await resetPassword({ token, password: newPassword });
      if (res.error) {
        setErrorMsg(res.error || 'Password reset failed. The link may have expired.');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestNewLink = async (e) => {
    e.preventDefault();
    if (!requestEmail || !requestEmail.trim()) return;
    setIsRequesting(true);
    setErrorMsg('');

    try {
      await forgotPassword({ email: requestEmail.trim() });
      setRequestSent(true);
    } catch (err) {
      // Always treat gently to avoid user enumeration
      setRequestSent(true);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="min-h-screen min-h-dvh bg-[#FAF8F5] flex flex-col justify-start sm:justify-center items-center py-6 px-3 sm:px-6 lg:px-8 font-sans antialiased text-[#0B1320] bg-technical-grid relative overflow-x-hidden">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF5500]/[0.05] rounded-full blur-3xl"
      />

      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#E8E1D5] p-5 sm:p-8 relative z-10 my-auto">
        {/* Header Logo */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#E8E1D5]">
          <Logo size="md" variant="default" to="/" />
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#FF5500] transition-colors"
          >
            <MdArrowBack size={16} />
            Back to Sign In
          </Link>
        </div>

        {/* State 1: Reset Success */}
        {success ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <MdCheckCircle size={32} />
            </div>
            <h2 className="text-xl font-extrabold text-[#0B1320] mb-2 tracking-tight">
              Password Reset Successfully
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed mb-6">
              Your password has been updated securely. You can now use your new password to access your PragatiPath workspace.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 px-6 bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all tracking-wide"
            >
              Sign In Now
            </button>
          </div>
        ) : !token ? (
          /* State 2: No token provided in URL — Request Reset Link */
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-[#0B1320] tracking-tight mb-2">
                Forgot Your Password?
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Enter your registered email address and we'll dispatch a secure reset link to your inbox.
              </p>
            </div>

            {requestSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs mb-6">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <span>Reset link dispatched</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  If an account exists for <span className="font-semibold">{requestEmail}</span>, a secure reset link has been sent. Please check your inbox and spam folder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestNewLink} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <MdErrorOutline size={16} className="shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-[#0B1320] mb-1.5">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="username"
                    required
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder=""
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isRequesting}
                  className="w-full py-3 px-6 bg-[#0B1320] hover:bg-[#1A2332] text-white text-xs font-bold rounded-full shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isRequesting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <span>Send Reset Instructions</span>
                  )}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* State 3: Token present — Set New Password */
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-[#0B1320] tracking-tight mb-2">
                Set New Password
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Choose a strong password with at least 6 characters for your PragatiPath workspace.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 mb-4">
                <MdErrorOutline size={16} className="shrink-0 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <span>{errorMsg}</span>
                  <div className="mt-2">
                    <Link
                      to="/login"
                      className="font-bold underline text-[#FF5500] hover:text-[#E04B00]"
                    >
                      Request a new password reset link
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1320] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <MdLockOutline size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    autoComplete="new-password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder=""
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1320] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <MdLockOutline size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=""
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 transition-all"
                  />
                </div>
              </div>

              {/* Requirement Checkpoints */}
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E1D5] space-y-1.5">
                <div className="flex items-center gap-2 text-[11px]">
                  {hasMinLength ? (
                    <MdCheck className="text-emerald-600 shrink-0" size={14} />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shrink-0" />
                  )}
                  <span className={hasMinLength ? 'text-emerald-700 font-medium' : 'text-[#64748B]'}>
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  {hasMatch ? (
                    <MdCheck className="text-emerald-600 shrink-0" size={14} />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block shrink-0" />
                  )}
                  <span className={hasMatch ? 'text-emerald-700 font-medium' : 'text-[#64748B]'}>
                    Passwords match
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !hasMinLength || !hasMatch}
                className="w-full py-3 px-6 bg-[#FF5500] hover:bg-[#E04B00] disabled:bg-stone-300 text-white text-xs font-bold rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <span>Update Password & Continue</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
