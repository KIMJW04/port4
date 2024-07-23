// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import ConditionalLayout from '@/components/ConditionalLayout';
import { LayerProvider } from '@/context/LayerContext';
import { SocketProvider } from '@/context/SocketContext';

export const metadata = {
  title: 'Miento',
  description: 'Miento portfolio',
  keywords: ['portfolio', 'Miento', '김진우'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SocketProvider>
          <LayerProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </LayerProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
