import Link from "next/link";

import { Logo } from "@/shared/ui/logo";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-6">
      <Logo />
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">다시 오신 걸 환영해요</CardTitle>
          <CardDescription>
            이메일로 로그인 링크를 보내드려요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@agency.com"
              autoComplete="email"
            />
          </div>
          <Button className="w-full" render={<Link href="/jigeum-lab/dashboard" />}>
            로그인 링크 받기
          </Button>
          <div className="relative text-center text-xs text-muted-foreground">
            <span className="bg-card px-2">또는</span>
            <div className="absolute inset-0 top-1/2 -z-0 border-t" />
          </div>
          <Button
            variant="outline"
            className="w-full"
            render={<Link href="/jigeum-lab/dashboard" />}
          >
            Google로 계속하기
          </Button>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="ml-1 font-medium text-primary">
            가입하기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
