// src/app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Memo App",
  description: "Secure login system with JWT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blue-900 text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
