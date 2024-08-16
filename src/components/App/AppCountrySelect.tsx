import React, { useState } from 'react'
import AppListbox from './AppListbox'

type AppCountrySelectProps = {
  value: string
  onChange: (e: string) => void
}

function AppCountrySelect({
  value = 'US',
  onChange
}: AppCountrySelectProps) {
  const countries = [
    { label: 'United States', value: 'US' },
    { label: 'Spain', value: 'ES' },
    { label: 'France', value: 'FR' },
    { label: 'Italy', value: 'IT' },
  ]

  return (
    <AppListbox
      label='Country'
      value={value}
      options={countries}
      onChange={onChange}
    />
  )
}

export default AppCountrySelect