'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, Droplets, Scale, Sprout, Wheat, ArrowLeft, ArrowRight } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { useAppStore } from '@/store/useAppStore'
import type { Priority } from '@/data/types'

const priorities: { id: Priority; title: string; copy: string; Icon: typeof Droplets }[] = [
  { id: 'water', title: 'توفير المياه', copy: 'قدّم الخطط ذات درجة كفاءة المياه الأعلى في نموذج المقارنة.', Icon: Droplets },
  { id: 'soil', title: 'تحسين صحة التربة', copy: 'ركّز على مؤشر إدارة التربة، مع بقاء المعلومات التقديرية واضحة.', Icon: Sprout },
  { id: 'productivity', title: 'إنتاجية عالية', copy: 'أعط وزنًا أكبر لمؤشر الملاءمة الإنتاجية التوضيحي.', Icon: Wheat },
  { id: 'balanced', title: 'التوازن بين الأهداف', copy: 'وازن بين المياه والتربة والإنتاجية بأوزان متقاربة.', Icon: Scale },
]

export default function FarmerPrioritiesPage() {
  const router = useRouter()
  const { onboardingAnswers, setPriority } = useAppStore()
  const selected = onboardingAnswers.priority ?? 'balanced'
  const current = priorities.find((priority) => priority.id === selected) ?? priorities[3]

  function showPlans() {
    router.push('/farmer/planner')
  }

  return (
    <PageLayout>
      <div className="breadcrumb"><Link href="/farmer">بوابة المزارع</Link><span>›</span><Link href="/farmer/questions">معلومات الزراعة</Link><span>›</span><strong>الأولويات</strong></div>
      <div className="page-topline"><div><span className="eyebrow">الخطوة الرابعة · تخصيص الخطط</span><h1 className="page-title">إيه أهم حاجة عندك في زراعتك؟</h1><p className="page-subtitle">اختار هدفك الأساسي، وهنرتب الخطط الزراعية حسب أولويتك. تقدر تغيّر الاختيار في أي وقت.</p></div><span className="chip">٤ من ٥</span></div>

      <div className="choice-grid">
        {priorities.map(({ id, title, copy, Icon }) => (
          <button key={id} className={selected === id ? 'choice-card selected' : 'choice-card'} onClick={() => setPriority(id)} aria-pressed={selected === id}>
            {selected === id && <span className="choice-check"><Check size={12} strokeWidth={3} /></span>}
            <span className="choice-card-icon"><Icon size={21} /></span><strong>{title}</strong><small>{copy}</small>
          </button>
        ))}
      </div>

      <div className="notice" style={{ marginTop: 18 }}><current.Icon size={17} /><span><strong>أولويتك الحالية: {current.title}.</strong> {current.copy} الأوزان والدرجات تجريبية للمقارنة وليست تنبؤًا بنتيجة المحصول.</span></div>
      <div className="surface card-pad" style={{ marginTop: 25 }}>
        <div className="page-topline" style={{ marginBottom: 0 }}><div><span className="eyebrow">الخطوة التالية</span><h2 className="section-title" style={{ marginTop: 8 }}>شوف الخطط التوضيحية</h2><p className="section-copy">هتشوف ثلاث دورات، ودرجة كل خطة هتتغير حسب اختيارك.</p></div><div className="action-row"><button className="button-quiet" onClick={() => router.push('/farmer/questions')}><ArrowRight size={15} /> تعديل الإجابات</button><button className="button-primary" onClick={showPlans}>اعرض خطط الزراعة <ArrowLeft size={15} /></button></div></div>
      </div>
    </PageLayout>
  )
}
