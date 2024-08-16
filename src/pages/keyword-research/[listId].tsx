import LayoutMain from "@/components/Layouts/LayoutMain"
import KeywordClustering from "@/components/keyword-research/KeywordClustering"
import KeywordList from "@/components/keyword-research/KeywordList"
import KeywordListCards from "@/components/keyword-research/KeywordListCards"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

function KeywordResearch() {

  const [selectedTab, setSelectedTab] = useState<string>('list')
  const [selectedKwView, setSelectedKwView] = useState<string>('table')

  return <div>
    <div className={`${selectedTab === 'list' ? 'block' : 'hidden'}`}>
      <Tabs defaultValue="table" onValueChange={setSelectedKwView} className="w-fit mt-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="clusters">Clusters</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className={`${selectedKwView === 'table' ? 'block' : 'hidden'} mt-2`}>
        <KeywordList />
      </div>
      <div className={`${selectedKwView === 'cards' ? 'block' : 'hidden'}`}>
        <KeywordListCards />
      </div>
      {
        selectedKwView === 'clusters'
        && <div>
          <KeywordClustering />
        </div>
      }
    </div>
  </div>
}

KeywordResearch.getLayout = (page: any) => {
  return <LayoutMain
    title="Keyword research"
    description="Discover dozens of relevant keyword clusters in a matter of minutes"
  >
    {page}
  </LayoutMain>
}

export default KeywordResearch
