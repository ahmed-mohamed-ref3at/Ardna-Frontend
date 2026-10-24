'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, CircleAlert, NotebookPen, PencilLine, Sprout } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { ROTATION_PLANS } from '@/data/mockData'
import { useAppStore } from '@/store/useAppStore'

export default function MyPlanPage() {
  const router = useRouter()
  const { farmer, selectedPlanId, onboardingAnswers } = useAppStore()
  const currentPlanId = farmer?.selectedPlanId ?? selectedPlanId
  const plan = ROTATION_PLANS.find((item) => item.id === currentPlanId)

  return (
    <PageLayout>
      <div className="breadcrumb"><Link href="/dashboard">لوحة أرضي</Link><span>›</span><strong>خطتي</strong></div>
      {!plan ? (
        <div className="surface empty-state"><span className="empty-icon"><Sprout size={23} /></span><h3>لسه مفيش خطة محفوظة</h3><p>استكشف الخطط التوضيحية، اختر واحدة، وبعدها احفظها في ملفك المحلي.</p><Link href="/farmer/planner" className="button-primary">افتح الخطط <ArrowLeft size={15} /></Link></div>
      ) : (
        <>
          <div className="page-topline"><div><span className="eyebrow">خطتك الزراعية · توضيحية</span><h1 className="page-title">{plan.nameAr}</h1><p className="page-subtitle">خطة متعددة المواسم مرتبطة بأرضك. نوافذ الزراعة والحصاد إرشادية وتحتاج مراجعة محلية.</p></div><span className="chip gold"><CircleAlert size={13} />ليست توصية معتمدة</span></div>
          <div className="notice gold" style={{ marginBottom: 22 }}><CircleAlert size={16} /><span>مواعيد المواسم المعروضة أمثلة توضيحية، وليست مواعيد زراعة معتمدة لمنطقتك.</span></div>
          <section className="surface card-pad">
            <div className="section-head"><span className="eyebrow">المسار الموسمي</span><h2 className="section-title" style={{ marginTop: 8 }}>ثلاثة مواسم في دورة واحدة</h2></div>
            <div className="timeline-list">{plan.seasons.map((season, index) => <article key={index} className="timeline-item"><div className="page-topline" style={{ marginBottom: 6 }}><div><span className="chip">الموسم {index + 1} · {season.seasonAr}</span><h3 style={{ marginTop: 10, fontSize: 20 }}>{season.cropAr}</h3></div><span className="profile-icon"><Sprout size={18} /></span></div><div className="metric-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)', marginTop: 10 }}><div className="metric-card"><span className="metric-label">نافذة الزراعة · إرشادية</span><strong className="metric-value" style={{ fontSize: 15 }}>{season.plantingWindow}</strong></div><div className="metric-card"><span className="metric-label">نافذة الحصاد · إرشادية</span><strong className="metric-value" style={{ fontSize: 15 }}>{season.harvestWindow}</strong></div></div><p>{season.notesAr}</p><div className="check-row"><CalendarDays size={14} />أضف أنشطة فعلية وملاحظاتك في دفتر أرضك.</div></article>)}</div>
          </section>
          <div className="action-row" style={{ justifyContent: 'space-between', marginTop: 19 }}><div className="action-row"><button className="button-secondary" onClick={() => router.push('/farmer/priorities')}><PencilLine size={15} />تعديل الأولوية</button><Link href="/notebook" className="button-secondary"><NotebookPen size={15} />افتح دفتر أرضي</Link></div><div className="action-row"><Link href="/farmer/compare" className="button-quiet"><ArrowRight size={15} />قارن الخطط</Link><Link href="/farmer/planner" className="button-primary">مراجعة الخطط <ArrowLeft size={15} /></Link></div></div>
          {!farmer && <div className="notice" style={{ marginTop: 17 }}><span>الخطة لم تُحفظ في ملف شخصي بعد. <Link className="inline-link" href="/farmer/register">احفظ الخطة في حساب تجريبي ←</Link> الأولوية الحالية: {onboardingAnswers.priority}.</span></div>}
        </>
      )}
    </PageLayout>
  )
}
