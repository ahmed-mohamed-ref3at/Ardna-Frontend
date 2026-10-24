'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Droplets, MapPinned, Sprout, SunMedium, Wheat } from 'lucide-react'
import PageLayout from '@/components/PageLayout'

const regions = [
  { id: 'beheira', name: 'البحيرة', position: { top: '37%', left: '51%' }, crops: 'أمثلة شائعة: القمح، الذرة، الخضر', climate: 'سياق دلتا غربي؛ يتباين حسب قرب الحقول من الساحل والداخل.', water: 'الري السطحي من الترع حاضر في مناطق واسعة، مع اختلاف محلي في الإتاحة.', soil: 'تختلف خصائص التربة محليًا؛ يلزم تحليل حقل لتحديدها.' },
  { id: 'kafr', name: 'كفر الشيخ', position: { top: '29%', left: '55%' }, crops: 'أمثلة: الأرز، القمح، محاصيل الخضر', climate: 'دلتا شمالية تتأثر بالقرب من الساحل والظروف الموسمية.', water: 'احتياجات الري وإدارته تختلف حسب المحصول والموقع المحلي.', soil: 'توجد تحديات محلية متباينة؛ لا يعرض هذا الأطلس قياسات تربة.' },
  { id: 'gharbia', name: 'الغربية', position: { top: '36%', left: '59%' }, crops: 'أمثلة: القمح، الذرة، محاصيل الخضر', climate: 'منطقة دلتا داخلية؛ المؤشرات هنا وصف تعليمي عام.', water: 'الري يعتمد على نظم ومواعيد محلية، ويحتاج تأكيدًا من المزارع.', soil: 'الخواص تختلف بين الحقول ولا يمكن استنتاجها من اسم المحافظة.' },
  { id: 'minya', name: 'المنيا', position: { top: '54%', left: '44%' }, crops: 'أمثلة: القمح، الذرة، محاصيل بقولية', climate: 'جنوب الدلتا/وادي النيل؛ صيف أحر وجفاف أعلى عمومًا من الشمال.', water: 'الري عنصر أساسي في الزراعة، وتوفره الفعلي يحتاج سجلًا محليًا.', soil: 'تختلف تربة الوادي والأراضي المستصلحة؛ التحليل الميداني ضروري.' },
  { id: 'aswan', name: 'أسوان', position: { top: '80%', left: '48%' }, crops: 'أمثلة إقليمية تتنوع حسب الموقع ونظم الري.', climate: 'مناخ شديد الحرارة والجفاف مقارنة بدلتا النيل.', water: 'الزراعة المعتمدة على الري تتطلب إدارة دقيقة للمياه.', soil: 'تتباين الأراضي؛ لا تُعرض هنا قيم خصوبة أو ملوحة.' },
]

export default function EgyptAtlasPage() {
  const [selectedId, setSelectedId] = useState('beheira')
  const selected = regions.find((region) => region.id === selectedId) ?? regions[0]

  return (
    <PageLayout wide>
      <div className="breadcrumb"><Link href="/">الرئيسية</Link><span>›</span><strong>أطلس الزراعة</strong></div>
      <div className="page-topline"><div><span className="eyebrow">استكشاف إقليمي · محتوى تعليمي</span><h1 className="page-title">أطلس الزراعة في مصر</h1><p className="page-subtitle">اختار محافظة لاستكشاف سياق زراعي عام. المعلومات لا تمثل قياسات لحقل ولا توصية آنية.</p></div><span className="chip"><MapPinned size={13} />٥ مناطق توضيحية</span></div>

      <div className="atlas-layout">
        <div className="egypt-map" aria-label="خريطة توضيحية لمصر">
          <span className="egypt-outline" /><span className="egypt-river" /><span className="chip" style={{ position: 'absolute', top: 15, right: 15 }}>خريطة مرسومة · ليست حدودًا إدارية</span>
          {regions.map((region) => <button key={region.id} className="egypt-dot" aria-label={`عرض ${region.name}`} aria-pressed={selectedId === region.id} title={region.name} onClick={() => setSelectedId(region.id)} style={{ top: region.position.top, left: region.position.left, background: selectedId === region.id ? '#DDAA57' : '#174b35', transform: 'scale(1.15)' }} />)}
          <div style={{ position: 'absolute', bottom: 15, right: 15, left: 15 }} className="notice">المواضع على الرسم تقريبية لأغراض الاستكشاف.</div>
        </div>
        <section className="surface card-pad">
          <span className="eyebrow">اختر منطقة</span><h2 className="section-title" style={{ marginTop: 8 }}>{selected.name}</h2><p className="section-copy">ملخص تعليمي عام، وليس وصفًا دقيقًا لأرض فردية.</p>
          <div className="atlas-regions" style={{ marginTop: 17 }}>{regions.map((region) => <button key={region.id} className={selectedId === region.id ? 'region-button active' : 'region-button'} onClick={() => setSelectedId(region.id)}>{region.name}<span>عرض السياق</span></button>)}</div>
          <div className="profile-detail" style={{ marginTop: 16 }}><div className="check-row"><Wheat size={16} /><strong>محاصيل شائعة — أمثلة</strong></div><p style={{ marginTop: 7 }}>{selected.crops}</p><div className="check-row" style={{ marginTop: 12 }}><SunMedium size={16} /><strong>السياق المناخي</strong></div><p style={{ marginTop: 7 }}>{selected.climate}</p><div className="check-row" style={{ marginTop: 12 }}><Droplets size={16} /><strong>المياه والري</strong></div><p style={{ marginTop: 7 }}>{selected.water}</p><div className="check-row" style={{ marginTop: 12 }}><Sprout size={16} /><strong>التربة</strong></div><p style={{ marginTop: 7 }}>{selected.soil}</p></div>
          <div className="notice gold" style={{ marginTop: 15 }}>قد تختلف الظروف داخل المحافظة الواحدة. راجع الإرشاد المحلي ونتائج التحليل الميداني.</div>
        </section>
      </div>
      <div className="action-row" style={{ justifyContent: 'space-between', marginTop: 19 }}><span className="chip">البيانات تعليمية وليست توصيات زراعية مباشرة</span><Link href="/farmer" className="button-secondary">اكتشف أرضك <ArrowLeft size={15} /></Link></div>
    </PageLayout>
  )
}
