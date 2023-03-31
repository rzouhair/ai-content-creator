import AppButton from '@/components/App/AppButton'
import AppCard from '@/components/App/AppCard'
import AppInput from '@/components/App/AppInput'
import LayoutMain from '@/components/Layouts/LayoutMain'
import React from 'react'

function KeywordResearch() {
  return (
    <div className='p-4'>
      <div className='mb-8'>
        <h1 className='font-bold'>Keyword research</h1>
        <p>Discover dozens of relevant keyword clusters in a matter of minutes</p>
      </div>
      <AppCard>
        <AppInput
          placeholder='e.g. Best SEO tool'
          hint='Only one keyword can be added'
          label="Keyword"
          prefix={<i className='i-tabler-key'></i>}
          value={''}
          onChange={(e) => {}}
        />
        <div className='border-t border-dashed border-gray-400 mt-6 pt-3'>
          <AppButton className='ml-auto mr-0' prefixIcon='i-tabler-search'>Create keyword research</AppButton>
        </div>
      </AppCard>
    </div>
  )
}

KeywordResearch.getLayout = (page: any) => {
  return <LayoutMain>
    {page}
  </LayoutMain>
}

export default KeywordResearch