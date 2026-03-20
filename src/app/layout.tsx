import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Analytics } from "@vercel/analytics/next";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heartopia Wiki",
  description: "두근두근타운 정보 위키 - 원예, 채집, 동물, 요리 공략",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌸</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="antialiased">
        <div
          className="flex min-h-screen flex-col"
          style={{
            background: "#fffcf8",
            color: "#4a3060",
          }}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
