'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { ArrowLeft, Check, CircleHelp, Droplets, FlaskConical, Scale, Sprout, Wheat, X } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { PRIORITY_WEIGHTS, ROTATION_PLANS } from '@/data/mockData'
import { calculateScore, rankPlans } from '@/lib/scoring'
import { useAppStore } from '@/store/useAppStore'
import type { Priority } from '@/data/types'

const priorityNames: Record<Priority, string> = { water: 'توفير المياه', soil: 'تحسين صحة التربة', productivity: 'إنتاجية عالية', balanced: 'التوازن بين الأهداف' }
const cropColors: Record<string, string> = { 'فول بلدي': '#698d5e', سمسم: '#b28a43', قمح: '#bc9c51', ذرة: '#8a9849', برسيم: '#4d895b' }

export default function RotationPlannerPage() {
  const router = useRouter()
  const { farmer, onboardingFarm, onboardingAnswers, selectedPlanId, setSelectedPlan, setPriority, comparisonPlanIds, setComparisonPlans } = useAppStore()
  const priority = farmer?.priority ?? onboardingAnswers.priority ?? 'balanced'
  const rankedPlans = useMemo(() => rankPlans(ROTATION_PLANS, priority), [priority])
  const [explanationId, setExplanationId] = useState<string | null>(null)
  const activeExplanation = ROTATION_PLANS.find((plan) => plan.id === explanationId)
  const explanationScore = activeExplanation ? calculateScore(activeExplanation, priority) : 0
  const weights = PRIORITY_WEIGHTS[priority]

  function toggleCompare(planId: string) {
    if (comparisonPlanIds.includes(planId)) {
      setComparisonPlans(comparisonPlanIds.filter((id) => id !== planId))
      return
    }
    if (comparisonPlanIds.length >= 2) {
      setComparisonPlans([comparisonPlanIds[1], planId])
    } else {
      setComparisonPlans([...comparisonPlanIds, planId])
    }
  }

  function selectPlan(planId: string) {
    setSelectedPlan(planId)
    router.push('/farmer/register')
  }

  return (
    <PageLayout wide>
      <div className="breadcrumb"><Link href="/farmer/profile">بطاقة أرضك</Link><span>›</span><strong>خطط الزراعة</strong></div>
      {!onboardingFarm ? (
        <div className="surface empty-state"><span className="empty-icon"><Sprout size={24} /></span><h3>حدد أرضك الأول</h3><p>الخطط التوضيحية مرتبطة ببيانات أرضك وأولوياتك.</p><Link className="button-primary" href="/farmer">ابدأ تحديد الأرض <ArrowLeft size={15} /></Link></div>
      ) : (
        <>
          <div className="page-topline"><div><span className="eyebrow">مخطط الدورة الزراعية · بيانات توضيحية</span><h1 className="page-title">أزرع إيه بعد كده؟</h1><p className="page-subtitle">قارن بين خطط متعددة المواسم حسب أولويتك. الدرجات مؤشرات تجريبية وليست نسبة نجاح أو توصية زراعية.</p></div><Link href="/farmer/priorities" className="button-secondary"><Scale size={16} />تعديل الأولوية</Link></div>
          <div className="planner-layout">
            <aside className="planner-sidebar">
              <section className="surface card-pad"><span className="eyebrow">أرضك</span><h3 style={{ color: 'var(--forest)', margin: '8px 0 5px', fontSize: 17 }}>{onboardingFarm.name}</h3><p className="section-copy">{onboardingFarm.governorate} · {onboardingFarm.district}</p><div className="chip green" style={{ marginTop: 13 }}>{onboardingFarm.area_feddan} فدان و{onboardingFarm.area_qirat} قيراط تقريبًا</div></section>
              <section className="surface card-pad"><label className="form-field"><span className="eyebrow">أولويتك الحالية</span><select className="select" style={{ marginTop: 6 }} value={priority} onChange={(event) => setPriority(event.target.value as Priority)}><option value="water">توفير المياه</option><option value="soil">تحسين صحة التربة</option><option value="productivity">إنتاجية عالية</option><option value="balanced">التوازن بين الأهداف</option></select></label><p className="section-copy" style={{ fontSize: 11, marginTop: 10 }}>الأوزان: مياه {Math.round(weights.water * 100)}٪ · تربة {Math.round(weights.soil * 100)}٪ · إنتاجية {Math.round(weights.productivity * 100)}٪</p></section>
              <div className="notice gold"><CircleHelp size={16} /><span><strong>تقييم تجريبي للمقارنة،</strong> وليس نسبة نجاح المحصول.</span></div>
              <div className="notice blue"><FlaskConical size={16} /><span>جميع الخطط افتراضية وتحتاج مراجعة محلية مع مختص زراعي.</span></div>
              {comparisonPlanIds.length > 0 && <button className="button-primary" onClick={() => router.push('/farmer/compare')} disabled={comparisonPlanIds.length < 2}>قارن {comparisonPlanIds.length} خطط <ArrowLeft size={15} /></button>}
              <Link className="button-quiet" href="/science"><FlaskConical size={15} />افهم طريقة الحساب</Link>
            </aside>

            <div className="planner-main">
              {rankedPlans.map((plan) => {
                const compared = comparisonPlanIds.includes(plan.id)
                const selected = selectedPlanId === plan.id
                return (
                  <article key={plan.id} className={selected ? 'rotation-card selected' : 'rotation-card'}>
                    <div className="rotation-top"><div><div className="action-row"><span className="chip">الخطة {plan.rank}</span><span className="chip green">ملائمة مبدئيًا في السيناريو</span></div><h3 style={{ marginTop: 9 }}>{plan.nameAr}</h3><p>ترتيب توضيحي للمواسم · يحتاج تحققًا محليًا</p></div><div className="score-badge"><strong>{plan.score}</strong><small>من ١٠٠</small></div></div>
                    <div className="rotation-timeline">{plan.seasons.map((season, index) => <div key={`${plan.id}-${index}`} className="rotation-season"><small>{season.seasonAr}</small><strong style={{ color: cropColors[season.cropAr] ?? 'var(--forest)' }}>{season.cropAr}</strong><span>{season.plantingWindow}</span></div>)}</div>
                    <div className="rotation-metrics"><div className="rotation-metric"><span><Droplets size={11} /> كفاءة المياه · توضيحي</span><strong>{plan.scores.water}/100</strong></div><div className="rotation-metric"><span><Sprout size={11} /> إدارة التربة · توضيحي</span><strong>{plan.scores.soil}/100</strong></div><div className="rotation-metric"><span><Wheat size={11} /> ملاءمة إنتاجية · توضيحي</span><strong>{plan.scores.productivity}/100</strong></div></div>
                    <div className="rotation-footer"><div className="rotation-actions"><button className={compared ? 'button-primary' : 'button-secondary'} onClick={() => toggleCompare(plan.id)}>{compared ? <Check size={13} /> : <Scale size={13} />}{compared ? 'ضمن المقارنة' : 'قارن الخطة'}</button><button className="button-secondary" onClick={() => setExplanationId(plan.id)}><CircleHelp size={13} />ليه الخطة دي؟</button></div><button className="button-primary" onClick={() => selectPlan(plan.id)}>{selected ? 'متابعة حفظ الخطة' : 'اختار الخطة'} <ArrowLeft size={14} /></button></div>
                  </article>
                )
              })}
            </div>
          </div>
        </>
      )}

      {activeExplanation && <div className="side-panel-backdrop" role="presentation" onClick={(event) => event.target === event.currentTarget && setExplanationId(null)}><aside className="side-panel" role="dialog" aria-modal="true" aria-labelledby="explanation-title"><div className="side-panel-head"><div><span className="eyebrow">شرح الخطة · توضيحي</span><h2 id="explanation-title">ليه {activeExplanation.nameAr}؟</h2></div><button className="icon-button" onClick={() => setExplanationId(null)} aria-label="إغلاق"><X size={18} /></button></div><div className="notice"><span>تحت أولوية «{priorityNames[priority]}»، تحصل الخطة على <strong>{explanationScore}/100</strong>. هذه درجة مقارنة وليست احتمال نجاح.</span></div><h3>أسباب المقارنة</h3><ul>{activeExplanation.reasonsAr.map((reason) => <li key={reason}>{reason}</li>)}</ul><h3>معلومات تحتاج تأكيد</h3><p>تحليل تربة ميداني، توفر المياه في الموسم، المواعيد المحلية، والتكاليف والأسعار غير متاحة في هذا العرض. الدرجات لا تعكس يقين الأدلة.</p><h3>لماذا بعض المحاصيل غير موجودة؟</h3><p>الخطط الثلاث تسلسلات ثابتة للتوضيح. المحاصيل الأخرى لم تُستبعد بناءً على قيد زراعي؛ لم تُقيّم بعد بسبب نقص الأدلة المحلية.</p><h3>مفاضلات الخطة</h3><ul>{activeExplanation.tradeoffsAr.map((tradeoff) => <li key={tradeoff}>{tradeoff}</li>)}</ul><div className="notice gold" style={{ marginTop: 18 }}><CircleHelp size={16} /><span>الخطط ليست توصية معتمدة أو توقعًا للمحصول. يجب مراجعتها مع مرشد زراعي.</span></div><Link href={`/science?plan=${activeExplanation.id}`} onClick={() => setSelectedPlan(activeExplanation.id)} className="button-primary" style={{ marginTop: 20 }}><FlaskConical size={15} />عرض التحليل العلمي</Link></aside></div>}
    </PageLayout>
  )
}
