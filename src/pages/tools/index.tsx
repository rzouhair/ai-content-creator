import ContentOutput from '@/components/Content/ContentOutput';
import LayoutMain from '@/components/Layouts/LayoutMain'
import { Skill, Tag } from "@/lib/@types";
import { sideBarTheme } from "@/stores/theme";
import { skills as skillsAtom } from "@/stores/templates";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import ToolSkill from '@/components/Tools/ToolSkill';
import ToolForm from '@/components/Tools/ToolForm';
import { Button } from '@/components/ui/button';
import AppTabs from '@/components/App/AppTabs';
import { Select } from '@/components/ui/select';
import AppListbox from '@/components/App/AppListbox';
import { Badge } from '@/components/ui/badge';
import { getSkillOutputs } from '@/api/skills';

function Tools() {

  const [theme] = useAtom(sideBarTheme)
  const [generatedData, setGeneratedData] = useState<any[] | null>(null)

  const [skills] = useAtom<Skill[]>(skillsAtom)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const tags = Array.from(new Set(skills.map((skill) => skill.tags.map((t) => t.name)).flat(1))).map((tag: string) => ({
    label: tag,
    value: tag,
  }))

  useEffect(() => {
    if (!selectedTag)
      setSelectedTag(tags?.[0]?.value)
    else
      setSelectedTag(selectedTag)
  }, [tags, selectedTag])

  const fetchOutputs = useCallback(async () => {
    try {
      if (!selectedSkill) {
        setGeneratedData([]);
        return;
      }
      const outputs = await getSkillOutputs(selectedSkill._id)

      setGeneratedData(outputs);
    } catch (error) {
      console.error('Error fetching outputs:', error);
      // Handle the error or display an error message to the user if needed.
    }
  }, [selectedSkill]);


  useEffect(() => {
    if (!selectedSkill) {
      setGeneratedData(null)
      return
    }
    fetchOutputs()

  }, [fetchOutputs, selectedSkill])
  
  const renderSkills = () => {
    return skills.map((s: Skill) => {
      return <ToolSkill skill={s} key={s._id} onClick={(e) => {
        setSelectedSkill(s)
      }} />
    })
  }

  const renderSelectedSkill = () => {
    return <div className='mt-0'>
      <ToolForm
        className={'px-4 mb-4'}
        skill={selectedSkill as Skill}
        onDataGenerated={(data) => {
          setGeneratedData([
            ...data,
            ...(generatedData || [])
          ])
        }}
      />
      <div className={!!generatedData?.length ? 'border-t dark:border-platinum-100 border-platinum pb-8' : ''}>
        <h2 className='font-semibold text-2xl mt-4 dark:text-white'>Previous Generations</h2>
        {generatedData?.map((output, key) => {
          return <ContentOutput className='border dark:border-muted rounded-md mt-4' output={output} key={output._id} onOutputDeleted={() => fetchOutputs()} />
        }) || <p></p>}
      </div>
    </div>
  }
  return (
    <div
      id="navbar"
      className="flex flex-1 flex-col overflow-y-auto w-full"
    >
      <section className={`flex-1 items-center transition-colors mx-auto sm:w-full sm:max-w-5xl`}>
        <div className="px-4 h-[42px] flex items-center">
          {
            selectedSkill &&
              <Button variant="link" className="font-semibold p-1 mb-4 mt-8">
                <button className="flex items-center gap-2 cursor-pointer w-full" onClick={(e) => setSelectedSkill(null)}>
                  <i className="i-tabler-arrow-left min-w-[14px] h-[14px]"></i>
                  <p>Back to tools</p>
                </button>
              </Button>
          }
        </div>

        {selectedSkill ? renderSelectedSkill() : <div>
          <div className='flex items-center flex-wrap gap-2 mt-4'>
            {tags.map((tag) => (
              <Badge className='cursor-pointer' onClick={() => setSelectedTag(tag.value)} variant={selectedTag === tag.value ? 'default' : 'outline'} key={tag.value}>{tag.label}</Badge>
            ))}
          </div>
          <div className={`grid sm:grid-cols-3 gap-4 pt-4 pb-8 ${selectedSkill ? 'hidden' : ''}`}>
            {skills.filter((s) => s.tags.map((t) => t.name).includes(selectedTag as string)).map((s: Skill) => {
              return <ToolSkill skill={s} key={s._id} onClick={(e) => {
                setSelectedSkill(s)
              }} />
            })}
          </div>
        </div>}
      </section>
    </div>
  );
}

Tools.getLayout = (page: any) => {
  return <LayoutMain
    title="Generation Tools"  
    description="Use Our tools to generate the perfect copy that fits your campaigns, landing pages, blog posts and more"
  >
    {page}
  </LayoutMain>
}

export default Tools