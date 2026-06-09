import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-6">
      <Logo />
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Skein 시작하기</CardTitle>
          <CardDescription>
            14일 무료 — 카드 등록 없이 브랜드 룸부터
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ws">워크스페이스 이름</Label>
            <Input id="ws" placeholder="우리 에이전시" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">업무용 이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@agency.com"
              autoComplete="email"
            />
          </div>
          <Button className="w-full" render={<Link href="/dashboard" />}>
            워크스페이스 만들기
          </Button>
          <Button
            variant="outline"
            className="w-full"
            render={<Link href="/dashboard" />}
          >
            Google로 가입
          </Button>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="ml-1 font-medium text-primary">
            로그인
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
