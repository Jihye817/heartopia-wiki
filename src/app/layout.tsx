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
  metadataBase: new URL("https://heartopia-wiki-guide.vercel.app"),
  title: {
    default: "Heartopia Wiki | 두근두근타운 위키",
    template: "%s | 두근두근타운 위키",
  },
  description:
    "두근두근타운(Heartopia) 정보 위키 도감. 원예·낚시·채집·요리·반려동물 공략 정보를 확인하세요.",
  keywords: [
    "두근두근타운",
    "두근두근타운 위키",
    "두근두근타운 도감",
    "두근두근타운 공략",
    "Heartopia",
    "Heartopia Wiki",
    "Heartopia Guide",
    "Heartopia 도감",
    "하토피아",
    "두근두근타운 낚시",
    "두근두근타운 원예",
    "두근두근타운 요리",
  ],
  authors: [{ name: "Heartopia Wiki" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://heartopia-wiki-guide.vercel.app",
    siteName: "Heartopia Wiki",
    title: "Heartopia Wiki | 두근두근타운 위키",
    description:
      "두근두근타운(Heartopia) 정보 위키 도감. 원예·낚시·채집·요리·반려동물 공략 정보를 확인하세요.",
  },
  twitter: {
    card: "summary",
    title: "Heartopia Wiki | 두근두근타운 위키",
    description:
      "두근두근타운(Heartopia) 정보 위키 도감. 원예·낚시·채집·요리·반려동물 공략 정보를 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
