import React, { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import AppInput from '../App/AppInput'
import AppListbox from '../App/AppListbox'
import { currentPhaseAtom, selectedIdeationMethodAtom, navigatePhases, IdeationPhases, ideationResultsAtom } from '@/stores/ideation'
import { useAtom, useAtomValue } from 'jotai'
import { query_generation } from '@/api/keywords'
import { activeProject as activeProjectAtom } from '@/stores/app'
import AppCountrySelect from '../App/AppCountrySelect'

function IdeationAlphabetSoup() {
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom)
  const [selectedIdeationMethod, setSelectedIdeationMethod] = useAtom(selectedIdeationMethodAtom)
  const activeProject = useAtomValue(activeProjectAtom)

  const [, setIdeationResults] = useAtom(ideationResultsAtom)

  const [loading, setLoading] = useState(false)

  const [inputValues, setInputValues] = useState<Record<string, string>>({
    general_niche: '',
  });
  const [selectedCountry, setSelectedCountry] = useState<string>('US')

  function updateKeyword(id: string, value: string) {
    setInputValues({
      ...inputValues,
      [id]: value
    })
  }

  async function advance(direction: 'back' | 'forward') {
    try {
      setLoading(true)
      const results = await query_generation({
        country: selectedCountry,
        project: activeProject?._id,
        ...inputValues,
      })

      setIdeationResults(results)
      navigatePhases(direction, currentPhase, selectedIdeationMethod, setCurrentPhase)
    } catch {

    } finally {
      setLoading(false)
    }
  }
  const buttonDisabled = (
    (currentPhase === IdeationPhases.NICHE_SELECTION && !selectedIdeationMethod)
  )

  return (
    <div>
      <div className='flex gap-2 flex-col mb-2'>
        <AppInput
          label='Partial search query'
          hint='The simpler the better, e.g: bodybuilding, hiking'
          hintClassName='mb-2'
          value={inputValues['general_niche']}
          onChange={(e) => updateKeyword('general_niche', e.target.value)}
        />
        <AppCountrySelect
          value={selectedCountry}
          onChange={(e: string) => setSelectedCountry(e)}
        />
      </div>
      <div className='flex items-center justify-end gap-2 mt-6'>
        {currentPhase !== IdeationPhases.NICHE_SELECTION && <Button loading={loading} onClick={() => advance('back')} variant={'outline'}>Go back</Button>}
        <Button loading={loading} onClick={() => advance('forward')} disabled={buttonDisabled}>Advance</Button>
      </div>
    </div>
  )
}

export default IdeationAlphabetSoup