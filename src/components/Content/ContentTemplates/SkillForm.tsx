import { Button } from '@/components/ui/button';
import AppNumberInput from '@/components/App/AppNumberInput'
import AppInput from '@/components/App/AppInput'
import AppTextarea from '@/components/App/AppTextArea'
import { InputSchema } from '@/lib/@types'
import { Skill } from '@/lib/@types'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { executeSkill } from '@/api/skills'

function SkillForm({ skill, onDataGenerated, className }: { skill: Skill; className?: string; onDataGenerated?: (data: any) => any }) {

  const [value, setValue] = useState<any>(null)

  const [numOfOutputs, setNumOfOutputs] = useState<number>(1)
  const [language, setLanguage] = useState('English')

  const [icon, setIcon] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const resetForm = useCallback(() => {
    const obj: any = {}
    skill.input_schema.forEach((i: InputSchema) => {
      obj[i.id] = i.default || ''
    })
    setValue(obj)
  }, [skill])


  useEffect(() => {
    async function fetchIcon () {
      if (skill.icon === "" && skill.emoji !== "")
        return null
      
      import(`@/assets/icons/${(skill.icon === "" && skill.emoji === "") ? 'default' : skill.icon}.svg`).then((res) => {
        setIcon(res.default)
        return skill.icon
      }).catch(() => {
        setIcon(null)
        return skill.emoji
      })
    }

    fetchIcon()

  }, [skill])

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const generateOutput = async() => {
    try {
      setLoading(true)
      const data = await executeSkill({
        skill_id: skill._id,
        inputs: {
          ...value,
          num_outputs: numOfOutputs,
        }
      })
    
      onDataGenerated?.(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {
        value && (
          <div>
            <div className="flex items-center border-y border-gray-200 py-4 mb-4">
              <div className=" min-w-[36px] min-h-[36px] bg-gray-200 rounded-full flex items-center justify-center mr-4">
                { icon ? <Image src={icon} alt={skill.icon} /> : skill.emoji }
              </div>
              <div className="flex-grow text-left">
                <div className="text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate text-ellipsis">
                  <p className="inline-flex items-center space-x-2">
                    { skill.name }
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-400">{ skill.description }</p>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              {
                skill.input_schema.map((input: InputSchema) => {
                  return (
                    input.type === 'text' ?
                      <AppInput
                        key={input.id}
                        id={input.id}
                        label={`${input.label || input.id} ${input.required ? '*' : ''}`}
                        placeholder={input.placeholder}
                        type={input.type}
                        value={value[input.id]}
                        onChange={(e) => {
                          const oldForms = {...value}
                          oldForms[input.id] = e.target.value
                          setValue(oldForms)
                        }}
                      />
                    : <AppTextarea
                        key={input.id}
                        id={input.id}
                        placeholder={input.placeholder}
                        label={`${input.label || input.id.charAt(0).toUpperCase().concat(input.id.substring(1, input.id.length))} ${input.required ? '*' : ''}`}
                        rows={5}
                        value={value[input.id]}
                        onChange={(e: any) => {
                          const oldForms = {...value}
                          oldForms[input.id] = e.target.value
                          setValue(oldForms)
                        }
                      }
                    ></AppTextarea>

                  )
                })
              }
            </div>
            <div className='mt-4'>
              <AppNumberInput
                minLength={1}
                value={numOfOutputs}
                label='Number of outputs'
                onChange={(e) => {
                  setNumOfOutputs(e)
                }}
              />
            </div>
            <div className='flex items-center justify-between gap-4'>
              <Button variant="outline" loading={loading} className='flex-1 mt-4 mb-2' onClick={() => resetForm()}>Clear inputs</Button>
              <Button className='flex-1 mt-4 mb-2' loading={loading} onClick={(e) => generateOutput()}>Generate</Button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default SkillForm