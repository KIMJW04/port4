// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import ConditionalLayout from '@/components/ConditionalLayout';

export const metadata = {
  title: 'Miento',
  description: 'Miento portfolio',
  keywords: ['portfolio', 'Miento', '김진우'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
