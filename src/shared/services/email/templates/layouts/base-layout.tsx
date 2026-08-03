import React from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

interface BaseLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function BaseLayout({ title, children }: BaseLayoutProps) {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <title>{title}</title>
        <style>{`
          body { font-family: sans-serif; line-height: 1.5; color: #333; margin: 0; padding: 0; background-color: #fff; }
        `}</style>
      </head>
      <body>
        <Container>
          <Header title={title} />
          <div style={{ marginBottom: "20px" }}>
            {children}
          </div>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
