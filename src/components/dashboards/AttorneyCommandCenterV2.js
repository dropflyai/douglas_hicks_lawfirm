'use client'

import AttorneyCommandCenterV3 from './AttorneyCommandCenterV3'

const AttorneyCommandCenterV2 = ({ userRole, aiActive, setAiActive }) => {
  // Fallback to the optimized V3 dashboard
  return (
    <AttorneyCommandCenterV3 
      userRole={userRole}
      aiActive={aiActive}
      setAiActive={setAiActive}
    />
  )
}

export default AttorneyCommandCenterV2