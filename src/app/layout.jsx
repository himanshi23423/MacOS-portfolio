import "../styles/index.css";

export const metadata = {
  title: "portfolio",
  description: "macOS portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
