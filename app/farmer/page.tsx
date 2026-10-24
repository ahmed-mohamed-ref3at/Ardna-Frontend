'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPinned, LocateFixed, Search, ArrowLeft, ArrowRight, Wheat, LoaderCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '@/components/PageLayout'
import { GOVERNORATES, DEMO_FARM } from '@/data/mockData'
import { useAppStore } from '@/store/useAppStore'

export default function FarmerLocationPage() {
  const router = useRouter()
  const { onboardingLocation, setOnboardingLocation, setOnboardingFarm, setDraftPolygon, loginAsDemoFarmer } = useAppStore()
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')
  const selectedGovernorate = GOVERNORATES.find((item) => item.nameAr === onboardingLocation.governorate) ?? GOVERNORATES[0]

  function updateGovernorate(nameAr: string) {
    const region = GOVERNORATES.find((item) => item.nameAr === nameAr)
    if (!region) return
    setOnboardingLocation({
      governorate: region.nameAr,
      district: region.districts[0],
      village: '',
      center: [region.center[0], region.center[1]],
    })
  }

  function openMap() {
    setLocationError('')
    setOnboardingFarm(null)
    setDraftPolygon([])
    router.push('/farmer/map')
  }

  function useMyLocation() {
    setLocationError('')
    if (!navigator.geolocation) {
      setLocationError('المتصفح لا يدعم تحديد الموقع. اختار المحافظة والمركز يدويًا، أو افتح الخريطة.')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setOnboardingLocation({
          governorate: 'موقع الجهاز',
          district: 'غير محدد',
          village: 'موقع تقريبي من الجهاز — حدود الأرض لم تُحدد بعد',
          center: [coords.latitude, coords.longitude],
        })
        setLocating(false)
        toast.success('حددنا مركزًا تقريبيًا لموقع جهازك. ارسم حدود الأرض بنفسك.')
        router.push('/farmer/map')
      },
      () => {
        setLocating(false)
        setLocationError('لم نتمكن من الوصول لموقعك. راجع إذن الموقع أو استخدم البحث اليدوي والخريطة.')
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    )
  }

  function loadDemoMap() {
    loginAsDemoFarmer()
    setOnboardingFarm(DEMO_FARM)
    setDraftPolygon(DEMO_FARM.polygon)
    toast.success('تم تحميل حدود الأرض التجريبية قرب دمنهور')
    router.push('/farmer/map')
  }

  return (
    <PageLayout>
      <div className="breadcrumb"><span>الرئيسية</span><span>›</span><strong>بوابة المزارع</strong></div>
      <div className="page-topline">
        <div><span className="eyebrow">الخطوة الأولى · تحديد الموقع</span><h1 className="page-title">فين أرضك؟</h1><p className="page-subtitle">اختار الطريقة الأسهل ليك علشان نوصلك لمكان أرضك على الخريطة. الموقع وحده لا يحدد حدود الملكية.</p></div>
        <span className="chip">١ من ٥</span>
      </div>

      <div className="location-grid">
        <div className="location-options">
          <article className="location-card">
            <span className="location-card-icon"><LocateFixed size={21} /></span>
            <div><h3>استخدم موقعي الحالي</h3><p>نحدد مركز الخريطة من موقع الجهاز إذا وافقت، وبعدها ترسم حدود الأرض بنفسك.</p><button className="button-secondary" onClick={useMyLocation} disabled={locating}>{locating ? <><LoaderCircle size={15} className="animate-spin" /> جاري تحديد الموقع</> : <>حدد موقعي <ArrowLeft size={15} /></>}</button></div>
          </article>

          <article className="location-card">
            <span className="location-card-icon"><Search size={21} /></span>
            <div className="manual-location" style={{ flex: 1 }}>
              <div><h3>ابحث عن أرضك</h3><p>اختار المحافظة، ثم المركز، واكتب اسم القرية أو المنطقة.</p></div>
              <div className="form-grid">
                <div className="form-field"><label htmlFor="governorate">المحافظة</label><select id="governorate" className="select" value={selectedGovernorate.nameAr} onChange={(event) => updateGovernorate(event.target.value)}>{GOVERNORATES.map((region) => <option key={region.id} value={region.nameAr}>{region.nameAr}</option>)}</select></div>
                <div className="form-field"><label htmlFor="district">المركز</label><select id="district" className="select" value={onboardingLocation.district} onChange={(event) => setOnboardingLocation({ ...onboardingLocation, district: event.target.value, center: [selectedGovernorate.center[0], selectedGovernorate.center[1]] })}>{selectedGovernorate.districts.map((district) => <option key={district}>{district}</option>)}</select></div>
              </div>
              <div className="form-field"><label htmlFor="village">القرية أو المنطقة</label><input id="village" className="input" placeholder="مثال: منطقة زراعية قريبة من دمنهور" value={onboardingLocation.village} onChange={(event) => setOnboardingLocation({ ...onboardingLocation, village: event.target.value })} /></div>
              <button className="button-primary" onClick={openMap}>افتح الخريطة <ArrowLeft size={15} /></button>
            </div>
          </article>

          <article className="location-card">
            <span className="location-card-icon"><MapPinned size={21} /></span>
            <div><h3>اختار من الخريطة</h3><p>افتح الخريطة مباشرة، حرّكها للمكان المناسب، ثم ارسم حدود أرضك.</p><button className="button-quiet" onClick={openMap}>فتح الخريطة مباشرة <ArrowLeft size={15} /></button></div>
          </article>

          {locationError && <div role="alert" className="notice gold"><LocateFixed size={17} /><span>{locationError} <button className="inline-link" onClick={openMap}>افتح الخريطة يدويًا</button></span></div>}
          <div className="notice"><Wheat size={17} /><span><strong>للتخطيط فقط:</strong> الحدود المرسومة تقديرية، وليست إثبات ملكية أو مسحًا مساحيًا.</span></div>
        </div>

        <div>
          <div className="location-map-art"><span className="location-map-river" /><span className="location-map-label">دلتا النيل · توضيح بصري</span><div className="location-map-card"><strong>{onboardingLocation.governorate} · {onboardingLocation.district}</strong><span>{onboardingLocation.village || 'اكتب المنطقة الزراعية التي تعرفها'}</span></div></div>
          <div className="surface card-pad" style={{ marginTop: 14 }}>
            <span className="eyebrow">للتجربة السريعة</span><h3 style={{ color: 'var(--forest)', margin: '9px 0 5px', fontSize: 17 }}>ابدأ بأرض أحمد التجريبية</h3><p className="section-copy" style={{ marginBottom: 14 }}>أرض خيالية قرب دمنهور بحدود ومساحة متناسقتين، لتجربة كل الخطوات دون إعداد يدوي.</p><button className="button-secondary" onClick={loadDemoMap}>استخدم الأرض التجريبية <ArrowLeft size={15} /></button>
          </div>
          <div className="action-row" style={{ justifyContent: 'space-between', marginTop: 17 }}><button className="button-quiet" onClick={() => router.push('/')}><ArrowRight size={15} /> الرئيسية</button><span className="chip">يمكنك تخطي البيانات غير المتاحة</span></div>
        </div>
      </div>
    </PageLayout>
  )
}
