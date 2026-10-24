'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Droplets, Sprout, Wheat, CircleHelp, SkipForward } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { useAppStore } from '@/store/useAppStore'

const questions = [
  { key: 'previousCrop', title: 'آخر محصول زرعته كان إيه؟', subtitle: 'اختيارك يساعدنا نظهر تسلسلًا أوضح للمحاصيل.', options: [{ value: 'wheat', label: 'قمح', icon: Wheat }, { value: 'maize', label: 'ذرة', icon: Sprout }, { value: 'fava-beans', label: 'فول بلدي', icon: Sprout }, { value: 'other', label: 'محصول آخر', icon: CircleHelp }] },
  { key: 'irrigationMethod', title: 'بتروي أرضك إزاي؟', subtitle: 'اختار الطريقة الأقرب للي بيحصل في أرضك.', options: [{ value: 'surface', label: 'ري سطحي', icon: Droplets }, { value: 'drip', label: 'ري بالتنقيط', icon: Droplets }, { value: 'sprinkler', label: 'ري بالرش', icon: Droplets }, { value: 'unknown', label: 'مش عارف', icon: CircleHelp }] },
  { key: 'waterSource', title: 'مصدر مياه الري إيه؟', subtitle: 'المعلومة دي بتفضل مدخلًا منك، مش قياسًا من الخريطة.', options: [{ value: 'canal', label: 'ترعة', icon: Droplets }, { value: 'well', label: 'بئر', icon: Droplets }, { value: 'other', label: 'مصدر آخر', icon: CircleHelp }, { value: 'unknown', label: 'مش عارف', icon: CircleHelp }] },
  { key: 'waterAvailability', title: 'المياه متوفرة طول الموسم؟', subtitle: 'مفيش إجابة صح أو غلط. اختار اللي يناسب تجربتك.', options: [{ value: 'mostly', label: 'متوفرة غالبًا', icon: Droplets }, { value: 'limited', label: 'أحيانًا محدودة', icon: Droplets }, { value: 'uncertain', label: 'مش متأكد', icon: CircleHelp }] },
] as const

const keyToIndex = { previousCrop: 0, irrigationMethod: 1, waterSource: 2, waterAvailability: 3 }

export default function FarmerQuestionsPage() {
  const router = useRouter()
  const { onboardingAnswers, setOnboardingAnswer, onboardingStep, setOnboardingStep } = useAppStore()
  const [step, setStep] = useState(Math.max(0, Math.min(3, onboardingStep)))
  const question = questions[step]
  const answerKey = question.key
  const selected = onboardingAnswers[answerKey]
  const otherText = selected.startsWith('other:') ? selected.slice(6) : ''
  const isSelected = (value: string) => value === 'other' ? selected === 'other' || selected.startsWith('other:') : selected === value

  function choose(value: string) {
    setOnboardingAnswer(answerKey, value)
  }

  function continueStep() {
    if (step === 0 && selected === 'other') setOnboardingAnswer('previousCrop', 'other:')
    if (step < questions.length - 1) {
      const next = step + 1
      setStep(next)
      setOnboardingStep(next)
      return
    }
    setOnboardingStep(4)
    router.push('/farmer/priorities')
  }

  function skipStep() {
    setOnboardingAnswer(answerKey, '')
    if (step < questions.length - 1) {
      const next = step + 1
      setStep(next)
      setOnboardingStep(next)
    } else {
      setOnboardingStep(4)
      router.push('/farmer/priorities')
    }
  }

  function previousStep() {
    if (step === 0) router.push('/farmer/profile')
    else {
      setStep(step - 1)
      setOnboardingStep(step - 1)
    }
  }

  const currentStepNumber = keyToIndex[answerKey] + 1

  return (
    <PageLayout>
      <div className="breadcrumb"><Link href="/farmer/profile">بطاقة أرضك</Link><span>›</span><strong>معلومات الزراعة</strong></div>
      <div className="page-topline"><div><span className="eyebrow">الخطوة الثالثة · معلومات بسيطة</span><h1 className="page-title">ساعدنا نفهم طريقة زراعتك</h1><p className="page-subtitle">٤ أسئلة قصيرة. تقدر تتخطى أي معلومة مش متأكد منها.</p></div><span className="chip">٣ من ٥</span></div>

      <div className="surface card-pad" style={{ maxWidth: 900, margin: 'auto' }}>
        <div className="stepper" aria-label={`السؤال ${currentStepNumber} من ٤`}>{questions.map((item, index) => <span key={item.key} className={index <= step ? 'step-dot done' : 'step-dot'} />)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, marginBottom: 22 }}><div><span className="eyebrow">السؤال {currentStepNumber} من ٤</span><h2 className="section-title" style={{ marginTop: 8 }}>{question.title}</h2><p className="section-copy">{question.subtitle}</p></div><span className="profile-icon"><Sprout size={20} /></span></div>
        <div className="choice-grid" style={{ gridTemplateColumns: `repeat(${question.options.length}, minmax(0,1fr))` }}>
          {question.options.map(({ value, label, icon: Icon }) => (
            <button key={value} className={isSelected(value) ? 'choice-card selected' : 'choice-card'} onClick={() => choose(value)} aria-pressed={isSelected(value)}>
              {isSelected(value) && <span className="choice-check">✓</span>}
              <span className="choice-card-icon"><Icon size={19} /></span><strong>{label}</strong>
            </button>
          ))}
        </div>
        {step === 0 && (selected === 'other' || selected.startsWith('other:')) && <div className="form-field" style={{ marginTop: 17 }}><label htmlFor="other-crop">اسم المحصول (اختياري)</label><input id="other-crop" className="input" value={otherText} placeholder="اكتب اسم المحصول" onChange={(event) => setOnboardingAnswer('previousCrop', `other:${event.target.value}`)} /></div>}
        <div className="action-row" style={{ justifyContent: 'space-between', marginTop: 26 }}>
          <button className="button-quiet" onClick={previousStep}><ArrowRight size={15} /> رجوع</button>
          <div className="action-row"><button className="button-quiet" onClick={skipStep}><SkipForward size={14} /> تخطي</button><button className="button-primary" onClick={continueStep}>{step === questions.length - 1 ? 'اختار أولوياتك' : 'التالي'} <ArrowLeft size={15} /></button></div>
        </div>
      </div>
    </PageLayout>
  )
}
