'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, Droplets, FlaskConical, Sprout, Wheat } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { ROTATION_PLANS } from '@/data/mockData'
import { rankPlans } from '@/lib/scoring'
import { useAppStore } from '@/store/useAppStore'

const comparisons = [
  { key: 'water', label: 'كفاءة المياه · توضيحية', Icon: Droplets },
  { key: 'soil', label: 'إدارة التربة · توضيحية', Icon: Sprout },
  { key: 'productivity', label: 'ملاءمة إنتاجية · توضيحية', Icon: Wheat },
] as const

export default function RotationComparisonPage() {
  const { farmer, onboardingAnswers, comparisonPlanIds } = useAppStore()
  const priority = farmer?.priority ?? onboardingAnswers.priority
  const scoredPlans = useMemo(() => rankPlans(ROTATION_PLANS, priority), [priority])
  const plans = comparisonPlanIds.slice(0, 2).map((id) => scoredPlans.find((plan) => plan.id === id)).filter((plan) => plan !== undefined)

  return (
    <PageLayout wide>
      <div className="breadcrumb"><Link href="/farmer/planner">خطط الزراعة</Link><span>›</span><strong>مقارنة الخطط</strong></div>
      <div className="page-topline"><div><span className="eyebrow">مقارنة جانبية · درجات توضيحية</span><h1 className="page-title">شوف الفرق بين الخطط</h1><p className="page-subtitle">المؤشرات والدرجات هنا للمقارنة فقط، ولا تمثل احتمال نجاح أو نتائج حقلية.</p></div><Link className="button-secondary" href="/farmer/planner"><ArrowRight size={15} /> رجوع للخطط</Link></div>
      {plans.length < 2 ? (
        <div className="surface empty-state"><span className="empty-icon"><FlaskConical size={23} /></span><h3>اختار خطتين للمقارنة</h3><p>ارجع للمخطط وحدد خطتين على الأقل من أزرار «قارن الخطة».</p><Link href="/farmer/planner" className="button-primary">افتح المخطط <ArrowLeft size={15} /></Link></div>
      ) : (
        <>
          <div className="comparison-grid">
            {plans.map((plan) => <section key={plan.id} className="comparison-card"><div className="page-topline" style={{ marginBottom: 12 }}><div><span className="chip">{plan.nameAr}</span><h2 style={{ color: 'var(--forest)', margin: '12px 0 4px', fontSize: 29 }}>{plan.score}<small style={{ color: 'var(--muted)', fontSize: 12 }}> / ١٠٠</small></h2><p style={{ margin: 0 }}>تقييم تجريبي بالأوزان المختارة</p></div><span className="chip green">ترتيب {plan.rank}</span></div><div className="progress-track"><span className="progress-fill" style={{ display: 'block', width: `${plan.score}%` }} /></div><div className="section-head" style={{ margin: '21px 0 12px' }}><h3 style={{ margin: 0, color: 'var(--forest)', fontSize: 14 }}>تسلسل المواسم</h3></div>{plan.seasons.map((season, index) => <div key={index} className="check-row" style={{ padding: '8px 0', borderBottom: '1px solid #edf0e9' }}><span className="chip">{season.seasonAr}</span><strong>{season.cropAr}</strong><span style={{ marginInlineStart: 'auto', color: 'var(--muted)', fontSize: 10 }}>{season.plantingWindow}</span></div>)}{comparisons.map(({ key, label, Icon }) => <div key={key} className="comparison-row"><span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon size={13} />{label}</span><span className="comparison-bar"><span style={{ width: `${plan.scores[key]}%` }} /></span><span className="comparison-score">{plan.scores[key]}</span></div>)}<div className="notice gold" style={{ marginTop: 17 }}><span>قد تختلف الملاءمة المحلية بسبب بيانات التربة والمياه غير المتاحة هنا.</span></div></section>)}
          </div>
          <div className="notice" style={{ marginTop: 16 }}><FlaskConical size={17} /><span><strong>البيانات الناقصة:</strong> لا تتوفر نتائج تحليل مخبري للتربة، أو تقدير موثوق لتوفر المياه، أو أسعار مدخلات محلية. لم نعرض تكلفة حتى لا نخترع رقمًا.</span></div>
        </>
      )}
    </PageLayout>
  )
}
