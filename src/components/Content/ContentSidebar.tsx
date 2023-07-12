import { Skill, Tag } from "@/lib/@types";
import axiosInstance from "@/lib/axios";
import { skills as skillsAtom } from "@/stores/templates";
import { sideBarTheme } from "@/stores/theme";
import { useAtom } from "jotai";
import ReactMarkdown from 'react-markdown'
import React, { useCallback, useEffect, useState } from "react";
import SkillItem from "./ContentTemplates/SkillItem";
import SkillForm from "./ContentTemplates/SkillForm";
import Image from "next/image";
import ContentOutput from "./ContentOutput";
import openai from "openai";

function ContentSidebar() {
  const [theme] = useAtom(sideBarTheme)

  const [icon, setIcon] = useState<string | null>(null)

  const [generatedData, setGeneratedData] = useState<any[] | null>(null)

  const [skills] = useAtom<Skill[]>(skillsAtom)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const fetchOutputs = useCallback(async () => {
    try {
      if (!selectedSkill) {
        setGeneratedData(null)
        return
      }

      const outputs = await axiosInstance.get('/content-gen/skills/' + selectedSkill._id + '/outputs/')

      setGeneratedData([
        ...outputs.data,
      ])
    } catch (error) {
      
    }
  }, [selectedSkill])


  useEffect(() => {
    if (!selectedSkill) {
      setGeneratedData(null)
      setIcon(null)
      return
    }

    async function fetchIcon () {
      if (selectedSkill?.icon === "" && selectedSkill?.emoji !== "")
        return null
      
      import(`@/assets/icons/${(selectedSkill?.icon === "" && selectedSkill?.emoji === "") ? 'default' : selectedSkill?.icon}.svg`).then((res) => {
        setIcon(res.default)
        return selectedSkill?.icon
      }).catch(() => {
        setIcon(null)
        return selectedSkill?.emoji
      })
    }

    fetchOutputs()
    fetchIcon()

  }, [fetchOutputs, selectedSkill])
  
  const renderSkills = () => {
    return skills.filter((s: Skill) => s.tags.some((t: Tag) => ["blog", "seo"].includes(t.name.toLowerCase()))).map((s: Skill) => {
      return <SkillItem skill={s} key={s._id} onClick={(e) => {
        setSelectedSkill(s)
      }} />
    })
  }

  const renderSelectedSkill = () => {
    return <div>
      <SkillForm
        className={'px-4 mb-4'}
        skill={selectedSkill as Skill}
        onDataGenerated={(data) => {
          setGeneratedData([
            ...data,
            ...(generatedData || [])
          ])
        }}
      />
      <div className="border-t border-gray-300">
        {generatedData?.map((output, key) => {
          return <ContentOutput output={output} key={output._id} onOutputDeleted={() => fetchOutputs()} />
        }) || <p></p>}
      </div>
    </div>
  }

  return (
    <div
      id="navbar"
      className="flex flex-1 flex-col overflow-y-auto w-full max-w-md"
    >
      <nav className={`flex-1 items-center transition-colors ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800' }`}>
        <div className="px-4 h-[42px] flex items-center border-b border-gray-200">
          <h2 className="font-semibold p-1 text-indigo-600">
            {
              !selectedSkill ?
                'Content editor templates' :
                <div className=" flex items-center">
                  <button className="flex items-center gap-2 cursor-pointer w-full" onClick={(e) => setSelectedSkill(null)}>
                    <i className="i-tabler-arrow-left min-w-[14px] h-[14px]"></i>
                    <p>Content editor templates</p>
                  </button>
                </div>
            }
          </h2>
        </div>
        <div className={`flex flex-col gap-1 px-4 py-4 ${selectedSkill ? 'hidden' : ''}`}>
          {renderSkills()}
        </div>
        {selectedSkill && renderSelectedSkill()}
      </nav>
    </div>
  );
}

export default ContentSidebar;
