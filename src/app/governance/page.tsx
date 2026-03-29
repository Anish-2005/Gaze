'use client'

import {
  GovernanceHero,
  EthicalDesignPrinciples,
  PrivacyArchitecture,
  AccessibilityStandards,
  SafetyFailureModes,
  TransparencyAccountability,
  ClosingStatement,
} from '@/components/governance'

export default function GovernancePage() {
  return (
    <main className="min-h-screen">
      <GovernanceHero />
      <EthicalDesignPrinciples />
      <PrivacyArchitecture />
      <AccessibilityStandards />
      <SafetyFailureModes />
      <TransparencyAccountability />
      <ClosingStatement />
    </main>
  )
}
