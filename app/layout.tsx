import type { Metadata } from "next";
import { Inter, DM_Sans, Outfit} from "next/font/google";
import "./globals.css";

import AppProviders from "@/components/providers/app-providers";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
// const dmSans = DM_Sans({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Nextract",
  description: "Scrape the heck outa internet like it's your dad's business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    afterSignOutUrl={'/sign-in'}
    appearance={{
      elements: {
        formButtonPrimary: 'bg-primary hover:bg-primary/90 text-sm !shadow-none',
      },
    }}
  >
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <AppProviders>{children}</AppProviders>
        <Toaster richColors />
      </body>
    </html>
  </ClerkProvider>
  );
}
