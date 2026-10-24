'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, CircleHelp, MapPinned, Minus, MousePointer2, Satellite, Search, Trash2, Undo2, Wheat } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '@/components/PageLayout'
import { useAppStore } from '@/store/useAppStore'
import { buildFarm, calculatePolygonArea, formatArea } from '@/lib/geo'
import { GOVERNORATES } from '@/data/mockData'

const LeafletFarmMap = dynamic(() => import('@/components/maps/LeafletFarmMap'), {
  ssr: false,
  loading: () => <div className="loading-surface">جاري تجهيز الخريطة…</div>,
})

export default function FarmMapPage() {
  const router = useRouter()
  const { onboardingFarm, onboardingLocation, draftPolygon, setDraftPolygon, setOnboardingLocation, confirmFarm, farmer } = useAppStore()
  const [drawing, setDrawing] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [satelliteRequested, setSatelliteRequested] = useState(false)
  const [error, setError] = useState('')
  const area = useMemo(() => calculatePolygonArea(draftPolygon), [draftPolygon])
  const formattedArea = formatArea(area)

  function addPoint(point: [number, number]) {
    setError('')
    setDraftPolygon([...draftPolygon, point])
  }

  function movePoint(index: number, point: [number, number]) {
    setDraftPolygon(draftPolygon.map((previous, current) => current === index ? point : previous))
  }

  function findLocation() {
    const query = searchText.trim()
    if (!query) return
    const match = GOVERNORATES.find((region) => region.nameAr.includes(query) || region.districts.some((district) => district.includes(query)))
    if (!match) {
      toast.error('لم نجد اسمًا مطابقًا في القائمة. حرّك الخريطة يدويًا أو اختر المحافظة من الخطوة السابقة.')
      return
    }
    const district = match.districts.find((item) => item.includes(query)) ?? match.districts[0]
    setOnboardingLocation({ ...onboardingLocation, governorate: match.nameAr, district, center: [match.center[0], match.center[1]] })
    toast.success(`تم تحريك الخريطة إلى ${match.nameAr} · ${district}`)
  }

  function confirmBoundary() {
    if (draftPolygon.length < 3 || area < 1) {
      setError('ارسم ثلاث نقاط على الأقل لتحديد مساحة الأرض.')
      return
    }
    const farm = buildFarm(onboardingLocation, draftPolygon, onboardingFarm?.name ?? (farmer ? 'أرض أحمد — دمنهور' : 'أرضي'))
    confirmFarm(farm)
    toast.success(`تم حفظ حدود أرضك · ${farm.area_feddan} فدان و${farm.area_qirat} قيراط تقريبًا`)
    router.push('/farmer/profile')
  }

  function clearBoundary() {
    setDraftPolygon([])
    setError('')
    toast('تم مسح الحدود. ابدأ رسمًا جديدًا على الخريطة.')
  }

  return (
    <PageLayout wide>
      <div className="breadcrumb"><button className="inline-link" onClick={() => router.push('/farmer')}>بوابة المزارع</button><span>›</span><strong>حدود الأرض</strong></div>
      <div className="page-topline">
        <div><span className="eyebrow">الخطوة الثانية · حدود تقريبية</span><h1 className="page-title">حدد حدود أرضك</h1><p className="page-subtitle">انقر على الخريطة لإضافة نقاط، ثم حرّك المقابض لتعديلها. المساحة تُحسب من شكل المضلع.</p></div>
        <span className="chip">٢ من ٥</span>
      </div>

      <div className="map-layout">
        <section className="map-panel" aria-label="خريطة تفاعلية">
          <div className="map-controls">
            <label className="form-field" style={{ display: 'flex', flex: '1 1 270px', alignItems: 'center', gap: 7 }}>
              <span className="sr-only">ابحث عن محافظة أو مركز</span>
              <input className="input" value={searchText} onChange={(event) => setSearchText(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && findLocation()} placeholder="ابحث عن محافظة أو مركز…" />
              <button className="icon-button" onClick={findLocation} aria-label="بحث"><Search size={17} /></button>
            </label>
            <button className={drawing ? 'button-primary' : 'button-secondary'} onClick={() => setDrawing((value) => !value)}><MousePointer2 size={15} />{drawing ? (draftPolygon.length >= 3 ? 'إغلاق المضلع' : 'إيقاف الرسم') : 'ابدأ تحديد الحدود'}</button>
            <button className="button-secondary" onClick={() => { setSatelliteRequested((value) => !value); toast('صور الأقمار الصناعية غير مهيأة في هذا العرض؛ المعروض خريطة شوارع عادية.') }}><Satellite size={15} />{satelliteRequested ? 'إخفاء تنبيه الصور' : 'صور الأقمار الصناعية'}</button>
          </div>
          {satelliteRequested && <div className="notice gold" style={{ margin: 10 }}><Satellite size={16} /><span>صور الأقمار الصناعية غير متاحة في هذا العرض. الطبقة المعروضة خريطة شوارع من OpenStreetMap وليست صورة فضائية.</span></div>}
          <LeafletFarmMap
            key={`${onboardingLocation.center[0]}-${onboardingLocation.center[1]}`}
            center={onboardingFarm?.center ?? onboardingLocation.center}
            polygon={draftPolygon}
            drawing={drawing}
            onAddPoint={addPoint}
            onMovePoint={movePoint}
          />
        </section>

        <aside className="map-sidebar">
          <div className="surface">
            <span className="eyebrow">موقع الخريطة</span>
            <h2>{onboardingLocation.governorate} · {onboardingLocation.district}</h2>
            <p>{onboardingLocation.village || 'حرّك الخريطة لموقع أرضك، ثم ارسم حدودها.'}</p>
            <div className="notice blue" style={{ marginTop: 14 }}><MapPinned size={16} /><span>الخريطة تفاعلية ويمكنك التحريك والتكبير. المعروض خريطة شوارع OpenStreetMap وليست صور أقمار صناعية؛ عند تعذر تحميل البلاطات تبقى خلفية تخطيطية محلية.</span></div>
          </div>

          <div className="surface">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}><h2 style={{ margin: 0 }}>مساحة تقريبية</h2><span className="chip green">محسوبة من الحدود</span></div>
            <div className="map-stat-grid">
              <div className="map-stat"><strong>{draftPolygon.length >= 3 ? formattedArea.squareMeters.toLocaleString('ar-EG') : '—'}</strong><span>متر مربع</span></div>
              <div className="map-stat"><strong>{draftPolygon.length >= 3 ? formattedArea.feddans.toLocaleString('ar-EG') : '—'}</strong><span>فدان</span></div>
              <div className="map-stat"><strong>{draftPolygon.length >= 3 ? formattedArea.qirats.toLocaleString('ar-EG') : '—'}</strong><span>قيراط إجمالي</span></div>
            </div>
            <div className="check-row"><span className="chip">{draftPolygon.length} نقاط</span><span>{drawing ? 'انقر على الخريطة لإضافة نقاط' : 'اسحب المقابض لتعديل النقاط'}</span></div>
            <div className="action-row" style={{ marginTop: 15 }}>
              <button className="button-secondary" onClick={() => setDraftPolygon(draftPolygon.slice(0, -1))} disabled={!draftPolygon.length}><Undo2 size={15} /> تراجع</button>
              <button className="button-quiet" onClick={clearBoundary} disabled={!draftPolygon.length}><Trash2 size={15} /> مسح</button>
            </div>
          </div>

          {error && <div role="alert" className="notice gold"><CircleHelp size={16} /><span>{error}</span></div>}
          <div className="notice"><Wheat size={16} /><span><strong>تنبيه:</strong> الحدود المرسومة تقديرية لأغراض التخطيط الزراعي، وليست إثبات ملكية.</span></div>
          <div className="action-row" style={{ justifyContent: 'space-between' }}><button className="button-quiet" onClick={() => router.push('/farmer')}><ArrowRight size={15} /> رجوع</button><button className="button-primary" onClick={confirmBoundary} disabled={draftPolygon.length < 3}><Check size={16} /> تأكيد الحدود</button></div>
          {onboardingFarm && <div className="check-row"><Minus size={14} />المضلع الحالي هو نفسه المستخدم في بطاقة الأرض التجريبية.</div>}
          <button className="button-quiet" onClick={() => router.push('/science')}><ArrowLeft size={15} /> كيف تُستخدم هذه البيانات؟</button>
        </aside>
      </div>
    </PageLayout>
  )
}
