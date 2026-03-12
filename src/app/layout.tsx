import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export const metadata: Metadata = {
  title: "Heartopia Wiki",
  description: "두근두근타운 정보 위키 - 원예, 채집, 동물, 요리 공략",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
        </div>
      </body>
    </html>
  );
}
