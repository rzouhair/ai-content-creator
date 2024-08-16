import React, { useState } from 'react'
import ModalBase from './ModalBase'
import AppNumberInput from '@/components/App/AppNumberInput'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Icons } from '../ui/icons'
import { CardDescription } from '../ui/card'
import { clusterKeywordsList } from '@/api/keywords'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

function SystemPromptModal(props: any) {

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [clustersCount, setClustersCount] = useState(5)

  const [selectedMethod, setSelectedMethod] = useState('automatic')

  async function clusterList() {
    try {
      setLoading(true)
      if (selectedMethod === 'manual' && !clustersCount)
        throw new Error("Clusters count is required")
      await clusterKeywordsList(router.query.listId as string, selectedMethod === 'manual' ? {
        cluster_count: clustersCount
      } : {})
      toast("Keywords list clustered successfully!")
      props.onClose?.(false)
    } catch (error: any) {
      toast(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalBase
      title="Choose your keywords clustering method"
      trigger={props.trigger}
      open={props.open}
      onClose={() => props.onClose?.(false)}
      className="max-w-[750px]"
    >
      <div>
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="automatic" id="automatic" className="peer sr-only" />
            <Label
              htmlFor="automatic"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary-900 cursor-pointer"
            >
              <i className="i-tabler-wand mb-3 h-6 w-6" />
              Automatic
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="manual"
              id="manual"
              className="peer sr-only"
            />
            <Label
              htmlFor="manual"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer peer-data-[state=checked]:bg-primary-900"
            >
              <i className="i-tabler-adjustments mb-3 h-6 w-6" />
              Manual
            </Label>
          </div>
        </RadioGroup>

        {
          selectedMethod === 'manual'
          && <div className="flex items-end flex-col justify-between gap-4 mt-4">
            <AppNumberInput
              className='w-full'
              value={clustersCount}
              min={2}
              onChange={(e) => setClustersCount(Number(e))}
              label="Number of clusters"
              labelClassName="text-sm"
            />
          </div>
        }
        {
          selectedMethod === 'automatic'
          && <p className='mt-4 text-sm text-muted-foreground'>
            Our backend will determine the best number of clusters to create
          </p>
        }
        <Button loading={loading} className="w-full mt-2" onClick={() => clusterList()}>
          Submit
        </Button>
      </div>
    </ModalBase>
  )
}

export default SystemPromptModal