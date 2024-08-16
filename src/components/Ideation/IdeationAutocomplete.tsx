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
import { useAtom, useAtomValue } from 'jotai'
import { currentPhaseAtom, selectedIdeationMethodAtom, IdeationPhases, navigatePhases, ideationResultsAtom, IdeationResult } from '@/stores/ideation'
import { autocomplete } from '@/api/keywords'
import { activeProject as activeProjectAtom } from '@/stores/app'
import AppCountrySelect from '../App/AppCountrySelect'

function IdeationAutocomplete() {
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom)
  const [selectedIdeationMethod, setSelectedIdeationMethod] = useAtom(selectedIdeationMethodAtom)
  const activeProject = useAtomValue(activeProjectAtom)

  const [, setIdeationResults] = useAtom(ideationResultsAtom)

  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string>('US')

  const [wordForms, setWordForms] = useState([
    {
      id: "general_niche",
      label: "General niche",
      placeholder: "e.g: cycling, tax planning, motherhood"
    },
    {
      id: "concept_in_plural_form",
      label: "Noun or concept in plural form",
      placeholder: "e.g: bikes, quickbooks, baby schedules"
    },
    {
      id: "concept_in_singular_form",
      label: "Noun or concept in singular form",
      placeholder: "e.g: bike, CPA test, baby sleep"
    },
    {
      id: "person_involved_in_niche_plural",
      label: "Person involved in your niche in plural form",
      placeholder: "e.g: cyclists, accountants, mothers"
    },
    {
      id: "action_phrase",
      label: "Action phrase",
      placeholder: "e.g: ride a bike, take the CPA test, get baby to sleep"
    },
    {
      id: "verb_in_continuous_form",
      label: "Continuous Verb or action phrase ending in -ing",
      placeholder: "e.g: biking, taking the CPA test, getting baby to sleep"
    }
  ])

  const [inputValues, setInputValues] = useState<Record<string, string>>({
    general_niche: '',
    concept_in_plural_form: '',
    concept_in_singular_form: '',
    person_involved_in_niche_plural: '',
    action_phrase: '',
    verb_in_continuous_form: ''
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
      const results: IdeationResult = await autocomplete({
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
      <Tabs defaultValue="auto_detection">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="auto_detection">Auto detection</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="auto_detection">
          <div className='flex gap-2 flex-col mb-2'>
            <AppInput
              label='General niche'
              hint='e.g: cycling, tax planning, motherhood'
              hintClassName='mb-2'
              value={inputValues['general_niche']}
              onChange={(e) => updateKeyword('general_niche', e.target.value)}
            />
          </div>
        </TabsContent>
        <TabsContent value="advanced">
          <div className='flex gap-2 flex-col mb-2'>
            {
              wordForms.map((word, i) => <AppInput
                key={word.id}
                hintClassName='mb-2'
                label={word.label}
                hint={word.placeholder}
                value={inputValues[word.id]}
                onChange={(e) => updateKeyword(word.id, e.target.value)}
              />)
            }
          </div>
        </TabsContent>
        <AppCountrySelect
          value={selectedCountry}
          onChange={(e: string) => setSelectedCountry(e)}
        />
      </Tabs>
      <div className='flex items-center justify-end gap-2 mt-6'>
        <Button loading={loading} onClick={() => advance('back')} variant={'outline'}>Go back</Button>
        <Button loading={loading} onClick={() => advance('forward')}>Advance</Button>
      </div>
    </div>
  )
}

export default IdeationAutocomplete