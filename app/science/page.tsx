'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowLeft, CalendarDays, CircleAlert, Droplets, Info, Satellite, Sprout, Wheat } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { PRIORITY_WEIGHTS, ROTATION_PLANS } from '@/data/mockData'
import { calculateScore, rankPlans } from '@/lib/scoring'
import { useAppStore } from '@/store/useAppStore'
import type { Priority } from '@/data/types'

const temperatureData = [
  { month: 'أكتوبر', min: 19, max: 29 }, { month: 'نوفمبر', min: 15, max: 25 }, { month: 'ديسمبر', min: 12, max: 21 },
  { month: 'يناير', min: 10, max: 20 }, { month: 'فبراير', min: 11, max: 22 }, { month: 'مارس', min: 14, max: 26 },
  { month: 'أبريل', min: 17, max: 30 }, { month: 'مايو', min: 21, max: 34 }, { month: 'يونيو', min: 24, max: 36 },
]
const rainData = [
  { month: 'أكتوبر', rain: 9 }, { month: 'نوفمبر', rain: 14 }, { month: 'ديسمبر', rain: 22 }, { month: 'يناير', rain: 19 },
  { month: 'فبراير', rain: 15 }, { month: 'مارس', rain: 9 }, { month: 'أبريل', rain: 4 }, { month: 'مايو', rain: 2 },
]
const priorityLabels: Record<Priority, string> = { water: 'توفير المياه', soil: 'تحسين صحة التربة', productivity: 'إنتاجية عالية', balanced: 'التوازن بين الأهداف' }

export default function ScienceLabPage() {
  const { farmer, onboardingFarm, onboardingAnswers, selectedPlanId, setPriority } = useAppStore()
  const priority = farmer?.priority ?? onboardingAnswers.priority ?? 'balanced'
  const planId = farmer?.selectedPlanId ?? selectedPlanId
  const plan = ROTATION_PLANS.find((item) => item.id === planId) ?? ROTATION_PLANS[0]
  const ranked = rankPlans(ROTATION_PLANS, priority)
  const weights = PRIORITY_WEIGHTS[priority]
  const [et0, setEt0] = useState(5)
  const [kc, setKc] = useState(.8)
  const etc = et0 * kc
  const score = calculateScore(plan, priority)
  const multiplication = (value: number) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2).replace(/0$/, '')

  return (
    <PageLayout wide>
      <div className="breadcrumb"><Link href="/">الرئيسية</Link><span>›</span><strong>المختبر العلمي</strong></div>
      <div className="page-topline"><div><span className="eyebrow">Science Lab · بيانات توضيحية</span><h1 className="page-title">المختبر العلمي</h1><p className="page-subtitle">اكتشف كيف يمكن لبيانات الأرض ومدخلات المزارع أن تدخل في مقارنة مفهومة، وما الذي لا نستطيع استنتاجه.</p></div><span className="chip gold"><Info size={13} />لا توجد بيانات ناسا حية</span></div>
      <div className="notice gold" style={{ marginBottom: 18 }}><CircleAlert size={17} /><span>المخططات والأرقام في هذه الصفحة أمثلة توضيحية متصلة بنموذج الدرجات المحلي. لم يتم جلب بيانات حية من ناسا أو قياس خصائص هذه الأرض.</span></div>

      <div className="dashboard-grid" style={{ marginBottom: 18 }}>
        <section className="surface card-pad"><span className="eyebrow">موقع الدراسة</span><h2 className="section-title" style={{ marginTop: 8, fontSize: 21 }}>{onboardingFarm?.name ?? 'أرض تجريبية قرب دمنهور'}</h2><p className="section-copy">{onboardingFarm ? `${onboardingFarm.governorate} · ${onboardingFarm.district}` : 'موقع توضيحي افتراضي'}</p><div className="farm-map-preview" style={{ marginTop: 15, minHeight: 205 }}><span className="farm-map-polygon" /><span className="chip" style={{ position: 'absolute', right: 14, top: 12 }}>رسم توضيحي · ليس صورة فضائية</span></div></section>
        <section className="surface card-pad"><span className="eyebrow">الخطة المختارة</span><h2 className="section-title" style={{ marginTop: 8, fontSize: 21 }}>{plan.nameAr}</h2><p className="section-copy">الدرجة تحت أولوية «{priorityLabels[priority]}»</p><div className="metric-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)', marginTop: 17 }}><div className="metric-card"><span className="metric-label">Rotation Suitability Index</span><strong className="metric-value">{score}<small style={{ fontSize: 11 }}> / ١٠٠</small></strong></div><div className="metric-card"><span className="metric-label">جودة الأدلة</span><strong className="metric-value" style={{ fontSize: 16 }}>غير محسومة</strong></div></div><div className="notice" style={{ marginTop: 15 }}><span>الدرجة مؤشر مقارنة مركب، وليست احتمال نجاح أو مستوى جودة الأدلة.</span></div></section>
      </div>

      <div className="science-grid">
        <section className="chart-card"><h3>نمط الحرارة الموسمي · مثال</h3><p>درجات مئوية · بيانات تركيبية للشرح وليست رصدًا فعليًا</p><ResponsiveContainer width="100%" height={230}><LineChart data={temperatureData} margin={{ top: 7, right: 8, left: -18, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e8ece5" /><XAxis dataKey="month" tick={{ fontSize: 9, fill: '#748078' }} /><YAxis unit="°" tick={{ fontSize: 9, fill: '#748078' }} /><Tooltip contentStyle={{ direction: 'rtl', borderRadius: 12, border: '1px solid #e5e9e1', fontFamily: 'Cairo' }} /><Legend wrapperStyle={{ fontSize: 10 }} /><Line name="أدنى توضيحي" type="monotone" dataKey="min" stroke="#8cae84" strokeWidth={2} dot={false} /><Line name="أعلى توضيحي" type="monotone" dataKey="max" stroke="#d2a74c" strokeWidth={2.5} dot={false} /></LineChart></ResponsiveContainer></section>
        <section className="chart-card"><h3>سياق الأمطار الموسمي · مثال</h3><p>مم/شهر · قيم توضيحية لا تمثل بيانات GPM الفعلية</p><ResponsiveContainer width="100%" height={230}><BarChart data={rainData} margin={{ top: 7, right: 8, left: -18, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e8ece5" /><XAxis dataKey="month" tick={{ fontSize: 9, fill: '#748078' }} /><YAxis unit=" مم" tick={{ fontSize: 9, fill: '#748078' }} /><Tooltip contentStyle={{ direction: 'rtl', borderRadius: 12, border: '1px solid #e5e9e1', fontFamily: 'Cairo' }} /><Bar name="أمطار توضيحية" dataKey="rain" fill="#719b87" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></section>
      </div>

      <section style={{ marginTop: 27 }}><div className="section-head"><span className="eyebrow">مصادر محتملة للمشروع</span><h2 className="section-title" style={{ marginTop: 8 }}>بيانات مرصودة، تقديرات، ومدخلات المزارع</h2><p className="section-copy">البطاقات تصف مصادر يمكن ربطها لاحقًا. لا توجد اتصالات API في هذا النموذج.</p></div><div className="source-grid">
        <article className="source-card"><span className="chip">NASA · مصدر محتمل</span><h3><Satellite size={15} /> NASA POWER</h3><p>سياق مناخي مثل الحرارة والإشعاع الشمسي. القيم الفعلية والفترة الزمنية غير محملة هنا.</p></article>
        <article className="source-card"><span className="chip">NASA · مصدر محتمل</span><h3><Droplets size={15} /> NASA GPM IMERG</h3><p>تقديرات هطول الأمطار الإقليمية، ولا تكفي وحدها لوصف ري حقل صغير.</p></article>
        <article className="source-card"><span className="chip">NASA · مصدر محتمل</span><h3><Droplets size={15} /> NASA SMAP</h3><p>سياق إقليمي لرطوبة التربة بدقة مكانية خشنة، وليس قياسًا مباشرًا لمزرعة صغيرة.</p></article>
        <article className="source-card"><span className="chip gold">مصدر غير تابع لناسا</span><h3><Sprout size={15} /> SoilGrids · ISRIC</h3><p>تقديرات خصائص التربة على نطاقات مكانية محددة. لا توجد قيمة تربة محلية موثقة لهذه الأرض.</p></article>
        <article className="source-card"><span className="chip green">مدخلات المزارع</span><h3><Wheat size={15} /> سجل الأرض</h3><p>المحصول السابق وطريقة الري وتوفر المياه والأولوية؛ بيانات يضيفها المستخدم.</p></article>
        <article className="source-card"><span className="chip gold">مفقود</span><h3><CircleAlert size={15} /> تحليل ميداني</h3><p>تحليل مخبري للتربة، وقياس ملوحة، وسجل موثق لكميات المياه غير متاحة.</p></article>
      </div></section>

      <section style={{ marginTop: 30 }}><div className="section-head"><span className="eyebrow">من البيانات إلى المقارنة</span><h2 className="section-title" style={{ marginTop: 8 }}>خطوات تفسير واضحة</h2></div><div className="flow-grid">{[
        ['01', 'مصادر ومدخلات', 'تحديد الفترة والدقة وما أدخله المزارع.'], ['02', 'مؤشرات زراعية', 'تلخيص سياق الموسم واحتياج المياه وتسلسل المحاصيل.'], ['03', 'فحص القيود', 'مراجعة توافق الموسم والمياه والمعلومات المتاحة.'], ['04', 'مقارنة موزونة', 'دمج مؤشرات توضيحية حسب أولوية المزارع.'],
      ].map(([number, title, copy]) => <article className="flow-step" key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></article>)}</div></section>

      <section className="surface card-pad" style={{ marginTop: 18 }}><span className="eyebrow">فحص الجدوى</span><h2 className="section-title" style={{ marginTop: 8, fontSize: 21 }}>قيود تحتاج تأكيدًا</h2><div className="profile-grid" style={{ marginTop: 16 }}><article className="profile-card" style={{ cursor: 'default' }}><span className="profile-card-head"><span className="profile-icon"><CalendarDays size={17} /></span><span className="chip gold">غير متحقق</span></span><h3>توافق الموسم</h3><p>نوافذ المواسم أمثلة؛ لم تُحمّل مواعيد زراعية محلية موثقة.</p></article><article className="profile-card" style={{ cursor: 'default' }}><span className="profile-card-head"><span className="profile-icon"><Sprout size={17} /></span><span className="chip gold">بيانات ناقصة</span></span><h3>احتياجات المحصول والبيئة</h3><p>لا توجد قيم محلية للتحقق من حدود الحرارة والتربة والملوحة.</p></article><article className="profile-card" style={{ cursor: 'default' }}><span className="profile-card-head"><span className="profile-icon"><Droplets size={17} /></span><span className="chip gold">مدخل غير موثق</span></span><h3>ظروف الري</h3><p>قد تكون طريقة الري من مدخل المزارع، لكن كمية المياه الفعلية غير مقاسة.</p></article><article className="profile-card" style={{ cursor: 'default' }}><span className="profile-card-head"><span className="profile-icon"><CircleAlert size={17} /></span><span className="chip gold">غير محمل</span></span><h3>قيود محلية مؤكدة</h3><p>لم تُحمّل قيود تنظيمية أو موانع محلية في هذا العرض.</p></article></div><div className="notice gold" style={{ marginTop: 15 }}>كل الخطط ظاهرة كخيارات مبدئية تحت افتراضات العرض؛ لم يجرِ اختبار جدوى زراعية حقيقي أو التحقق من عدم وجود قيود.</div></section>

      <section className="surface card-pad" style={{ marginTop: 30 }}><div className="section-head"><span className="eyebrow">تجربة تفاعلية · توضيحية</span><h2 className="section-title" style={{ marginTop: 8 }}>من NASA Data إلى Rotation Score</h2><p className="section-copy">غيّر الأولوية والأوزان لترى كيف يتغير ترتيب المقارنة. لا تُفسر الدرجة كاحتمال نجاح.</p></div><div className="dashboard-grid">
        <div className="surface card-pad"><label className="form-field"><span>الأولوية الحالية</span><select className="select" value={priority} onChange={(event) => setPriority(event.target.value as Priority)}><option value="water">توفير المياه</option><option value="soil">تحسين صحة التربة</option><option value="productivity">إنتاجية عالية</option><option value="balanced">التوازن بين الأهداف</option></select></label><div className="notice" style={{ marginTop: 15 }}>الأوزان الحالية: مياه {Math.round(weights.water * 100)}٪ + تربة {Math.round(weights.soil * 100)}٪ + إنتاجية {Math.round(weights.productivity * 100)}٪</div><div style={{ marginTop: 20 }} className="score-breakdown">{ranked.map((item) => <div key={item.id} className="score-line"><span>{item.nameAr}</span><span className="comparison-bar"><span style={{ width: `${item.score}%` }} /></span><strong>{item.score}</strong></div>)}</div></div>
        <div className="surface card-pad"><span className="eyebrow">ETc = Kc × ET0</span><h3 style={{ color: 'var(--forest)', margin: '8px 0' }}>مثال حسابي لاحتياج المحصول</h3><p className="section-copy">ET0 تبخر مرجعي · Kc معامل المحصول · ETc تبخر نتح المحصول.</p><div className="form-field" style={{ marginTop: 16 }}><label htmlFor="et0">ET0 · مم/يوم: {multiplication(et0)}</label><input id="et0" type="range" min="1" max="9" step="0.1" value={et0} onChange={(event) => setEt0(Number(event.target.value))} /></div><div className="form-field" style={{ marginTop: 15 }}><label htmlFor="kc">Kc · معامل توضيحي: {multiplication(kc)}</label><input id="kc" type="range" min="0.3" max="1.5" step="0.05" value={kc} onChange={(event) => setKc(Number(event.target.value))} /></div><div className="metric-card" style={{ marginTop: 19, background: '#eff5eb' }}><span className="metric-label">ETc المحسوب في المثال</span><strong className="metric-value">{multiplication(etc)} مم/يوم</strong></div><p className="section-copy" style={{ fontSize: 10 }}>ETc لا يساوي تلقائيًا كمية الري؛ الأمطار الفعالة وكفاءة النظام وظروف الحقل تؤثر أيضًا.</p></div>
      </div></section>

      <div className="dashboard-grid" style={{ marginTop: 18 }}><section className="surface card-pad"><span className="eyebrow">شرح الدرجة المختارة</span><h2 className="section-title" style={{ marginTop: 8, fontSize: 21 }}>{plan.nameAr} · {score}/100</h2><p className="section-copy">Rotation Score = المياه × الوزن + التربة × الوزن + الإنتاجية × الوزن.</p>{(['water', 'soil', 'productivity'] as const).map((dimension) => <div className="comparison-row" key={dimension}><span>{dimension === 'water' ? 'المياه' : dimension === 'soil' ? 'التربة' : 'الإنتاجية'} × {Math.round(weights[dimension] * 100)}٪</span><span className="comparison-bar"><span style={{ width: `${plan.scores[dimension]}%` }} /></span><strong className="comparison-score">{(plan.scores[dimension] * weights[dimension]).toFixed(2)}</strong></div>)}<div className="notice gold" style={{ marginTop: 17 }}><Info size={16} /><span>درجة المقارنة منفصلة عن جودة الأدلة. النتيجة هنا مبنية على أرقام توضيحية وليست على بيانات ناسا.</span></div></section>
        <section className="surface card-pad"><span className="eyebrow">جودة الأدلة منفصلة</span><h2 className="section-title" style={{ marginTop: 8, fontSize: 21 }}>ما نعرفه وما ينقص</h2><div className="timeline-list" style={{ marginTop: 15 }}><div className="timeline-item"><h3>مرصود / مصدر</h3><p>مصادر البيانات مذكورة، لكن لم يتم تحميل قيم فعلية.</p></div><div className="timeline-item"><h3>تقديري</h3><p>الأنماط والدرجات المستخدمة في العرض توضيحية.</p></div><div className="timeline-item"><h3>مدخل من المزارع</h3><p>{(farmer?.previousCrop ?? onboardingAnswers.previousCrop) || 'المحصول السابق غير مسجل'} · {(farmer?.irrigationMethod ?? onboardingAnswers.irrigationMethod) || 'الري غير مسجل'}.</p></div><div className="timeline-item"><h3>مفقود</h3><p>تحليل تربة، كميات مياه، وتحقق محلي من قيود الموسم.</p></div></div></section></div>
      <div className="action-row" style={{ justifyContent: 'space-between', marginTop: 21 }}><Link href="/farmer/planner" className="button-secondary">ارجع لخطط الزراعة <ArrowLeft size={15} /></Link><Link href="/about" className="button-quiet">عن منهج أرضنا</Link></div>
    </PageLayout>
  )
}
