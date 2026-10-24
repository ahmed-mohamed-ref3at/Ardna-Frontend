import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'أرضنا | Ardna — من بيانات الأرض إلى قرارات زراعية أفضل',
  description: 'منصة ذكية تساعد المزارع المصري يفهم أرضه، ويختار أولوياته، ويخطط لدورته الزراعية.',
  keywords: 'agriculture, Egypt, NASA, farming, crop rotation, زراعة, مصر',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
