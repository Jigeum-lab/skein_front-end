"use client";

import * as React from "react";

import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

// 로그인 — 매직링크(이메일) + Google OAuth.
// redirectTo는 window.origin 기반이라 로컬/배포가 코드 변경 없이 자동 분기된다.
export function SignInForm() {
  const supabase = React.useMemo(() => createClient(), []);
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState<null | "email" | "google">(null);
  const [error, setError] = React.useState<string | null>(null);

  function callbackUrl() {
    return `${window.location.origin}/auth/callback`;
  }

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading("email");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: callbackUrl() },
    });
    setLoading(null);
    if (error) setError(error.message);
    else setSent(true);
  }

  async function signInWithGoogle() {
    setError(null);
    setLoading("google");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl() },
    });
    // 성공 시 구글로 리다이렉트되므로 이후 처리 없음
    if (error) {
      setError(error.message);
      setLoading(null);
    }
  }

  if (sent) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">메일을 확인해주세요</CardTitle>
          <CardDescription>
            {email} 로 로그인 링크를 보냈어요. 메일의 링크를 누르면 로그인됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setSent(false)}
          >
            다른 이메일로 시도
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">다시 오신 걸 환영해요</CardTitle>
        <CardDescription>이메일로 로그인 링크를 보내드려요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={signInWithEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@agency.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading !== null}>
            {loading === "email" ? "보내는 중…" : "로그인 링크 받기"}
          </Button>
        </form>

        <div className="relative text-center text-xs text-muted-foreground">
          <span className="bg-card px-2">또는</span>
          <div className="absolute inset-0 top-1/2 -z-0 border-t" />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={signInWithGoogle}
          disabled={loading !== null}
        >
          {loading === "google" ? "이동 중…" : "Google로 계속하기"}
        </Button>

        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
