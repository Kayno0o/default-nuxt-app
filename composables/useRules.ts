import type { RuleFunction, RulesName } from '@kaynooo/utils'
import { rules } from '@kaynooo/utils'

export default function useRules<T>(
  value: Ref<T>,
  propsRules: ComputedRef<(RulesName<T> | RuleFunction<T>)[] | undefined>,
  required?: ComputedRef<boolean>,
) {
  const rulesFn = computed(() => {
    const rulesFn = (propsRules.value || []).map(r => (typeof r === 'string' ? rules[r] : r) as RuleFunction<T>)
    if (required?.value)
      rulesFn.push(rules.required)
    return rulesFn
  })
  const errors = computed(() => rulesFn.value.map(rule => rule(value.value)).filter(r => typeof r === 'string'))
  const errorString = computed(() => errors.value.filter(error => typeof error === 'string')[0])

  return {
    errors,
    errorString,
  }
}
