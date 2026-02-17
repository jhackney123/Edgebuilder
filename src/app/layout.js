import "./globals.css";

export const metadata = {
  title: "EdgeBuilder — Sports Betting ML Platform",
  description:
    "Build, train & backtest sports betting machine learning models. No code required.",
  openGraph: {
    title: "EdgeBuilder — Sports Betting ML Platform",
    description:
      "Build, train & backtest sports betting machine learning models. No code required.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
