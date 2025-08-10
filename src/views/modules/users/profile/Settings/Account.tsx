import React, { useState } from 'react'
import TabSwitcher from '@/components/custom/TabSwitcher/TabSwitcher'
import Personal from './Personal'
import Contacto from './Contact'
import Usuario from './User'

const Account: React.FC = () => {
  const tabs = ["Personal", "Contacto", "Usuario"]
  const [selectedTab, setSelectedTab] = useState<string>("Personal")

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Personal":
        return <Personal />
      case "Contacto":
        return <Contacto />
      case "Usuario":
        return <Usuario />
      default:
        return null
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-black mb-4">Cuenta</h2>
      <div className="w-3/4 mx-auto">
        <TabSwitcher
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </div>
      <div className="mt-4">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Account