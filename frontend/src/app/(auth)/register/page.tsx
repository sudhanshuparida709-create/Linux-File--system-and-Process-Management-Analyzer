
import type { Metadata } from "next";
import AuthCard from "@/features/auth/components/AuthCard";
import RegisterForm from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an account for Linux System Manager.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Your Account"
      description="Register to start managing your Linux file system, processes, and system resources."
    >
      <RegisterForm />
    </AuthCard>
  );
}
