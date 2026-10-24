'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ArrowLeft, ArrowRight, Leaf, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '@/components/PageLayout'
import { useAppStore } from '@/store/useAppStore'
import type { FarmerProfile } from '@/data/types'

export default function DemoRegistrationPage() {
  const router = useRouter()
  const { farmer, onboardingFarm, onboardingAnswers, selectedPlanId, saveFarmerProfile } = useAppStore()
  const [name, setName] = useState(farmer?.name ?? 'أحمد')
  const [contact, setContact] = useState(farmer?.email ?? '')
  const [error, setError] = useState('')

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!onboardingFarm || !selectedPlanId) {
      setError('اختار أرضًا وخطة قبل الحفظ.')
      return
    }
    if (!name.trim()) {
      setError('اكتب الاسم علشان نعرضه في لوحة أرضك.')
      return
    }
    const profile: FarmerProfile = {
      id: farmer?.id ?? `demo-${Date.now()}`,
      name: name.trim(),
      email: contact.trim().includes('@') ? contact.trim() : undefined,
      phone: contact.trim() && !contact.trim().includes('@') ? contact.trim() : undefined,
      farm: onboardingFarm,
      previousCrop: onboardingAnswers.previousCrop || undefined,
      irrigationMethod: onboardingAnswers.irrigationMethod || undefined,
      waterSource: onboardingAnswers.waterSource || undefined,
      waterAvailability: onboardingAnswers.waterAvailability || undefined,
      priority: onboardingAnswers.priority,
      selectedPlanId,
      createdAt: farmer?.createdAt ?? new Date().toISOString(),
    }
    saveFarmerProfile(profile)
    toast.success('اتحفظت خطتك التجريبية على هذا الجهاز')
    router.push('/dashboard')
  }

  if (!onboardingFarm || !selectedPlanId) {
    return <PageLayout><div className="surface empty-state"><span className="empty-icon"><Leaf size={23} /></span><h3>اختار خطة الأول</h3><p>بعد اختيار الخطة، تقدر تحفظها في حساب تجريبي محلي من غير كلمة مرور.</p><Link href="/farmer/planner" className="button-primary">افتح الخطط <ArrowLeft size={15} /></Link></div></PageLayout>
  }

  return (
    <PageLayout>
      <div className="breadcrumb"><Link href="/farmer/planner">خطط الزراعة</Link><span>›</span><strong>حفظ الخطة</strong></div>
      <div className="page-topline"><div><span className="eyebrow">خطتك الزراعية جاهزة 🌱</span><h1 className="page-title">احفظها علشان ترجع لها</h1><p className="page-subtitle">حساب تجريبي يحفظ بيانات غير حساسة في متصفحك فقط. لا يوجد تسجيل دخول حقيقي ولا تُحفظ كلمات مرور.</p></div><span className="chip green"><ShieldCheck size={13} /> حساب تجريبي</span></div>
      <div className="dashboard-grid">
        <form className="surface card-pad" onSubmit={saveProfile}>
          <div className="form-grid">
            <div className="form-field"><label htmlFor="farmer-name">الاسم</label><input id="farmer-name" className="input" value={name} onChange={(event) => setName(event.target.value)} required /></div>
            <div className="form-field"><label htmlFor="farmer-contact">البريد أو الهاتف (اختياري)</label><input id="farmer-contact" className="input" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="لا تستخدم بيانات حساسة" /></div>
          </div>
          {error && <div role="alert" className="notice gold" style={{ marginTop: 16 }}>{error}</div>}
          <div className="notice" style={{ marginTop: 20 }}><ShieldCheck size={17} /><span>سيتم حفظ الاسم ومعلومات الأرض والخطة على هذا الجهاز من خلال التخزين المحلي. لا تكتب بيانات شخصية حقيقية في العرض.</span></div>
          <div className="action-row" style={{ justifyContent: 'space-between', marginTop: 23 }}><button type="button" className="button-quiet" onClick={() => router.push('/farmer/planner')}><ArrowRight size={15} /> رجوع للخطط</button><button className="button-primary" type="submit">احفظ خطتي <ArrowLeft size={15} /></button></div>
        </form>
        <aside className="surface card-pad"><span className="eyebrow">ملخص الحفظ</span><h2 style={{ margin: '10px 0', color: 'var(--forest)', fontSize: 21 }}>{onboardingFarm.name}</h2><p className="section-copy">{onboardingFarm.governorate} · {onboardingFarm.district}</p><div className="metric-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)', marginTop: 18 }}><div className="metric-card"><span className="metric-label">المساحة</span><strong className="metric-value" style={{ fontSize: 20 }}>{onboardingFarm.area_feddan} فدان</strong></div><div className="metric-card"><span className="metric-label">الأولوية</span><strong className="metric-value" style={{ fontSize: 17 }}>{onboardingAnswers.priority === 'water' ? 'توفير المياه' : onboardingAnswers.priority === 'soil' ? 'صحة التربة' : onboardingAnswers.priority === 'productivity' ? 'إنتاجية' : 'توازن'}</strong></div></div><p className="section-copy" style={{ marginTop: 18 }}>ستظهر الخطة المحفوظة في لوحة أرضك، وصفحة خطتي، والمختبر العلمي.</p></aside>
      </div>
    </PageLayout>
  )
}
