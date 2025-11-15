import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareSync - All in One App',
  description: 'Медицинское приложение для записи к врачу',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2196F3" />
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className="safe-area" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

