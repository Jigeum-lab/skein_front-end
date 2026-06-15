import { redirect } from "next/navigation";

// 베타 데모 신청 제거 — 가입은 로그인으로 통합
export default function SignupPage() {
  redirect("/login");
}
