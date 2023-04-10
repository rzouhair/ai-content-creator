import AppButton from '@/components/App/AppButton'
import AppCard from '@/components/App/AppCard'
import AppInput from '@/components/App/AppInput'
import LayoutMain from '@/components/Layouts/LayoutMain'
import React, { useState, useCallback, useEffect } from 'react'
import axios from '@/lib/axios'
import AppCheckbox from '@/components/App/AppCheckbox'
import ReactMarkdown from 'react-markdown'

function KeywordResearch() {

  const [keyword, setKeyword] = useState('')
  const [checked, setChecked] = useState(true)

  const [suggestions, setSuggestions] = useState([])

  const changeHandler = async(e: any) => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    try {
      if (keyword) {
        const data = {
          query: keyword,
          with_styling: checked
        }
  
        axios.post('/keyword-research/suggestions/', data).then((res) => {
          setSuggestions(res.data || [])
        })
      } else {
        setSuggestions([])
      }
    } catch (error) {
      
    }
  }, [keyword, checked])

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
          value={keyword}
          debounced={true}
          debounceTime={750}
          onChange={changeHandler}
        />
        <div className='border-t border-dashed border-gray-400 mt-6 pt-3'>
          <AppCheckbox checked={checked} id={'with-styling'} onChange={(e) => {
            setChecked(e.target.checked)
          }}>
            Get suggestions with styling
          </AppCheckbox>
          <AppButton className='ml-auto mr-0' prefixIcon='i-tabler-search'>Search</AppButton>
        </div>

        <div>
          {
            suggestions?.length > 0 && <ul className="bg-gray-50 mt-4 px-4 py-3 rounded-md flex gap-2 flex-col">
              {
                suggestions?.length ?
                  suggestions.map((s, i) =>
                    <li key={i} className={"bg-gray-100 hover:bg-gray-200 transition-colors rounded-sm cursor-pointer px-2 py-3"} dangerouslySetInnerHTML={{
                      __html: s
                    }} />
                  )
                : null
              }
            </ul>
          }
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