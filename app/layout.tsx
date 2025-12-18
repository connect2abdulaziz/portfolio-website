import "./globals.css";
import { Syne, Inter, Source_Code_Pro } from "next/font/google";


// Font setup - Syne as primary font
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Abdul Aziz | Tech Lead / Senior Backend Engineer",
  description: "Abdul Aziz is a Tech Lead / Senior Backend Engineer specializing in NestJS, PostgreSQL, AI/ML Integration, and scalable microservices architecture.",
  keywords: ["backend engineer", "tech lead", "NestJS", "PostgreSQL", "microservices", "AI integration", "real-time systems"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`!scroll-smooth ${syne.variable} ${inter.variable} ${sourceCodePro.variable}`}>
      <body className={`${syne.className} relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}