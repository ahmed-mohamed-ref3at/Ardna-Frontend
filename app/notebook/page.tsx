'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, CalendarDays, CirclePlus, Coins, Pencil, Sprout, Trash2, Wheat } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '@/components/PageLayout'
import { useAppStore } from '@/store/useAppStore'
import type { FarmActivity } from '@/data/types'
import { CROPS, ROTATION_PLANS } from '@/data/mockData'

type NotebookTab = 'activities' | 'expenses' | 'calendar' | 'history'
const activityTypes: { value: FarmActivity['type']; label: string }[] = [
  { value: 'planting', label: 'زراعة' }, { value: 'irrigation', label: 'ري' }, { value: 'fertilization', label: 'تسميد' }, { value: 'harvest', label: 'حصاد' }, { value: 'other', label: 'أخرى' },
]
const expenseCategories = [{ value: 'seeds', label: 'تقاوي' }, { value: 'irrigation', label: 'ري' }, { value: 'fertilizer', label: 'أسمدة' }, { value: 'labor', label: 'عمالة' }, { value: 'other', label: 'أخرى' }]
const reminders = [
  { season: 'قبل الزراعة', title: 'راجع تجهيز الأرض', note: 'تذكير توضيحي: دوّن أي تحليل تربة أو ملاحظات محلية قبل بداية الموسم.' },
  { season: 'خلال الموسم', title: 'سجل الري والعمليات', note: 'أضف مواعيد الري والعمليات كما حدثت في أرضك.' },
  { season: 'بعد الحصاد', title: 'حدّث تاريخ المحاصيل', note: 'سجل المحصول الفعلي وملاحظات الموسم لتخطيط الموسم التالي.' },
]

export default function FarmNotebookPage() {
  const { farmer, activities, expenses, addActivity, updateActivity, deleteActivity, addExpense, deleteExpense } = useAppStore()
  const [tab, setTab] = useState<NotebookTab>('activities')
  const [activityType, setActivityType] = useState<FarmActivity['type']>('planting')
  const [activityDate, setActivityDate] = useState(new Date().toISOString().slice(0, 10))
  const [activityNotes, setActivityNotes] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expenseCategory, setExpenseCategory] = useState(expenseCategories[0].value)
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10))
  const [expenseNotes, setExpenseNotes] = useState('')
  const sortedActivities = useMemo(() => [...activities].sort((a, b) => b.date.localeCompare(a.date)), [activities])
  const sortedExpenses = useMemo(() => [...expenses].sort((a, b) => b.date.localeCompare(a.date)), [expenses])
  const currentPlan = ROTATION_PLANS.find((plan) => plan.id === farmer?.selectedPlanId)
  const cropName = CROPS.find((crop) => crop.id === farmer?.previousCrop)?.nameAr ?? farmer?.previousCrop
  const totals = expenses.reduce<Record<string, number>>((sum, expense) => ({ ...sum, [expense.categoryAr]: (sum[expense.categoryAr] ?? 0) + expense.amount }), {})

  function submitActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!activityDate) return
    const typeAr = activityTypes.find((item) => item.value === activityType)?.label ?? 'أخرى'
    if (editingId) {
      updateActivity(editingId, { type: activityType, typeAr, date: activityDate, notes: activityNotes.trim() })
      toast.success('تم تحديث العملية')
      setEditingId(null)
    } else {
      addActivity({ id: `activity-${Date.now()}`, type: activityType, typeAr, date: activityDate, notes: activityNotes.trim(), createdAt: new Date().toISOString() })
      toast.success('تم حفظ العملية في دفتر أرضك')
    }
    setActivityNotes('')
  }

  function startEditing(activity: FarmActivity) {
    setEditingId(activity.id)
    setActivityType(activity.type)
    setActivityDate(activity.date)
    setActivityNotes(activity.notes ?? '')
    setTab('activities')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEditing() {
    setEditingId(null)
    setActivityNotes('')
  }

  function submitExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const amount = Number(expenseAmount)
    if (!Number.isFinite(amount) || amount <= 0 || !expenseDate) return
    const categoryAr = expenseCategories.find((item) => item.value === expenseCategory)?.label ?? 'أخرى'
    addExpense({ id: `expense-${Date.now()}`, category: expenseCategory, categoryAr, amount, date: expenseDate, notes: expenseNotes.trim(), createdAt: new Date().toISOString() })
    setExpenseAmount('')
    setExpenseNotes('')
    toast.success('تم حفظ المصروف')
  }

  function removeActivity(id: string) {
    if (window.confirm('تحذف العملية من دفتر أرضك؟')) {
      deleteActivity(id)
      toast.success('تم حذف العملية')
    }
  }

  function removeExpense(id: string) {
    if (window.confirm('تحذف المصروف المسجل؟')) {
      deleteExpense(id)
      toast.success('تم حذف المصروف')
    }
  }

  const tabs: { id: NotebookTab; label: string; Icon: typeof BookOpen }[] = [
    { id: 'activities', label: 'العمليات الزراعية', Icon: Sprout },
    { id: 'expenses', label: 'المصروفات', Icon: Coins },
    { id: 'calendar', label: 'مفكرة الموسم', Icon: CalendarDays },
    { id: 'history', label: 'المحاصيل السابقة', Icon: Wheat },
  ]

  return (
    <PageLayout>
      <div className="breadcrumb"><Link href="/dashboard">لوحة أرضي</Link><span>›</span><strong>دفتر أرضي</strong></div>
      <div className="page-topline"><div><span className="eyebrow">سجل أرضك · محفوظ محليًا</span><h1 className="page-title">دفتر أرضي</h1><p className="page-subtitle">دوّن العمليات والمصروفات وملاحظات المواسم. السجلات تبقى في هذا المتصفح فقط.</p></div><span className="chip"><BookOpen size={13} />{activities.length + expenses.length} سجل</span></div>
      <div className="filter-row" role="tablist" aria-label="أقسام دفتر أرضي" style={{ marginBottom: 19 }}>
        {tabs.map(({ id, label, Icon }) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'filter-chip active' : 'filter-chip'} onClick={() => setTab(id)}><Icon size={13} /> {label}</button>)}
      </div>

      {tab === 'activities' && <div className="dashboard-grid"><section className="surface card-pad"><span className="eyebrow">{editingId ? 'تعديل عملية' : 'إضافة عملية'}</span><h2 className="section-title" style={{ marginTop: 8, fontSize: 22 }}>{editingId ? 'حدّث تفاصيل العملية' : 'سجل اللي حصل في الأرض'}</h2><form onSubmit={submitActivity} style={{ marginTop: 19 }}><div className="form-grid"><div className="form-field"><label htmlFor="activity-type">نوع العملية</label><select id="activity-type" className="select" value={activityType} onChange={(event) => setActivityType(event.target.value as FarmActivity['type'])}>{activityTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div><div className="form-field"><label htmlFor="activity-date">التاريخ</label><input id="activity-date" className="input" type="date" value={activityDate} onChange={(event) => setActivityDate(event.target.value)} required /></div></div><div className="form-field" style={{ marginTop: 16 }}><label htmlFor="activity-notes">ملاحظات (اختياري)</label><textarea id="activity-notes" className="textarea" value={activityNotes} onChange={(event) => setActivityNotes(event.target.value)} placeholder="اكتب ملاحظة تساعدك تفتكر تفاصيل الموسم" /></div><div className="action-row" style={{ marginTop: 15 }}><button className="button-primary" type="submit"><CirclePlus size={15} />{editingId ? 'حفظ التعديل' : 'أضف العملية'}</button>{editingId && <button className="button-quiet" type="button" onClick={cancelEditing}>إلغاء</button>}</div></form></section><section className="surface card-pad"><div className="page-topline" style={{ marginBottom: 15 }}><div><span className="eyebrow">الجدول الزمني</span><h2 className="section-title" style={{ marginTop: 7, fontSize: 21 }}>عمليات أرضك</h2></div><span className="chip">{activities.length} عملية</span></div>{sortedActivities.length ? <div className="timeline-list">{sortedActivities.map((activity) => <article className="timeline-item" key={activity.id}><div className="page-topline" style={{ marginBottom: 4 }}><div><h3>{activity.typeAr}</h3><time>{activity.date}</time></div><div className="action-row"><button className="icon-button" onClick={() => startEditing(activity)} aria-label="تعديل العملية"><Pencil size={14} /></button><button className="icon-button" onClick={() => removeActivity(activity.id)} aria-label="حذف العملية"><Trash2 size={14} /></button></div></div><p>{activity.notes || 'بدون ملاحظات'}</p></article>)}</div> : <div className="empty-state"><span className="empty-icon"><Sprout size={21} /></span><h3>لسه مفيش عمليات</h3><p>أضف أول عملية زراعية لتبدأ تكوين سجل الموسم.</p></div>}</section></div>}

      {tab === 'expenses' && <div className="dashboard-grid"><section className="surface card-pad"><span className="eyebrow">إضافة مصروف</span><h2 className="section-title" style={{ marginTop: 8, fontSize: 22 }}>سجل مصروفات الموسم</h2><form onSubmit={submitExpense} style={{ marginTop: 19 }}><div className="form-grid"><div className="form-field"><label htmlFor="expense-category">الفئة</label><select id="expense-category" className="select" value={expenseCategory} onChange={(event) => setExpenseCategory(event.target.value)}>{expenseCategories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div><div className="form-field"><label htmlFor="expense-amount">المبلغ (جنيه)</label><input id="expense-amount" className="input" type="number" min="0.01" step="0.01" value={expenseAmount} onChange={(event) => setExpenseAmount(event.target.value)} required /></div><div className="form-field"><label htmlFor="expense-date">التاريخ</label><input id="expense-date" className="input" type="date" value={expenseDate} onChange={(event) => setExpenseDate(event.target.value)} required /></div></div><div className="form-field" style={{ marginTop: 16 }}><label htmlFor="expense-notes">ملاحظات (اختياري)</label><input id="expense-notes" className="input" value={expenseNotes} onChange={(event) => setExpenseNotes(event.target.value)} placeholder="مثال: شراء تقاوي" /></div><button className="button-primary" style={{ marginTop: 16 }} type="submit"><CirclePlus size={15} />أضف المصروف</button></form><div className="notice gold" style={{ marginTop: 18 }}>المبالغ التي تدخلها ملاحظاتك الخاصة في هذا المتصفح، ولا نستخدمها لاحتساب توصية.</div></section><section className="surface card-pad"><span className="eyebrow">ملخص تجريبي</span><h2 className="section-title" style={{ margin: '8px 0 18px', fontSize: 21 }}>المصروفات حسب الفئة</h2>{Object.keys(totals).length ? <>{Object.entries(totals).map(([category, amount]) => <div className="comparison-row" key={category}><span>{category}</span><span className="comparison-bar"><span style={{ width: `${Math.max(5, (amount / Math.max(...Object.values(totals))) * 100)}%` }} /></span><strong className="comparison-score">{amount.toLocaleString('ar-EG')} ج</strong></div>)}<p className="section-copy">الإجمالي: {expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString('ar-EG')} جنيه</p></> : <div className="empty-state"><span className="empty-icon"><Coins size={21} /></span><h3>لا توجد مصروفات</h3><p>سجل أول مصروف لمتابعة التكلفة التي أدخلتها.</p></div>}{sortedExpenses.map((expense) => <article key={expense.id} className="timeline-item" style={{ marginTop: 15 }}><div className="page-topline" style={{ marginBottom: 2 }}><div><h3>{expense.categoryAr} · {expense.amount.toLocaleString('ar-EG')} ج</h3><time>{expense.date}</time></div><button className="icon-button" onClick={() => removeExpense(expense.id)} aria-label="حذف المصروف"><Trash2 size={14} /></button></div><p>{expense.notes || 'بدون ملاحظات'}</p></article>)}</section></div>}

      {tab === 'calendar' && <section className="surface card-pad"><span className="eyebrow">مفكرة الموسم · أمثلة توضيحية</span><h2 className="section-title" style={{ marginTop: 8 }}>تذكيرات تساعدك تتابع الموسم</h2><p className="section-copy" style={{ marginBottom: 20 }}>هذه تذكيرات عامة قابلة للتعديل مستقبلًا، وليست مواعيد زراعة مخصصة أو إرشادات فنية.</p><div className="calendar-grid">{reminders.map((item) => <article className="calendar-item" key={item.season}><span className="chip">{item.season}</span><h3 style={{ color: 'var(--forest)', fontSize: 14 }}>{item.title}</h3><p>{item.note}</p></article>)}</div>{currentPlan && <div className="surface card-pad" style={{ marginTop: 19 }}><span className="eyebrow">مواسم خطتك المحفوظة</span><div className="rotation-timeline" style={{ marginBottom: 0 }}>{currentPlan.seasons.map((season, index) => <div className="rotation-season" key={index}><small>{season.seasonAr}</small><strong>{season.cropAr}</strong><span>مواعيد إرشادية</span></div>)}</div></div>}</section>}

      {tab === 'history' && <section className="surface card-pad"><span className="eyebrow">المحاصيل السابقة</span><h2 className="section-title" style={{ marginTop: 8 }}>تاريخ زراعة أرضك</h2><p className="section-copy" style={{ marginBottom: 18 }}>المعلومات هنا من مدخلاتك وسجلاتك، وليست تحققًا مستقلًا من الحقول.</p>{cropName ? <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}><div className="metric-card"><span className="metric-label">آخر محصول أدخلته</span><strong className="metric-value">{cropName}</strong></div><div className="metric-card"><span className="metric-label">المصدر</span><strong className="metric-value" style={{ fontSize: 17 }}>مدخل من المزارع</strong></div></div> : <div className="empty-state"><span className="empty-icon"><Wheat size={22} /></span><h3>لم تسجل محصولًا سابقًا</h3><p>يمكنك إضافة تاريخ الزراعة ضمن معلومات أرضك.</p><Link href="/farmer/questions" className="button-secondary">أضف تاريخ الزراعة <ArrowLeft size={15} /></Link></div>}<div className="section-head" style={{ marginTop: 24 }}><h3 className="section-title" style={{ fontSize: 18 }}>محاصيل الخطة المحفوظة</h3></div>{currentPlan ? <div className="rotation-timeline">{currentPlan.seasons.map((season, index) => <div className="rotation-season" key={index}><small>{season.seasonAr}</small><strong>{season.cropAr}</strong><span>مخطط توضيحي</span></div>)}</div> : <p className="section-copy">لم تحفظ خطة بعد.</p>}</section>}
    </PageLayout>
  )
}
