import type { Metadata } from "next";
import Provider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {/* NAVBAR CLIENTE */}
          <Navbar />

          {/* CONTENIDO DE LA APP */}
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
