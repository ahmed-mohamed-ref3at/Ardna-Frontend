'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Leaf, UserRound, Menu, X } from 'lucide-react'
import toast from 'react-hot-toast'

const navItems = [
  { href: '/', label: 'الرئيسية' },
  { href: '/farmer', label: 'بوابة المزارع' },
  { href: '/science', label: 'المختبر العلمي' },
  { href: '/atlas', label: 'أطلس الزراعة' },
  { href: '/encyclopedia', label: 'موسوعة المحاصيل' },
  { href: '/about', label: 'من نحن' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, hasHydrated, farmer, logout, loginAsDemoFarmer } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  function openDemo() {
    loginAsDemoFarmer()
    toast.success('تم تحميل أرض أحمد التجريبية')
    router.push('/dashboard')
    setMobileOpen(false)
  }

  function leaveDemo() {
    logout()
    toast.success('تم تسجيل الخروج من الحساب التجريبي')
    router.push('/')
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup" aria-label="أرضنا — الرئيسية">
          <span className="brand-mark"><Leaf size={19} strokeWidth={2.2} /></span>
          <span className="brand-wordmark"><strong>أرضنا</strong><small>ARDNA · أرض تعرفها</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={pathname === item.href ? 'nav-link active' : 'nav-link'}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {hasHydrated && isLoggedIn && farmer ? (
            <>
              <Link href="/dashboard" className="account-link">
                <span className="account-icon"><UserRound size={15} /></span>
                <span>أهلًا يا {farmer.name}</span>
              </Link>
              <button className="header-text-button" onClick={leaveDemo}>خروج</button>
            </>
          ) : (
            <>
              <button className="demo-link" onClick={openDemo}>جرّب البيانات التجريبية</button>
              <Link href="/farmer" className="header-cta">ابدأ بأرضك <span aria-hidden="true">←</span></Link>
            </>
          )}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="التنقل">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          {!isLoggedIn && <button onClick={openDemo}>جرّب أرضنا ببيانات تجريبية</button>}
        </nav>
      )}
    </header>
  )
}
