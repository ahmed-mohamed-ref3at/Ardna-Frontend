import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import {
  ArrowLeft,
  Sprout,
  SunMedium,
  MapPinned,
  Layers3,
  FlaskConical,
  Satellite,
  BookOpen,
  Map,
  Wheat,
  CircleHelp,
} from 'lucide-react'

export default function HomePage() {
  return (
    <PageLayout wide fullBleed>
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker"><Satellite size={14} /> من بيانات الأرض إلى قرار أوضح</span>
            <h1>أرضك تعرفها،<br />وزراعتك تخطط لها.</h1>
            <p>منصة توضيحية تساعد المزارع المصري على فهم ظروف أرضه، وتحديد أولوياته، ومقارنة خطط زراعية لعدة مواسم.</p>
            <div className="hero-actions">
              <Link href="/farmer" className="button-primary">ابدأ بأرضك <ArrowLeft size={16} /></Link>
              <Link href="/science" className="button-secondary">استكشف الجانب العلمي</Link>
            </div>
            <div className="hero-proof"><span className="hero-proof-mark"><Sprout size={15} /></span><span>قرارات أوضح تبدأ بفهم أفضل للأرض</span></div>
          </div>
          <div className="hero-card" aria-label="معاينة توضيحية لبطاقة أرض زراعية">
            <div className="hero-card-head">
              <div><div className="hero-card-title">بطاقة أرض تجريبية</div><div className="hero-card-caption">البحيرة · دمنهور · بيانات توضيحية</div></div>
              <span className="live-dot" aria-hidden="true" />
            </div>
            <div className="hero-mini-map"><span className="hero-field" /><span className="hero-map-pin"><MapPinned size={13} /></span></div>
            <div className="hero-card-stats">
              <div className="hero-card-stat"><small>المساحة المحسوبة</small><strong>≈ ٤ فدادين</strong></div>
              <div className="hero-card-stat"><small>الخطة المحفوظة</small><strong>دورة متعددة المواسم</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="home-heading">
            <span className="eyebrow">تحديات الأرض اليومية</span>
            <h2>القرار الزراعي يبدأ من صورة أوضح</h2>
            <p>تتغير ظروف الموسم من أرض لأخرى. أرضنا تجمع السياق المناخي، ومدخلات المزارع، وأهدافه في تجربة واحدة سهلة الفهم.</p>
          </div>
          <div className="problem-grid">
            <article className="problem-card"><span className="problem-number">01 / المياه</span><h3>مياه تحتاج تخطيطًا</h3><p>تفاوت توفر مياه الري يجعل مقارنة احتياجات المحاصيل خطوة مفيدة قبل الموسم.</p></article>
            <article className="problem-card"><span className="problem-number">02 / التربة</span><h3>صحة التربة على المدى الطويل</h3><p>تنويع المحاصيل يساعد على التفكير في تعاقب زراعي أوسع من قرار محصول واحد.</p></article>
            <article className="problem-card"><span className="problem-number">03 / المعلومات</span><h3>بيانات كثيرة، وقرار واحد</h3><p>المؤشرات العلمية تحتاج شرحًا واضحًا يبيّن مصدرها وحدودها وما الذي لا نعرفه بعد.</p></article>
          </div>
        </div>
      </section>

      <section className="home-section alt" id="how-it-works">
        <div className="home-container">
          <div className="home-heading"><span className="eyebrow">رحلة أرضنا</span><h2>أربع خطوات، من الأرض إلى الموسم</h2><p>ابدأ بما تعرفه، وأضف التفاصيل وقتما تكون جاهزًا.</p></div>
          <div className="journey">
            <div className="journey-step"><span className="journey-icon"><MapPinned size={19} /></span><strong>حدد أرضك</strong></div>
            <div className="journey-step"><span className="journey-icon"><SunMedium size={19} /></span><strong>افهم ظروفها</strong></div>
            <div className="journey-step"><span className="journey-icon"><Layers3 size={19} /></span><strong>خطط زراعتك</strong></div>
            <div className="journey-step"><span className="journey-icon"><BookOpen size={19} /></span><strong>تابع موسمك</strong></div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="home-heading"><span className="eyebrow">تجربتان متصلتان</span><h2>معلومة مفهومة، وتحليل قابل للتتبع</h2><p>تستخدم بوابة المزارع والمختبر العلمي بيانات الأرض والخطة نفسها، مع مستوى شرح يناسب كل تجربة.</p></div>
          <div className="experience-grid">
            <article className="experience-card"><span className="experience-icon"><Sprout size={20} /></span><h3>بوابة المزارع</h3><p>سجل أرضك، أضف تاريخ زراعتك وأولوياتك، ثم استكشف خططًا توضيحية لعدة مواسم.</p><Link href="/farmer">ابدأ رحلة أرضك <ArrowLeft size={14} /></Link></article>
            <article className="experience-card science"><span className="experience-icon"><FlaskConical size={20} /></span><h3>المختبر العلمي</h3><p>شاهد كيف تتحول مصادر البيانات والمؤشرات والأوزان التوضيحية إلى درجة مقارنة مفهومة.</p><Link href="/science">افتح المختبر العلمي <ArrowLeft size={14} /></Link></article>
          </div>
        </div>
      </section>

      <section className="home-section alt">
        <div className="home-container">
          <div className="rotation-band">
            <div><span className="eyebrow">أكثر من موسم واحد</span><h2>الخطة الزراعية تحكي تسلسلًا</h2><p>بدل النظر إلى محصول منفرد، قارن ترتيب المحاصيل عبر المواسم وما يرتبط به من مياه وإدارة تربة وتنازلات.</p></div>
            <div className="season-row"><div className="season-pill"><span>شتاء 2026/2027</span><strong>فول بلدي</strong></div><div className="season-arrow"><ArrowLeft size={17} /></div><div className="season-pill"><span>صيف 2027</span><strong>سمسم</strong></div><div className="season-arrow"><ArrowLeft size={17} /></div><div className="season-pill"><span>شتاء 2027/2028</span><strong>قمح</strong></div></div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="earth-band">
            <div><span className="eyebrow" style={{ color: '#d9bd7e' }}>بيانات الأرض</span><h2>رصد الأرض يضيف سياقًا، ولا يقرر بدلًا عن المزارع.</h2><p>مصادر المناخ والأمطار ورطوبة التربة تساعد على وصف الظروف الإقليمية. نوضح المصدر والدقة والبيانات الناقصة، ولا ننسب توصية المحصول إلى ناسا.</p><Link href="/science" className="button-secondary">تعرّف على المنهجية <ArrowLeft size={15} /></Link></div>
            <div className="earth-source-list"><div className="earth-source"><strong>NASA POWER</strong><span>سياق مناخي توضيحي</span></div><div className="earth-source"><strong>NASA GPM IMERG</strong><span>سياق الأمطار</span></div><div className="earth-source"><strong>NASA SMAP</strong><span>رطوبة إقليمية خشنة الدقة</span></div><div className="earth-source"><strong>SoilGrids · ISRIC</strong><span>مصدر غير تابع لناسا</span></div></div>
          </div>
        </div>
      </section>

      <section className="home-section alt">
        <div className="home-container">
          <div className="home-heading"><span className="eyebrow">اكتشف الزراعة في مصر</span><h2>تعرف على المنطقة والمحصول</h2><p>معلومات تعليمية عامة تساعد على الاستكشاف، وليست توصية آنية لأرض بعينها.</p></div>
          <div className="explore-grid">
            <Link href="/atlas" className="location-card"><span className="location-card-icon"><Map size={20} /></span><div><h3>أطلس الزراعة</h3><p>استكشف أمثلة تعليمية عن المحافظات والأنماط الزراعية.</p><span className="inline-link">استكشف الأطلس ←</span></div></Link>
            <Link href="/encyclopedia" className="location-card"><span className="location-card-icon"><Wheat size={20} /></span><div><h3>موسوعة المحاصيل</h3><p>ابحث في محاصيل مصرية وتعرّف على احتياجاتها العامة.</p><span className="inline-link">تصفح المحاصيل ←</span></div></Link>
            <Link href="/about" className="location-card"><span className="location-card-icon"><CircleHelp size={20} /></span><div><h3>عن رسالتنا</h3><p>كيف نربط فهم البيانات بتخطيط زراعي أوضح للمزارع.</p><span className="inline-link">اعرف المزيد ←</span></div></Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container"><div className="final-cta"><span className="eyebrow">ابدأ ببساطة</span><h2>كل أرض لها حكاية</h2><p>ارسم حدودًا تقريبية، وأضف ما تعرفه، ثم استكشف الخطط التوضيحية بنفسك.</p><Link href="/farmer" className="button-primary">ابدأ بأرضك <ArrowLeft size={15} /></Link></div></div>
      </section>
    </PageLayout>
  )
}
