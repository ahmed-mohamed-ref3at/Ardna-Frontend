export interface Farm {
  id: string
  name: string
  governorate: string
  district: string
  village?: string
  area_m2: number
  area_feddan: number
  area_qirat: number
  polygon: [number, number][]
  center: [number, number]
  createdAt: string
}

export interface FarmLocation {
  governorate: string
  district: string
  village: string
  center: [number, number]
}

export interface OnboardingAnswers {
  previousCrop: string
  irrigationMethod: string
  waterSource: string
  waterAvailability: string
  priority: Priority
}

export interface FarmerProfile {
  id: string
  name: string
  email?: string
  phone?: string
  farm?: Farm
  previousCrop?: string
  irrigationMethod?: string
  waterSource?: string
  waterAvailability?: string
  priority?: 'water' | 'soil' | 'productivity' | 'balanced'
  selectedPlanId?: string
  createdAt: string
}

export interface CropSeason {
  season: string
  seasonAr: string
  crop: string
  cropAr: string
  plantingWindow: string
  harvestWindow: string
  notes?: string
  notesAr?: string
}

export interface RotationPlan {
  id: string
  nameAr: string
  nameEn: string
  focus: string
  focusAr: string
  seasons: CropSeason[]
  scores: {
    water: number
    soil: number
    productivity: number
  }
  tradeoffs: string[]
  tradeoffsAr: string[]
  reasons: string[]
  reasonsAr: string[]
}

export interface FarmActivity {
  id: string
  type: 'planting' | 'irrigation' | 'fertilization' | 'harvest' | 'other'
  typeAr: string
  date: string
  notes?: string
  createdAt: string
}

export interface FarmExpense {
  id: string
  category: string
  categoryAr: string
  amount: number
  date: string
  notes?: string
  createdAt: string
}

export interface Crop {
  id: string
  nameAr: string
  nameEn: string
  category: string
  categoryAr: string
  shortDescAr: string
  seasons: string[]
  waterReq: 'low' | 'medium' | 'high'
  soilSuitability: string
  imageColor: string
}

export type Priority = 'water' | 'soil' | 'productivity' | 'balanced'

export type OnboardingAnswerKey = keyof OnboardingAnswers

export interface PriorityWeights {
  water: number
  soil: number
  productivity: number
}
