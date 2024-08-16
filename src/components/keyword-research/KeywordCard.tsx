import { Cluster } from '@/lib/@types'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'

interface KeywordCardProps extends React.HTMLAttributes<any> {
  cluster: Cluster,
}

function KeywordCard({ cluster }: KeywordCardProps) {

  const [allShown, setAllShown] = useState<boolean>(false)

  const shownKeywords = allShown ? cluster.keywords : cluster.keywords.slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md '>{`${cluster.parent_keyword} (${cluster.keywords.length})`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-1 gap-3 flex-col'>
            {shownKeywords?.map?.((keyword, j) => <div className="flex items-center justify-between" key={j}>
              <p className="text-text text-sm">{ keyword }</p>
              <div className="w-fit">
                <i className="cursor-pointer text-secondary-300 dark:text-secondary w-4 h-4 i-tabler-copy"></i>
              </div>
            </div>)}
          </div>
          { (cluster.keywords?.length > 10) && <Button variant="link" onClick={() => setAllShown(!allShown)}>{ allShown ? 'Show less' : 'Show all' }</Button> }
        </div>
      </CardContent>
    </Card>
  )
}

export default KeywordCard