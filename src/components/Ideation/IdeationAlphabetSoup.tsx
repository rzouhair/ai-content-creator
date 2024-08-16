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
import { alphabet_soup } from '@/api/keywords'
import { IdeationResult, currentPhaseAtom, ideationResultsAtom, navigatePhases, selectedIdeationMethodAtom } from '@/stores/ideation'
import { useAtom, useAtomValue } from 'jotai'
import { activeProject as activeProjectAtom } from '@/stores/app'
import AppCountrySelect from '../App/AppCountrySelect'

function IdeationAlphabetSoup() {

  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom)
  const [selectedIdeationMethod, setSelectedIdeationMethod] = useAtom(selectedIdeationMethodAtom)

  const [, setIdeationResults] = useAtom(ideationResultsAtom)

  const activeProject = useAtomValue(activeProjectAtom)
  const [loading, setLoading] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState<string>('US')

  const [wordForms, setWordForms] = useState([
    {
      id: "general_niche",
      label: "General niche",
      placeholder: "e.g: cycling, tax planning, motherhood"
    },
    {
      id: "plural_noun_concept",
      label: "Noun or concept in plural form",
      placeholder: "e.g: bikes, quickbooks, baby schedules"
    },
    {
      id: "singular_noun_concept",
      label: "Noun or concept in singular form",
      placeholder: "e.g: bike, CPA test, baby sleep"
    },
    {
      id: "plural_person_involved",
      label: "Person involved in your niche in plural form",
      placeholder: "e.g: cyclists, accountants, mothers"
    },
    {
      id: "action_phrase",
      label: "Action phrase",
      placeholder: "e.g: ride a bike, take the CPA test, get baby to sleep"
    },
    {
      id: "verb_ing",
      label: "Continuous Verb or action phrase ending in -ing",
      placeholder: "e.g: biking, taking the CPA test, getting baby to sleep"
    }
  ])

  const [inputValues, setInputValues] = useState<Record<string, string>>({
    partial_query: '',
  });

  function updateKeyword(id: string, value: string) {
    setInputValues({
      ...inputValues,
      [id]: value
    })
  }

  async function advance(direction: 'back' | 'forward') {
    try {
      if (!activeProject)
        return
      setLoading(true)
      const results: IdeationResult = await alphabet_soup({
        country: selectedCountry,
        project: activeProject?._id,
        ...inputValues,
      })

      setIdeationResults(results)
      navigatePhases(direction, currentPhase, selectedIdeationMethod, setCurrentPhase)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex gap-2 flex-col mb-2'>
        <AppInput
          label='Partial search query'
          hint='e.g: Best places to visit in'
          hintClassName='mb-2'
          value={inputValues['partial_query']}
          onChange={(e) => updateKeyword('partial_query', e.target.value)}
        />

        <AppCountrySelect
          value={selectedCountry}
          onChange={(e: string) => setSelectedCountry(e)}
        />
      </div>
      <div className='flex items-center justify-end gap-2 mt-6'>
        <Button loading={loading} onClick={() => advance('back')} variant={'outline'}>Go back</Button>
        <Button loading={loading} onClick={() => advance('forward')}>Advance</Button>
      </div>
    </div>
  )
}

export default IdeationAlphabetSoup