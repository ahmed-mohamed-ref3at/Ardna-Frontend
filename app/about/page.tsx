import Link from 'next/link'
import { ArrowLeft, Compass, FlaskConical, Leaf, Satellite, Target, UsersRound } from 'lucide-react'
import PageLayout from '@/components/PageLayout'

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="breadcrumb"><Link href="/">الرئيسية</Link><span>›</span><strong>من نحن</strong></div>
      <section className="about-hero"><span className="eyebrow" style={{ color: '#e0c37c' }}>أرضنا · مشروع توضيحي</span><h1>من بيانات الفضاء... إلى أرض كل فلاح مصري.</h1><p>نطوّر تجربة تساعد على تحويل المعلومات المناخية والزراعية إلى سياق مفهوم، وخطط متعددة المواسم يمكن للمزارع استكشافها ومراجعتها.</p></section>
      <div className="about-grid" style={{ marginTop: 20 }}>
        <article className="about-card"><h3><Leaf size={17} /> قصتنا</h3><p>تصل إلى المزارع معلومات كثيرة عن المناخ والتربة والمحاصيل، لكن ربطها بقرار الموسم ليس دائمًا سهلًا. أرضنا تصور واجهة عربية تربط بيانات الأرض بأسئلة المزارع وأولوياته.</p></article>
        <article className="about-card"><h3><Target size={17} /> رسالتنا</h3><p>أن نجعل تخطيط الدورات الزراعية عبر عدة مواسم أوضح، وأن نبيّن ما نعرفه وما يحتاج إلى تحقق محلي قبل اتخاذ أي قرار.</p></article>
        <article className="about-card"><h3><Satellite size={17} /> NASA Space Apps Challenge</h3><p>يُطوّر هذا المشروع في سياق تحدي Field Shift: Adapting Farms with NASA Data ضمن NASA Space Apps Challenge 2026. المشروع ليس معتمدًا أو مؤيدًا رسميًا من ناسا، ولا يقدم ناسا توصيات المحاصيل المعروضة.</p></article>
        <article className="about-card"><h3><FlaskConical size={17} /> نهجنا</h3><p>نربط مصادر رصد الأرض المحتملة، والمعرفة الزراعية، ومدخلات المزارع، والأولويات في تجربة قابلة للشرح. الدرجات والنتائج في هذا النموذج توضيحية فقط.</p></article>
      </div>
      <section className="surface card-pad" style={{ marginTop: 19 }}><span className="eyebrow">فريق المشروع</span><h2 className="section-title" style={{ marginTop: 8 }}>فريق يبني تجربة قابلة للتطوير</h2><p className="section-copy">لم تُضف أسماء أو صور أو شراكات غير مؤكدة. يمكن للفريق استبدال البطاقات التالية ببيانات الأعضاء بعد اعتمادها.</p><div className="source-grid" style={{ marginTop: 17 }}>{[1, 2, 3].map((item) => <article className="source-card" key={item}><span className="empty-icon" style={{ width: 42, height: 42, margin: '0 0 11px' }}><UsersRound size={18} /></span><strong>عضو فريق {item}</strong><p>بيانات تعريفية بانتظار اعتماد الفريق.</p></article>)}</div></section>
      <section className="surface card-pad" style={{ marginTop: 19 }}><span className="eyebrow">الأثر المستهدف</span><h2 className="section-title" style={{ marginTop: 8 }}>ما نأمل أن تساعد عليه التجربة</h2><p className="section-copy">هذه أهداف مقصودة، وليست نتائج مثبتة أو أثرًا مقاسًا.</p><div className="flow-grid" style={{ marginTop: 18 }}>{[
        ['01', 'قرارات أكثر اطلاعًا', 'ربط أولويات المزارع بمعلومات واضحة.'], ['02', 'وعي باحتياجات الري', 'عرض سياق المياه مع إظهار حدود البيانات.'], ['03', 'تفكير في الدورة', 'النظر إلى تسلسل المحاصيل عبر مواسم.'], ['04', 'معرفة زراعية متاحة', 'شرح مصطلحات ومصادر بلغة أقرب للمزارع.'],
      ].map(([number, title, copy]) => <article className="flow-step" key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></article>)}</div></section>
      <div className="earth-band" style={{ marginTop: 19 }}><div><span className="eyebrow" style={{ color: '#e0c37c' }}>أرضنا في سطر</span><h2>من بيانات الأرض إلى قرارات زراعية أفضل.</h2><p>استكشف بوابة المزارع أو تعرّف على المنهجية العلمية وراء العرض.</p></div><div className="action-row"><Link href="/farmer" className="button-primary">ابدأ بأرضك <ArrowLeft size={15} /></Link><Link href="/science" className="button-secondary"><Compass size={15} />المختبر العلمي</Link></div></div>
    </PageLayout>
  )
}
