'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CloudSun, Droplets, MapPinned, Sprout, Wheat, FlaskConical, PencilLine } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { useAppStore } from '@/store/useAppStore'
import { formatArea } from '@/lib/geo'

const profileCards = [
  { id: 'climate', title: 'المناخ', icon: CloudSun, badge: 'سياق إقليمي توضيحي', text: 'ملخص موسمي تقديري للحرارة والأمطار، وليس قراءة طقس حية.', detail: 'يستخدم العرض نمطًا موسميًا توضيحيًا لمنطقة الدلتا. في التطبيق المتصل بمصادر فعلية، يمكن ربط ملخص المناخ ببيانات تاريخية مع توضيح الفترة والدقة ومصدر كل متغير.' },
  { id: 'soil', title: 'التربة', icon: Sprout, badge: 'بيانات غير متاحة', text: 'لا توجد نتيجة تحليل تربة موثقة لهذه الأرض.', detail: 'لا توفر صور الأقمار الصناعية تحليلًا مخبريًا دقيقًا لحقل صغير. أضف نتيجة تحليل محلي للتربة عند توفرها؛ قيم pH والملوحة والكربون العضوي غير مقاسة هنا.' },
  { id: 'water', title: 'المياه والري', icon: Droplets, badge: 'مدخلات المزارع', text: 'تُضاف طريقة الري ومصدر المياه في الخطوة التالية.', detail: 'سجل طريقة الري ومصدر المياه ومدى توفرها. هذه المعلومات مدخلات يذكرها المستخدم وليست قياسات مستشعرة.' },
  { id: 'history', title: 'تاريخ الزراعة', icon: Wheat, badge: 'مدخلات المزارع', text: 'أضف آخر محصول زرعته للمساعدة في فهم تسلسل الدورة.', detail: 'تاريخ المحاصيل يوضح ما يختاره المزارع فقط. السجلات الحالية لا تتضمن تحققًا مستقلًا من المحاصيل أو مواعيد زراعتها.' },
]

export default function FarmProfilePage() {
  const { onboardingFarm, onboardingAnswers } = useAppStore()
  const [activeDetail, setActiveDetail] = useState<string | null>(null)
  const activeCard = profileCards.find((card) => card.id === activeDetail)
  const area = onboardingFarm ? formatArea(onboardingFarm.area_m2) : null
  const cropNames: Record<string, string> = { wheat: 'قمح', maize: 'ذرة', 'fava-beans': 'فول بلدي', other: 'محصول آخر' }
  const irrigationNames: Record<string, string> = { surface: 'ري سطحي', drip: 'ري بالتنقيط', sprinkler: 'ري بالرش', unknown: 'غير معروف' }
  const sourceNames: Record<string, string> = { canal: 'ترعة', well: 'بئر', other: 'مصدر آخر', unknown: 'غير معروف' }
  const availabilityNames: Record<string, string> = { mostly: 'متوفرة غالبًا', limited: 'أحيانًا محدودة', uncertain: 'غير مؤكدة' }

  return (
    <PageLayout>
      <div className="breadcrumb"><Link href="/farmer">بوابة المزارع</Link><span>›</span><strong>بطاقة أرضك</strong></div>
      {!onboardingFarm ? (
        <div className="surface empty-state"><span className="empty-icon"><MapPinned size={24} /></span><h3>ابدأ بتحديد أرضك</h3><p>بعد اختيار الموقع ورسم الحدود، ستظهر هنا بطاقة الأرض والمساحة المحسوبة.</p><Link href="/farmer" className="button-primary">حدد أرضك <ArrowLeft size={15} /></Link></div>
      ) : (
        <>
          <div className="page-topline"><div><span className="eyebrow">بطاقة أرضك · تقديري</span><h1 className="page-title">{onboardingFarm.name}</h1><p className="page-subtitle">{onboardingFarm.governorate} · {onboardingFarm.district}{onboardingFarm.village ? ` · ${onboardingFarm.village}` : ''}</p></div><Link className="button-secondary" href="/farmer/map"><PencilLine size={15} /> تعديل الحدود</Link></div>
          <div className="farm-overview">
            <div className="farm-map-preview"><span className="farm-map-polygon" /><div style={{ position: 'absolute', right: 17, top: 16 }} className="chip">معاينة خريطة توضيحية</div><div style={{ position: 'absolute', bottom: 16, right: 17 }} className="chip green"><MapPinned size={13} />{onboardingFarm.governorate} · {onboardingFarm.district}</div></div>
            <div className="surface card-pad">
              <span className="eyebrow">المساحة من الحدود المحفوظة</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}><strong style={{ color: 'var(--forest)', fontSize: 42, lineHeight: 1 }}>{area?.feddans.toLocaleString('ar-EG')}</strong><span style={{ color: 'var(--muted)', fontSize: 14 }}>فدان تقريبًا</span></div>
              <p className="section-copy" style={{ marginTop: 7 }}>{area?.qirats.toLocaleString('ar-EG')} قيراط · {area?.squareMeters.toLocaleString('ar-EG')} متر مربع</p>
              <div className="notice gold" style={{ marginTop: 22 }}><MapPinned size={16} /><span>حساب تقديري من المضلع المرسوم باستخدام مساحة جغرافية كروية. راجع الحدود ميدانيًا قبل أي استخدام عملي.</span></div>
              <div className="action-row" style={{ marginTop: 18 }}><Link href="/farmer/questions" className="button-primary">أضف معلومات الأرض <ArrowLeft size={15} /></Link><Link href="/science" className="button-quiet"><FlaskConical size={15} />مصادر البيانات</Link></div>
            </div>
          </div>

          <div className="section-head" style={{ marginTop: 33 }}><h2 className="section-title">ماذا نعرف عن أرضك؟</h2><p className="section-copy">افتح أي بطاقة لمعرفة المصدر وما الذي يحتاج إلى تأكيد.</p></div>
          <div className="profile-grid">
            {profileCards.map(({ id, title, icon: Icon, badge, text }) => (
              <button key={id} className="profile-card" onClick={() => setActiveDetail(activeDetail === id ? null : id)} aria-expanded={activeDetail === id}>
                <span className="profile-card-head"><span className="profile-icon"><Icon size={19} /></span><span className={id === 'soil' ? 'chip gold' : 'chip green'}>{badge}</span></span>
                <h3>{title}</h3><p>{id === 'water' && onboardingAnswers.irrigationMethod ? `${irrigationNames[onboardingAnswers.irrigationMethod] ?? onboardingAnswers.irrigationMethod} · ${sourceNames[onboardingAnswers.waterSource] ?? 'المصدر غير مسجل'} · ${availabilityNames[onboardingAnswers.waterAvailability] ?? 'التوفر غير مسجل'}` : id === 'history' && onboardingAnswers.previousCrop ? `آخر محصول مسجل: ${cropNames[onboardingAnswers.previousCrop] ?? onboardingAnswers.previousCrop.replace(/^other:/, '')}` : text}</p>
              </button>
            ))}
          </div>
          {activeCard && <section className="profile-detail" aria-live="polite"><div className="profile-card-head"><h3>{activeCard.title} · التفاصيل</h3><button className="button-quiet" onClick={() => setActiveDetail(null)}>إغلاق</button></div><p>{activeCard.detail}</p>{activeCard.id === 'water' && <p style={{ marginTop: 10 }}><strong>المسجل من المزارع:</strong> {irrigationNames[onboardingAnswers.irrigationMethod] ?? 'طريقة الري غير مسجلة'} · {sourceNames[onboardingAnswers.waterSource] ?? 'مصدر المياه غير مسجل'} · {availabilityNames[onboardingAnswers.waterAvailability] ?? 'توفر المياه غير مسجل'}.</p>}{activeCard.id === 'history' && onboardingAnswers.previousCrop && <p style={{ marginTop: 10 }}><strong>آخر محصول مسجل:</strong> {cropNames[onboardingAnswers.previousCrop] ?? onboardingAnswers.previousCrop.replace(/^other:/, '')}.</p>}</section>}
        </>
      )}
    </PageLayout>
  )
}
