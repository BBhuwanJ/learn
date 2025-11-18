import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "10-Day Python Backend Learning Path",
  description: "Master Python backend development in 10 days with hands-on tutorials and real-world projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js" defer></script>
        <script src="https://sql.js.org/dist/sql-wasm.js" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  const root = document.documentElement;
                  if (theme === 'dark') {
                    root.classList.add('dark');
                  } else {
                    root.classList.remove('dark');
                  }
                  
                  // Listen for storage changes across tabs
                  window.addEventListener('storage', function(e) {
                    if (e.key === 'theme') {
                      if (e.newValue === 'dark') {
                        root.classList.add('dark');
                      } else {
                        root.classList.remove('dark');
                      }
                    }
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
