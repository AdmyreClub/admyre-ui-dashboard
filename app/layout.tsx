import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Influencer Search",
  description: "Data driven marketing for the modern world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footerActionLink: {
            backgroundColor: "white",
            color: "black",
          },
          formButtonPrimary: "bg-black hover:bg-black text-sm normal-case",
          card:"shadow-none "


        },
        variables: {
          colorText: "black",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
