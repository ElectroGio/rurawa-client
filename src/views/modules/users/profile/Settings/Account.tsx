import React, { useState } from 'react'
import TabSwitcher from '@/components/custom/TabSwitcher/TabSwitcher'
import Personal from './Personal'
import Contacto from './Contact'
import Usuario from './User'
import type { User } from '@/@types/user'

interface AccountProps {
  user: User
  onUpdate: () => void
}

const Account: React.FC<AccountProps> = ({ user, onUpdate }) => {
  const tabs = ["Personal", "Contacto", "Usuario"]
  const [selectedTab, setSelectedTab] = useState<string>("Personal")

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Personal":
        return <Personal user={user} onUpdate={onUpdate} />
      case "Contacto":
        return <Contacto user={user} onUpdate={onUpdate} />
      case "Usuario":
        return <Usuario user={user} />
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