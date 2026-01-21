'use client'

import { useState } from 'react'
import InstitutionalHero from '@/components/institutions/InstitutionalHero'
import DeploymentContexts from '@/components/institutions/DeploymentContexts'
import HospitalWorkflow from '@/components/institutions/HospitalWorkflow'
import LicensingModel from '@/components/institutions/LicensingModel'
import ComplianceGovernance from '@/components/institutions/ComplianceGovernance'
import PilotRolloutPlan from '@/components/institutions/PilotRolloutPlan'
import InstitutionalCTA from '@/components/institutions/InstitutionalCTA'
import ContactFormModal from '@/components/institutions/ContactFormModal'

export default function InstitutionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleScheduleCall = () => {
    setIsFormOpen(true)
  }

  return (
    <main className="min-h-screen">
      <InstitutionalHero onScheduleCall={handleScheduleCall} />
      <DeploymentContexts />
      <HospitalWorkflow />
      <LicensingModel />
      <ComplianceGovernance />
      <PilotRolloutPlan />
      <InstitutionalCTA onScheduleCall={handleScheduleCall} />
      <ContactFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </main>
  )
}
             