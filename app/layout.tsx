

import AnalyticsWrapper from './components/global/AnalyticsWrapper';
import Header from './components/global/Header';
import Footer from './components/global/Footer';

import { Outfit } from "next/font/google";
import "./globals.css";
import "./utilities.css";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AnalyticsWrapper>
          <div className="site">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </AnalyticsWrapper>
      </body>
    </html>
  );
}
