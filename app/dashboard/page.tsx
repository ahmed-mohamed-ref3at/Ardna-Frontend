'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, BookOpen, CalendarDays, CircleAlert, MapPinned, RotateCcw, Sprout, Wheat } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '@/components/PageLayout'
import { useAppStore } from '@/store/useAppStore'
import { ROTATION_PLANS } from '@/data/mockData'
import { formatArea } from '@/lib/geo'

const priorityNames = { water: 'توفير المياه', soil: 'تحسين صحة التربة', productivity: 'إنتاجية عالية', balanced: 'التوازن بين الأهداف' }

export default function FarmerDashboardPage() {
  const router = useRouter()
  const { farmer, activities, onboardingFarm, loginAsDemoFarmer, resetDemo } = useAppStore()
  const farm = farmer?.farm ?? onboardingFarm
  const plan = ROTATION_PLANS.find((item) => item.id === farmer?.selectedPlanId)
  const area = farm ? formatArea(farm.area_m2) : null

  function loadDemo() {
    loginAsDemoFarmer()
    toast.success('تم تحميل لوحة أرض أحمد التجريبية')
  }

  function clearDemo() {
    resetDemo()
    toast.success('تمت إعادة بيانات العرض التجريبي')
    router.push('/')
  }

  return (
    <PageLayout wide>
      {!farmer || !farm ? (
        <div className="surface empty-state"><span className="empty-icon"><Sprout size={24} /></span><h3>أهلًا بك في أرضنا</h3><p>أنشئ ملفًا تجريبيًا بعد اختيار أرضك وخطتك، أو حمّل بيانات أحمد لاستكشاف التجربة كاملة.</p><div className="action-row" style={{ justifyContent: 'center' }}><Link href="/farmer" className="button-primary">ابدأ بأرضك <ArrowLeft size={15} /></Link><button className="button-secondary" onClick={loadDemo}>حمّل أرض أحمد التجريبية</button></div></div>
      ) : (
        <>
          <div className="welcome-banner"><span className="eyebrow" style={{ color: '#dfc47e' }}>مساحة المزارع · محفوظة على هذا الجهاز</span><h1>أهلًا يا {farmer.name} 🌿</h1><p>أرضك وخطتك في مكان واحد. آخر تحديث محفوظ محليًا في هذا المتصفح.</p></div>
          <div className="dashboard-grid" style={{ marginTop: 18 }}>
            <div className="dashboard-stack">
              <section className="surface card-pad"><div className="page-topline" style={{ marginBottom: 17 }}><div><span className="eyebrow">ملخص الأرض</span><h2 className="section-title" style={{ marginTop: 7 }}>{farm.name}</h2><p className="section-copy">{farm.governorate} · {farm.district}</p></div><Link href="/farmer/profile" className="button-quiet">تعديل البيانات</Link></div><div className="farm-overview"><div className="farm-map-preview"><span className="farm-map-polygon" /><span className="chip" style={{ position: 'absolute', right: 15, top: 14 }}>معاينة توضيحية · ليست صورة أقمار صناعية</span></div><div className="metric-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}><div className="metric-card"><span className="metric-label">المساحة</span><strong className="metric-value">{area?.feddans} فدان</strong><span className="metric-label">{area?.qirats} قيراط تقريبًا</span></div><div className="metric-card"><span className="metric-label">أولويتك</span><strong className="metric-value" style={{ fontSize: 17 }}>{priorityNames[farmer.priority ?? 'balanced']}</strong></div><div className="metric-card"><span className="metric-label">حدود الأرض</span><strong className="metric-value" style={{ fontSize: 16 }}>{farm.polygon.length} نقاط</strong></div><div className="metric-card"><span className="metric-label">الموسم القادم</span><strong className="metric-value" style={{ fontSize: 16 }}>شتاء ٢٠٢٦/٢٧</strong></div></div></div></section>

              <section className="surface card-pad"><div className="page-topline" style={{ marginBottom: 14 }}><div><span className="eyebrow">الخطة المحفوظة · توضيحية</span><h2 className="section-title" style={{ marginTop: 7 }}>{plan?.nameAr ?? 'لم يتم حفظ خطة بعد'}</h2></div><Link href="/plan" className="inline-link">عرض خطتي ←</Link></div>{plan ? <div className="rotation-timeline">{plan.seasons.map((season, index) => <div key={index} className="rotation-season"><small>{season.seasonAr}</small><strong>{season.cropAr}</strong><span>{season.plantingWindow}</span></div>)}</div> : <div className="notice gold"><CircleAlert size={16} /><span>اختار خطة توضيحية ثم احفظها لتظهر هنا.</span></div>}</section>

              <section className="surface card-pad"><div className="page-topline" style={{ marginBottom: 12 }}><div><span className="eyebrow">دفتر أرضك</span><h2 className="section-title" style={{ marginTop: 7 }}>آخر العمليات</h2></div><Link href="/notebook" className="inline-link">افتح الدفتر ←</Link></div>{activities.length ? <div className="timeline-list">{activities.slice(0, 3).map((activity) => <div key={activity.id} className="timeline-item"><h3>{activity.typeAr}</h3><time>{activity.date}</time><p>{activity.notes || 'بدون ملاحظات'}</p></div>)}</div> : <p className="section-copy">لسه مفيش عمليات مسجلة. أضف أول نشاط من دفتر أرضك.</p>}</section>
            </div>

            <aside className="dashboard-stack">
              <section className="surface card-pad"><span className="eyebrow">خطواتك التالية</span><div className="dashboard-actions" style={{ marginTop: 15 }}><Link className="dashboard-action" href="/plan"><Wheat size={17} /><span style={{ display: 'block', marginTop: 7 }}>عرض خطتي</span></Link><Link className="dashboard-action" href="/farmer/profile"><MapPinned size={17} /><span style={{ display: 'block', marginTop: 7 }}>تعديل بيانات أرضي</span></Link><Link className="dashboard-action" href="/notebook"><BookOpen size={17} /><span style={{ display: 'block', marginTop: 7 }}>دفتر أرضي</span></Link><Link className="dashboard-action" href="/farmer/planner"><CalendarDays size={17} /><span style={{ display: 'block', marginTop: 7 }}>خطط للموسم الجاي</span></Link></div></section>
              <div className="notice gold"><CircleAlert size={17} /><span><strong>معلومات تحتاج تأكيد:</strong> تحليل التربة، كميات المياه، والمواعيد الفعلية غير متاحة في العرض التجريبي.</span></div>
              <section className="surface card-pad"><span className="eyebrow">إعدادات العرض</span><p className="section-copy">بيانات هذا الحساب تجريبية ومحفوظة في متصفحك فقط.</p><button className="button-danger" style={{ marginTop: 13 }} onClick={clearDemo}><RotateCcw size={15} />إعادة ضبط بيانات العرض</button></section>
              <Link className="button-secondary" href="/science">اكتشف التحليل العلمي <ArrowLeft size={15} /></Link>
            </aside>
          </div>
        </>
      )}
    </PageLayout>
  )
}
