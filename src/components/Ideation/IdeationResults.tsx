import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { IdeationPhases, cardHeader, currentPhaseAtom, ideationResultsAtom, selectedIdeationMethodAtom } from '@/stores/ideation'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

function IdeationResults() {
  const router = useRouter()

  const [selectedIdeationMethod, setSelectedIdeationMethod] = useAtom(selectedIdeationMethodAtom)
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom)

  const [ideationResults, setIdeationResults] = useAtom(ideationResultsAtom)

  function startOver() {
    setSelectedIdeationMethod(null)
    setCurrentPhase(IdeationPhases.NICHE_SELECTION)
    setIdeationResults(null)
  }

  function openList() {
    if (ideationResults)
      router.push(`/keyword-research/${ideationResults?.list_id}`)
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <h3 className='text-xl font-semibold mb-0'>🎉 {ideationResults?.keywords_count || 'n/a'} keywords found using the {selectedIdeationMethod ? cardHeader[selectedIdeationMethod].title : 'n/a'}</h3>
      <div className='flex items-stretch gap-2 mt-4'>
        <Button variant='secondary' disabled={!ideationResults?.list_id} size="sm" onClick={openList}>
          <i className="i-tabler-door mr-2" />
          Access your list
        </Button>
        <Button variant='outline' size="sm" onClick={startOver}>
          <i className="i-tabler-reload mr-2" />
          Start over
        </Button>
      </div>
    </div>
  )
}

export default IdeationResults