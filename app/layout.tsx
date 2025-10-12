import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../public/MarteksPersonalUse.otf",
  variable: "--font-circular",
});

export const metadata: Metadata = {
  title: "Edufund - Empowering Students Through Community Support",
  description: "Help deserving students achieve their educational dreams. Every donation creates opportunity, breaks barriers, and builds a brighter future for all.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.variable}>
      <body>{children}</body>
    </html>
  );
}
