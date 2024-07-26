import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import style from "./layout.module.scss";
import Link from "next/link";

export const metadata: Metadata = {
  title: "레크레이션 툴",
  description: "레크레이션을 위한 툴",
};

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard/woff2-subset/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/woff2-subset/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/woff2-subset/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className={style.body}>
        <Link href="/">
          <h1 className={style.title}>레크레이션 모음집</h1>
        </Link>
        <main className={style.main}>{children}</main>
      </body>
    </html>
  );
}
