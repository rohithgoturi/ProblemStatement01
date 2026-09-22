/**
 * PragatiPath — Login Route Wrapper
 * Renders the unified split-screen animated authentication experience in login mode.
 */
import React from 'react';
import AuthPage from '../Auth/AuthPage';

export default function LoginPage() {
  return <AuthPage initialMode="login" />;
}
