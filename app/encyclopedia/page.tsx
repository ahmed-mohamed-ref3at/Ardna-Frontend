'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Droplets, Search, Wheat, ArrowLeft } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { CROPS } from '@/data/mockData'

const categories = [
  { id: 'all', name: 'كل المحاصيل' },
  ...Array.from(new Map(CROPS.map((crop) => [crop.category, { id: crop.category, name: crop.categoryAr }])).values()),
]

export default function CropEncyclopediaPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const visibleCrops = useMemo(() => CROPS.filter((crop) => {
    const matchesQuery = `${crop.nameAr} ${crop.nameEn} ${crop.shortDescAr}`.toLowerCase().includes(query.trim().toLowerCase())
    return matchesQuery && (category === 'all' || crop.category === category)
  }), [query, category])

  return (
    <PageLayout wide>
      <div className="breadcrumb"><Link href="/">الرئيسية</Link><span>›</span><strong>موسوعة المحاصيل</strong></div>
      <div className="page-topline"><div><span className="eyebrow">مكتبة تعليمية</span><h1 className="page-title">موسوعة المحاصيل</h1><p className="page-subtitle">معلومات عامة تساعد على الاستكشاف. ظروف الأرض والتوصيات المحلية تحتاج مراجعة مختص.</p></div><span className="chip"><BookOpen size={13} />{visibleCrops.length} محصول</span></div>
      <div className="surface card-pad" style={{ marginBottom: 18 }}><div className="form-grid" style={{ alignItems: 'end' }}><div className="form-field"><label htmlFor="crop-search">ابحث عن محصول</label><div style={{ display: 'flex', gap: 8 }}><Search size={17} style={{ alignSelf: 'center', color: 'var(--muted)' }} /><input id="crop-search" className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="اسم المحصول بالعربية أو الإنجليزية" /></div></div><div className="form-field"><span className="field-label">التصنيف</span><div className="filter-row">{categories.map((item) => <button key={item.id} className={category === item.id ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item.id)}>{item.name}</button>)}</div></div></div></div>
      {visibleCrops.length ? <div className="crop-grid">{visibleCrops.map((crop) => <article className="crop-card" key={crop.id}><div className="crop-art" style={{ background: `linear-gradient(145deg, ${crop.imageColor}, #315f3f)` }}><Wheat size={46} strokeWidth={1.3} /></div><div className="crop-card-content"><div className="crop-card-meta"><span className="chip">{crop.categoryAr}</span><span className="chip gold"><Droplets size={11} />{crop.waterReq === 'low' ? 'مياه أقل نسبيًا' : crop.waterReq === 'medium' ? 'احتياج متوسط' : 'احتياج أعلى'}</span></div><h3>{crop.nameAr}</h3><p>{crop.shortDescAr}</p><span style={{ color: '#829084', fontSize: 10 }}>{crop.nameEn} · {crop.seasons.join(' / ')}</span><Link href={`/encyclopedia/${crop.id}`} className="button-secondary" style={{ width: '100%', marginTop: 13 }}>اعرف تفاصيل المحصول <ArrowLeft size={14} /></Link></div></article>)}</div> : <div className="surface empty-state"><span className="empty-icon"><Search size={22} /></span><h3>مفيش نتائج مطابقة</h3><p>جرّب كلمة بحث مختلفة أو غيّر تصنيف المحاصيل.</p><button className="button-secondary" onClick={() => { setQuery(''); setCategory('all') }}>امسح البحث</button></div>}
      <div className="notice gold" style={{ marginTop: 19 }}>تصنيفات المياه والملاءمة هنا أوصاف نسبية توضيحية. لا تمثل استهلاكًا فعليًا أو ملاءمة مؤكدة لأرضك.</div>
    </PageLayout>
  )
}
