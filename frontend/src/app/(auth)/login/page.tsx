
import type { Metadata } from "next";
import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Linux System Manager.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to access your Linux file system and process management dashboard."
    >
      <LoginForm />
    </AuthCard>
  );
}
