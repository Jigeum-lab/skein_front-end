import { Logo } from "@/shared/ui/logo";
import { SignInForm } from "@/features/sign-in-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-6">
      <Logo />
      <SignInForm />
    </div>
  );
}
