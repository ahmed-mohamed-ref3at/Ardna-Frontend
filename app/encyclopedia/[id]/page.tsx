'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Droplets, FlaskConical, Sprout, Wheat } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { CROPS } from '@/data/mockData'

const cropDetails: Record<string, { overview: string; soil: string; growth: string; rotation: string; concern: string }> = {
  wheat: { overview: 'محصول حبوب شتوي حاضر في نظم زراعية مصرية متعددة. التوقيت والصنف وإدارة الحقل تختلف حسب المنطقة.', soil: 'تقييم التربة يحتاج معرفة القوام والصرف والملوحة من بيانات محلية أو تحليل ميداني.', growth: 'يحتاج متابعة مراحل النمو والحرارة والمياه المتاحة؛ القيم الرقمية غير معروضة في هذا النموذج.', rotation: 'يمكن استكشاف تعاقبه مع محاصيل مختلفة ضمن خطة متعددة المواسم، مع مراعاة دورة المحاصيل المحلية.', concern: 'راجع الصنف ومواعيد الزراعة والإرشادات الزراعية المحلية قبل اتخاذ قرار.' },
  maize: { overview: 'محصول صيفي يستخدم للغذاء والعلف في مناطق عديدة. ممارسات الإنتاج تعتمد على الموسم والصنف وإدارة المياه.', soil: 'تختلف الملاءمة حسب الصرف والقوام وخصائص الأرض؛ اسم المحافظة لا يكفي للحكم.', growth: 'تؤثر الحرارة ومواعيد الزراعة وإدارة الري في نمو المحصول؛ لا نقدم وصفة ري هنا.', rotation: 'يمكن دمجه في دورات تشمل محاصيل شتوية، مع مراجعة التسلسل والظروف المحلية.', concern: 'احتياجات المياه والمكافحة والتكلفة تختلف باختلاف المنطقة وطريقة الزراعة.' },
  'fava-beans': { overview: 'محصول بقولي شتوي مهم في نظم زراعية مصرية. تختلف الأصناف ومواعيد الزراعة وممارسات الخدمة محليًا.', soil: 'التربة جيدة الصرف مهمة عمومًا؛ يلزم تحليل محلي للتحقق من الملوحة والخواص.', growth: 'المناخ والري والأمراض عوامل مؤثرة. هذه الصفحة لا تحدد كميات مياه أو مواعيد دقيقة.', rotation: 'تُدرج البقوليات في نظم تعاقب المحاصيل لأسباب زراعية متعددة، ويجب التحقق من الملاءمة المحلية.', concern: 'تحقق من الصنف والآفات والتوقيت من المرشد الزراعي في منطقتك.' },
  rice: { overview: 'محصول صيفي يزرع في بعض مناطق الدلتا ضمن نظم إدارة مياه خاصة.', soil: 'تؤثر خصائص الأرض وإدارة المياه على الملاءمة؛ يلزم الرجوع إلى القيود التنظيمية المحلية.', growth: 'احتياجات الماء وإدارة الحقل تختلف بحسب نظام الزراعة والمنطقة.', rotation: 'يحتاج إدخاله في الدورة إلى مراعاة القيود المائية والمحلية وتسلسل المحاصيل.', concern: 'راجع ضوابط زراعة الأرز في منطقتك وتوفر المياه قبل التخطيط.' },
  clover: { overview: 'محصول علف يزرع في موسم بارد في نظم متعددة، وتختلف استخداماته وخدماته بحسب المزرعة.', soil: 'تؤثر خواص التربة والصرف في نموه، ويظل التحليل الميداني مرجعًا أفضل.', growth: 'تختلف دورات الحش وإدارة المياه حسب الصنف وطول الموسم.', rotation: 'قد يكون جزءًا من دورة مع محاصيل أخرى؛ حدّد الغرض من زراعته محليًا.', concern: 'راجع احتياجات العلف في مزرعتك والمواعيد المحلية.' },
  cotton: { overview: 'محصول ألياف صيفي يزرع في مناطق وظروف محددة ضمن نظم زراعية متخصصة.', soil: 'تحتاج ملاءمة الأرض إلى معلومات محلية عن القوام والصرف والملوحة.', growth: 'تتأثر الممارسة بالصنف ومواعيد الزراعة وإدارة المياه والآفات.', rotation: 'تخطيطه يتطلب مراعاة دورة زراعية محلية وإرشادات المحصول.', concern: 'التزامات التسويق والتقاوي والقيود المحلية تحتاج تحققًا قبل التخطيط.' },
  tomato: { overview: 'محصول خضر يزرع في مواسم ومناطق مختلفة، وتتنوع طرق إنتاجه.', soil: 'خصائص التربة وجودة المياه ووسيلة الزراعة عوامل ينبغي تقييمها محليًا.', growth: 'الموسم والصنف وإدارة الري والآفات تؤثر في الممارسة؛ لا نقدم تعليمات علاجية.', rotation: 'راعِ تناوب العائلات النباتية وإدارة أمراض التربة وفق الإرشاد المحلي.', concern: 'تختلف التكاليف والأسعار ومخاطر الأمراض سريعًا حسب المكان والموسم.' },
  potato: { overview: 'محصول درني يزرع في أكثر من موسم في مصر، وتختلف نظم الإنتاج والأسواق.', soil: 'التربة والصرف وجودة التقاوي عوامل تستحق مراجعة ميدانية.', growth: 'تختلف مواعيد الزراعة والصنف وممارسات الري حسب المنطقة والموسم.', rotation: 'ضع في الاعتبار تكرار المحاصيل ومشكلات التربة ضمن دورة محلية مناسبة.', concern: 'تحقق من التقاوي المعتمدة والتوقيت والإرشادات الحالية.' },
  sesame: { overview: 'محصول زيتي صيفي يزرع في نظم ومناطق مختلفة، وتختلف ملاءمته حسب الظروف.', soil: 'يحتاج تقييم القوام والصرف وخصائص الحقل محليًا.', growth: 'الاحتياج الفعلي للمياه وإدارة الزراعة يعتمدان على الموقع والتربة والطقس.', rotation: 'يمكن استكشافه كجزء من خطة متعددة المواسم مع التحقق من الممارسة المحلية.', concern: 'لا تستخدم تصنيف المياه النسبي في هذه الصفحة كبديل لتقدير احتياج الحقل.' },
}

export default function CropDetailsPage() {
  const params = useParams<{ id: string }>()
  const crop = CROPS.find((item) => item.id === params.id)
  const detail = crop ? cropDetails[crop.id] : undefined

  return (
    <PageLayout>
      {!crop || !detail ? <div className="surface empty-state"><span className="empty-icon"><Wheat size={23} /></span><h3>المحصول غير موجود</h3><p>ارجع لموسوعة المحاصيل لاستكشاف القائمة.</p><Link href="/encyclopedia" className="button-primary">موسوعة المحاصيل <ArrowLeft size={15} /></Link></div> : <>
        <div className="breadcrumb"><Link href="/encyclopedia">موسوعة المحاصيل</Link><span>›</span><strong>{crop.nameAr}</strong></div>
        <div className="about-hero" style={{ background: `linear-gradient(120deg, ${crop.imageColor}, #174b35)` }}><span className="chip" style={{ background: 'rgba(255,255,255,.15)', color: 'white', borderColor: 'rgba(255,255,255,.25)' }}>{crop.categoryAr}</span><h1 style={{ marginTop: 15 }}>{crop.nameAr}</h1><p>{crop.nameEn} · {crop.shortDescAr}</p><div className="action-row"><span className="chip">الموسم: {crop.seasons.join(' / ')}</span><span className="chip"><Droplets size={12} />وصف مياه نسبي: {crop.waterReq === 'low' ? 'أقل نسبيًا' : crop.waterReq === 'medium' ? 'متوسط' : 'أعلى نسبيًا'}</span></div></div>
        <div className="about-grid" style={{ marginTop: 19 }}><article className="about-card"><h3><Sprout size={16} /> نظرة عامة</h3><p>{detail.overview}</p></article><article className="about-card"><h3><Sprout size={16} /> ملاءمة التربة</h3><p>{detail.soil}</p><span className="chip gold">لا توجد قياسات لأرضك</span></article><article className="about-card"><h3><Droplets size={16} /> ظروف النمو والمياه</h3><p>{detail.growth}</p></article><article className="about-card"><h3><Wheat size={16} /> علاقته بالدورة الزراعية</h3><p>{detail.rotation}</p></article></div>
        <div className="notice gold" style={{ marginTop: 17 }}><FlaskConical size={16} /><span><strong>للتثقيف فقط:</strong> المعلومات عامة وتحتاج تحققًا محليًا. {detail.concern}</span></div>
        <div className="action-row" style={{ justifyContent: 'space-between', marginTop: 19 }}><Link href="/encyclopedia" className="button-quiet"><ArrowRight size={15} /> رجوع للموسوعة</Link><Link href="/farmer/planner" className="button-primary">شوف المحصول ضمن خطة أرضك <ArrowLeft size={15} /></Link></div>
      </>}
    </PageLayout>
  )
}
