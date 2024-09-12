import AnalyticsWrapper from './components/global/AnalyticsWrapper';
import ErrorBoundary from '@/app/components/global/ErrorBoundary';
import Header from './components/global/Header';
import Footer from './components/global/Footer';

import { Outfit } from 'next/font/google';
import './globals.css';
import './utilities.css';

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={outfit.className}>
        <ErrorBoundary>
          <AnalyticsWrapper>
            <div className='site'>
              <Header />

              {children}

              <Footer />
            </div>
          </AnalyticsWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
