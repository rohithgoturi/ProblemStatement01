/**
 * PragatiPath — Sign Up Route Wrapper
 * Renders the unified split-screen animated authentication experience in signup mode.
 */
import React from 'react';
import AuthPage from '../Auth/AuthPage';

export default function SignupPage() {
  return <AuthPage initialMode="signup" />;
}
