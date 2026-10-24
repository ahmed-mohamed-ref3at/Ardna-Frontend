import { RotationPlan, Priority, PriorityWeights } from '@/data/types'
import { PRIORITY_WEIGHTS } from '@/data/mockData'

export function calculateScore(
  plan: RotationPlan,
  priority: Priority
): number {
  const weights: PriorityWeights = PRIORITY_WEIGHTS[priority]
  const score =
    plan.scores.water * weights.water +
    plan.scores.soil * weights.soil +
    plan.scores.productivity * weights.productivity
  return Math.round(score)
}

export function rankPlans(
  plans: RotationPlan[],
  priority: Priority
): (RotationPlan & { score: number; rank: number })[] {
  const scored = plans.map(plan => ({
    ...plan,
    score: calculateScore(plan, priority),
    rank: 0,
  }))
  scored.sort((a, b) => b.score - a.score)
  scored.forEach((plan, i) => (plan.rank = i + 1))
  return scored
}
