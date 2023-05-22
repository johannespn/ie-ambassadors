import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/static/images/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/images/favicon-16x16.png"
        />
      </Head>
      <body className="min-h-screen w-screen max-w-full overflow-x-hidden text-md 2xl:text-lg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
