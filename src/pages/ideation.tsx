import IdeationAlphabetSoup from '@/components/Ideation/IdeationAlphabetSoup'
import IdeationAtp from '@/components/Ideation/IdeationAtp'
import IdeationAutocomplete from '@/components/Ideation/IdeationAutocomplete'
import IdeationMethodSelector from '@/components/Ideation/IdeationMethodPhase/IdeationMethodSelector'
import IdeationResults from '@/components/Ideation/IdeationResults'
import LayoutMain from '@/components/Layouts/LayoutMain'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IdeationPhases, cardHeader, currentPhaseAtom, selectedIdeationMethodAtom } from '@/stores/ideation'
import { useAtom } from 'jotai'
import React, { useMemo } from 'react'

function Ideation() {

  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom)
  const [selectedIdeationMethod, setSelectedIdeationMethod] = useAtom(selectedIdeationMethodAtom)

  const renderCurrentPhase = useMemo(() => {
    let phaseToRender;
    switch (currentPhase) {
      case IdeationPhases.NICHE_SELECTION:
        phaseToRender = <IdeationMethodSelector onMethodSelection={(selectedMethod: IdeationPhases.AUTOCOMPLETE | IdeationPhases.ALPHABET_SOUP | IdeationPhases.QUERY_GENERATOR) => {setSelectedIdeationMethod(selectedMethod)}} />;
        break;
      case IdeationPhases.AUTOCOMPLETE:
        phaseToRender = <IdeationAutocomplete />;
        break;
      case IdeationPhases.ALPHABET_SOUP:
        phaseToRender = <IdeationAlphabetSoup />;
        break;
      case IdeationPhases.QUERY_GENERATOR:
        phaseToRender = <IdeationAtp />;
        break;
      case IdeationPhases.RESULTS:
        phaseToRender = <IdeationResults />;
        break;
      case null:
        phaseToRender = <h1>Nothing is selected yet</h1>;
        break;
      default:
        phaseToRender = <h1>Nothing is selected yet</h1>;
        break;
    }
  
    return phaseToRender;
  }, [currentPhase]);

  const buttonDisabled = (
    (currentPhase === IdeationPhases.NICHE_SELECTION && !selectedIdeationMethod)
  )

  return (
    <div className='p-4'>
      <Card className='w-full mx-auto max-w-4xl'>
        <CardHeader className='text-center'>
          <CardTitle>{ cardHeader[currentPhase].title }</CardTitle>
          <CardDescription>{ cardHeader[currentPhase].description }</CardDescription>
        </CardHeader>
        <CardContent>
          { renderCurrentPhase }
        </CardContent>
      </Card>
    </div>
  )
}

Ideation.getLayout = (page: any) => {
  return <LayoutMain
    title="Ideation"
    description="Get AI generated and search engines suggested keywords to cover all your niche topics"
  >
    {page}
  </LayoutMain>
}

export default Ideation