'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PageLayout({
  children,
  wide = false,
  fullBleed = false,
}: {
  children: React.ReactNode
  wide?: boolean
  fullBleed?: boolean
}) {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <div className={fullBleed ? '' : wide ? 'page-content wide' : 'page-content'}>{children}</div>
      </main>
      <footer className="site-footer">
        <div>أرضنا — تجربة توضيحية للتخطيط الزراعي متعدد المواسم.</div>
        <div style={{ marginTop: 5 }}>البيانات والدرجات المعروضة توضيحية، ولا تمثل قياسات حية أو توصيات زراعية معتمدة.</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
          <Link href="/science">المنهجية العلمية</Link>
          <Link href="/about">عن أرضنا</Link>
        </div>
      </footer>
    </>
  )
}
