import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Tools Dashboard",
  description: "Plateforme personnelle d’outils utiles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={cn(
          inter.className,
          "bg-neutral-900 text-white min-h-screen"
        )}
      >
        <main className="flex flex-col items-center justify-center h-screen relative">
          {children}
        </main>
      </body>
    </html>
  );
}
