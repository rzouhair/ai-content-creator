import React, { useEffect, useState } from 'react'
import IdeationMethodCard from './IdeationMethodCard'
import { IdeationPhases, currentPhaseAtom, navigatePhases, selectedIdeationMethodAtom } from '@/stores/ideation'
import { useAtom } from 'jotai'
import { Button } from '@/components/ui/button'

interface IdeationMethodSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  onMethodSelection: Function
}

function IdeationMethodSelector(props: IdeationMethodSelectorProps) {
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom)
  const [selectedIdeationMethod, setSelectedIdeationMethod] = useAtom(selectedIdeationMethodAtom)


  const ideationMethods = [
    {
      id: IdeationPhases.AUTOCOMPLETE,
      icon: 'i-tabler-search',
      title: 'Google autocomplete',
      description: 'Get search engines suggested keywords for your niche'
    },
    {
      id: IdeationPhases.ALPHABET_SOUP,
      icon: 'i-tabler-abc',
      title: 'Alphabet soup',
      description: 'Get dozens of keyword ideas using the famous alphabet soup method'
    },
    {
      id: IdeationPhases.QUERY_GENERATOR,
      icon: 'i-tabler-brain',
      title: 'Query generation',
      description: 'Get multiple query suggestions out of a single input'
    }
  ]

  const [selectedMethod, setSelectedMethod] = useState<IdeationPhases.AUTOCOMPLETE | IdeationPhases.ALPHABET_SOUP | IdeationPhases.QUERY_GENERATOR | null>(selectedIdeationMethod)

  useEffect(() => {
    props.onMethodSelection?.(selectedMethod)
  }, [selectedMethod, props])

  function advance(direction: 'back' | 'forward') {
    navigatePhases(direction, currentPhase, selectedIdeationMethod, setCurrentPhase)
  }
  const buttonDisabled = (
    (currentPhase === IdeationPhases.NICHE_SELECTION && !selectedIdeationMethod)
  )

  return (
    <div>
      <div className='flex items-center justify-center gap-4 w-full'>
        {ideationMethods?.map?.((method) =>
          <IdeationMethodCard
            {...method}
            selected={selectedMethod === method.id}
            onClick={() => setSelectedMethod(method.id as any)}
            key={method.id}
          />)
        }
      </div>
      <div className='flex items-center justify-end gap-2 mt-6'>
        {currentPhase !== IdeationPhases.NICHE_SELECTION && <Button onClick={() => advance('back')} variant={'outline'}>Go back</Button>}
        <Button onClick={() => advance('forward')} disabled={buttonDisabled}>Advance</Button>
      </div>
    </div>
  )
}

export default IdeationMethodSelector