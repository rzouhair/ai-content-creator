import AppButton from '@/components/App/AppButton'
import AppCheckbox from '@/components/App/AppCheckbox'
import AppEditor from '@/components/App/AppEditor'
import AppInput from '@/components/App/AppInput'
import AppSidebar from '@/components/App/AppNav/AppNav'
import LayoutMain from '@/components/Layouts/LayoutMain'
import React, { useState } from 'react'

function HomePage() {

  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className='flex items-center gap-4 flex-wrap'>
            <AppButton size="sm" />
            <AppButton size="md" />
            <AppButton size="lg" />
            <AppButton size="xl" />
            <AppButton size="2xl" />

            <AppButton size="2xl" disabled={true} background="indigo" />

            <AppButton text="indigo-900" background="transparent" />
          </div>
          <AppInput
            value={value}
            label="E-mail"
            onChange={(e: any) => setValue(e.target.value)}
          />

          <AppCheckbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
            Yes label
          </AppCheckbox>
          
          <div className="flex items-start justify-center rounded">
            <AppEditor />
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}

HomePage.getLayout = function getLayout(page: any) {
  return (
    <LayoutMain>
      {page}
    </LayoutMain>
  )
}


export default HomePage