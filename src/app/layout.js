import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiveChat from "../components/LiveChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Douglass Hicks Law - Dream Team Legal Representation",
  description: "Elite legal representation from the O.J. Simpson Dream Team. $4.9B verdict winners. Civil rights, personal injury, criminal defense. Free consultation.",
  keywords: "Dream Team lawyer, Carl Douglas attorney, civil rights lawyer, personal injury attorney, criminal defense, Los Angeles lawyer, police brutality attorney",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <LiveChat />
      </body>
    </html>
  );
}
