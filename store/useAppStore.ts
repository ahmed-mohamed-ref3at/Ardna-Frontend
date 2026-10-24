'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  FarmerProfile,
  Farm,
  FarmActivity,
  FarmExpense,
  FarmLocation,
  OnboardingAnswerKey,
  OnboardingAnswers,
  Priority,
} from '@/data/types'
import { DEMO_FARMER, DEMO_FARM } from '@/data/mockData'

interface AppState {
  isLoggedIn: boolean
  hasHydrated: boolean
  farmer: FarmerProfile | null
  onboardingFarm: Farm | null
  onboardingLocation: FarmLocation
  draftPolygon: [number, number][]
  onboardingAnswers: OnboardingAnswers
  selectedPlanId: string | null
  comparisonPlanIds: string[]
  onboardingStep: number
  activities: FarmActivity[]
  expenses: FarmExpense[]
  setHasHydrated: (value: boolean) => void
  loginAsDemoFarmer: () => void
  logout: () => void
  setFarmer: (farmer: FarmerProfile) => void
  saveFarmerProfile: (profile: FarmerProfile) => void
  updateFarmer: (updates: Partial<FarmerProfile>) => void
  setOnboardingFarm: (farm: Farm | null) => void
  setOnboardingLocation: (location: FarmLocation) => void
  setDraftPolygon: (polygon: [number, number][]) => void
  confirmFarm: (farm: Farm) => void
  setOnboardingAnswer: <K extends OnboardingAnswerKey>(key: K, value: OnboardingAnswers[K]) => void
  setOnboardingStep: (step: number) => void
  setPriority: (priority: Priority) => void
  setSelectedPlan: (planId: string) => void
  setComparisonPlans: (planIds: string[]) => void
  addActivity: (activity: FarmActivity) => void
  updateActivity: (id: string, updates: Partial<FarmActivity>) => void
  deleteActivity: (id: string) => void
  addExpense: (expense: FarmExpense) => void
  updateExpense: (id: string, updates: Partial<FarmExpense>) => void
  deleteExpense: (id: string) => void
  resetDemo: () => void
}

const initialLocation: FarmLocation = {
  governorate: 'البحيرة',
  district: 'دمنهور',
  village: 'منطقة زراعية قريبة من دمنهور',
  center: [31.034, 30.468],
}

const initialAnswers: OnboardingAnswers = {
  previousCrop: '',
  irrigationMethod: '',
  waterSource: '',
  waterAvailability: '',
  priority: 'balanced',
}

const initialState = {
  isLoggedIn: false,
  hasHydrated: false,
  farmer: null,
  onboardingFarm: null,
  onboardingLocation: initialLocation,
  draftPolygon: [] as [number, number][],
  onboardingAnswers: initialAnswers,
  selectedPlanId: null,
  comparisonPlanIds: [] as string[],
  onboardingStep: 0,
  activities: [] as FarmActivity[],
  expenses: [] as FarmExpense[],
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      loginAsDemoFarmer: () =>
        set({
          isLoggedIn: true,
          farmer: DEMO_FARMER,
          onboardingFarm: DEMO_FARM,
          onboardingLocation: {
            governorate: DEMO_FARM.governorate,
            district: DEMO_FARM.district,
            village: DEMO_FARM.village ?? '',
            center: DEMO_FARM.center,
          },
          draftPolygon: DEMO_FARM.polygon,
          onboardingAnswers: {
            previousCrop: 'maize',
            irrigationMethod: 'surface',
            waterSource: 'canal',
            waterAvailability: 'limited',
            priority: 'water',
          },
          selectedPlanId: 'plan-a',
          comparisonPlanIds: ['plan-a', 'plan-b'],
          activities: [
            {
              id: 'act-demo-1',
              type: 'planting',
              typeAr: 'زراعة',
              date: '2026-11-05',
              notes: 'سجل توضيحي لموسم الفول البلدي.',
              createdAt: '2026-10-20T09:00:00.000Z',
            },
          ],
          expenses: [
            {
              id: 'exp-demo-1',
              category: 'seeds',
              categoryAr: 'تقاوي',
              amount: 1200,
              date: '2026-11-01',
              notes: 'مصروف تجريبي — تقاوي.',
              createdAt: '2026-10-20T09:00:00.000Z',
            },
          ],
        }),
      logout: () => set({ isLoggedIn: false, farmer: null }),
      setFarmer: (farmer) => set({ farmer, isLoggedIn: true }),
      saveFarmerProfile: (farmer) =>
        set((state) => ({
          farmer,
          isLoggedIn: true,
          onboardingFarm: farmer.farm ?? state.onboardingFarm,
          selectedPlanId: farmer.selectedPlanId ?? state.selectedPlanId,
        })),
      updateFarmer: (updates) =>
        set((state) => ({
          farmer: state.farmer ? { ...state.farmer, ...updates } : null,
        })),
      setOnboardingFarm: (onboardingFarm) => set({ onboardingFarm }),
      setOnboardingLocation: (onboardingLocation) => set({ onboardingLocation }),
      setDraftPolygon: (draftPolygon) => set({ draftPolygon }),
      confirmFarm: (farm) =>
        set((state) => ({
          onboardingFarm: farm,
          onboardingLocation: {
            governorate: farm.governorate,
            district: farm.district,
            village: farm.village ?? '',
            center: farm.center,
          },
          draftPolygon: farm.polygon,
          farmer: state.farmer ? { ...state.farmer, farm } : null,
        })),
      setOnboardingAnswer: (key, value) =>
        set((state) => ({
          onboardingAnswers: { ...state.onboardingAnswers, [key]: value },
          ...(key === 'priority' && state.farmer
            ? { farmer: { ...state.farmer, priority: value as Priority } }
            : {}),
        })),
      setOnboardingStep: (onboardingStep) => set({ onboardingStep }),
      setPriority: (priority) =>
        set((state) => ({
          onboardingAnswers: { ...state.onboardingAnswers, priority },
          farmer: state.farmer ? { ...state.farmer, priority } : null,
        })),
      setSelectedPlan: (selectedPlanId) =>
        set((state) => ({
          selectedPlanId,
          farmer: state.farmer ? { ...state.farmer, selectedPlanId } : null,
        })),
      setComparisonPlans: (comparisonPlanIds) => set({ comparisonPlanIds }),
      addActivity: (activity) =>
        set((state) => ({ activities: [activity, ...state.activities] })),
      updateActivity: (id, updates) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity
          ),
        })),
      deleteActivity: (id) =>
        set((state) => ({ activities: state.activities.filter((activity) => activity.id !== id) })),
      addExpense: (expense) =>
        set((state) => ({ expenses: [expense, ...state.expenses] })),
      updateExpense: (id, updates) =>
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updates } : expense
          ),
        })),
      deleteExpense: (id) =>
        set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id) })),
      resetDemo: () => set({ ...initialState, hasHydrated: true }),
    }),
    {
      name: 'ardna-app-state',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        farmer: state.farmer,
        onboardingFarm: state.onboardingFarm,
        onboardingLocation: state.onboardingLocation,
        draftPolygon: state.draftPolygon,
        onboardingAnswers: state.onboardingAnswers,
        selectedPlanId: state.selectedPlanId,
        comparisonPlanIds: state.comparisonPlanIds,
        onboardingStep: state.onboardingStep,
        activities: state.activities,
        expenses: state.expenses,
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
)
