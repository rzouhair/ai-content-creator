import React, { useEffect, useState } from 'react'
import ModalBase from '../Modals/ModalBase'
import { Button } from '@/components/ui/button'
import { setProjects as _setProjects } from '@/stores/app'
import { Label } from '@/components/ui/label'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ObjectSchema } from "yup"
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { InputSchema, Skill, Tag } from '@/lib/@types'
import { createSkill, generateSkillPrompt, getSkillPrompt, getTags, setSkillPrompt, updateSkill } from '@/api/skills'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from '../ui/checkbox'
import { Plus, X } from 'lucide-react'
import AppListbox from '../App/AppListbox'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'

interface Inputs extends Skill {

}

const schema: ObjectSchema<Inputs> = yup
  .object({
    name: yup.string().required("Field required"),
    description: yup.string().required("Field required"),
  })
  .required()
function SkillsAction(props: any) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
    },
    setValue,
    getValues
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    values: props.payload
  })

  watch('input_schema')

  const [prompt, setPrompt] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [tags, setTags] = useState<any>([])
  const [newlyAddedTag, setNewlyAddedTag] = useState<string>('')
  const [skillTags, setSkillTags] = useState<any[]>([])

  const inputTypes = [
    { label: 'Text Input', value: 'text' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'List', value: 'list' },
  ]

  async function onSubmit(data: Inputs) {
    try {
      const values = getValues()
      let created
      setLoading(true)
      if (props.mode === 'create') {
        created = await createSkill({
          ...data,
          tags: data.tags?.map((t) => t._id)
        })
        toast("Skill created successfully!")
      } else if (values._id) {
        await Promise.all([
          updateSkill(values._id, {
            ...values,
            tags: values.tags?.filter((t) => !!t).map((t) => t._id)
          }),
          setSkillPrompt(values._id, {
            prompt
          })
        ])
        toast("Skill updated successfully!")
      }
      if (values?._id || created?._id) {
        await setSkillPrompt(created?._id || values._id, {
          prompt,
        })
      }
      props.onClose()
    } catch (error: any) {
      toast(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function addInput() {
    setValue('input_schema', [
      ...(getValues().input_schema || []),
      {
        id: "",
        type: "text",
        label: "Untitled " + (getValues()?.input_schema?.length || 0),
        default: "",
        required: false,
        placeholder: ""
      }
    ])
  }

  useEffect(() => {
    const values = getValues()
    async function retrieveTags() {
      const tags = await getTags()
      setTags(tags?.map((t: Tag) => ({
        label: t.name,
        value: t._id
      })))
    }
    async function retrievePrompt() {
      try {
        const skillPrompt = await getSkillPrompt(values._id)
        setPrompt(skillPrompt?.prompt || '')
      } catch (error: any) {
        toast("An error occurred: " + error.message)
      }
    }

    if (!tags?.length) {
      retrieveTags()
    }

    if (props.mode === 'edit')
      retrievePrompt()
  }, [])

  useEffect(() => {
    const values = getValues()

    Object.entries(values).map(([key, val]: any) => {
      setValue(key, props.mode === 'edit' ? props.payload?.[key] : '')
    })
  }, [props, getValues, setValue])

  useEffect(() => {
    if (props.open && props.payload?.tags) {
      console.log({
        tags: props.payload.tags
      })
      setSkillTags(props.payload.tags)
    }
  }, [props.open])

  async function getPrompt() {
    try {
      const prompt = await generateSkillPrompt(getValues()._id)
      if (prompt?.content)
        setPrompt(prompt?.content)
    } catch (error) {
      
    }
  }

  return (
    <ModalBase
      title={`${props.mode === 'create' ? 'Create' : 'Edit'} Skill`}
      open={props.open}
      trigger={props.trigger}
      onClose={props.onClose}
      contentClassName="max-w-[650px] w-full"
    >
      <Tabs defaultValue="information">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          <form>
            <div className="grid gap-4">    
              <div className="grid gap-1">
                <Label htmlFor="name">
                  Name*
                </Label>
                <Input
                  id="name"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...register('name')}
                  disabled={loading}
                />
                <p className="text-sm text-destructive m-0">{errors.name?.message}</p>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="description">
                  Description*
                </Label>
                <Input
                  id="description"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...register('description')}
                  disabled={loading}
                />
                <p className="text-sm text-destructive m-0">{errors.description?.message}</p>
              </div>

              <div className="grid gap-1">
                <Label>
                  Tags*
                </Label>
                <div className='flex items-center flex-wrap gap-2'>
                {skillTags?.map?.((tag) => (
                  <Badge key={tag._id}>
                    {tag.name}
                    <button onClick={(e) => {
                      e.preventDefault()
                      const newList = skillTags?.filter((t) => t._id !== tag._id)
                      setValue(`tags`, newList)
                      setSkillTags(newList)
                    }}>
                      <X className='w-4 h-4 text-white' />
                    </button>
                  </Badge>
                ))}
                </div>
                <AppListbox
                  value={newlyAddedTag}
                  options={tags}
                  onChange={(selected: string) => {
                    console.log({
                      selected,
                      skillTags
                    })
                    if (selected === '')
                        return
                    /* if (newlyAddedTag !== selected) {
                      setNewlyAddedTag(selected)
                    } */
                    if (skillTags?.find((t) => t._id === selected)) {
                      const newList = skillTags?.filter((t) => t._id !== selected)
                      setValue(`tags`, newList)
                      setSkillTags(newList)
                    } else {
                      const newTag = tags.find((t) => t.value === selected)
                      if (newTag) {
                        const newList = [...(skillTags || []), { _id: newTag.value, name: newTag.label }]
                        setValue(`tags`, newList)
                        setSkillTags(newList)
                      }
                    }
                  }}
                  disabled={loading}
                />
              </div>

              <p className="-mt-2 text-sm text-muted-foreground">
                (*) Required
              </p>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="inputs">
          <div className="flex justify-end">
            <Button
              variant="secondary"
              className='mr-0 ml-auto'
              onClick={addInput}
            >
              Add an input
              <Plus className='ml-2 w-5 h-5' />
            </Button>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {(getValues()?.input_schema || [])?.map((schema, index) => (<AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{schema.label}</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col gap-4 px-1' key={index}>
                      <div className="grid gap-1">
                        <Label>
                          Id*
                        </Label>
                        <Input {...register(`input_schema.${index}.id`)} disabled={loading} />
                      </div>
                      <div className="grid gap-1">
                        <Label>
                          Type*
                        </Label>
                        <AppListbox
                          {...register(`input_schema.${index}.type`)}
                          value={getValues().input_schema?.[index]?.type}
                          options={inputTypes}
                          onChange={(selected: string) => setValue(`input_schema.${index}.type`, selected)}
                          disabled={loading}
                        />
                      </div>
                      {getValues()?.input_schema?.[index]?.type === 'list' && <div className="grid gap-1">
                        <Label>
                          List items* (comma separated)
                        </Label>
                        <Textarea
                          value={getValues().input_schema?.[index]?.items}
                          {...register(`input_schema.${index}.items`)}
                          disabled={loading}
                        />
                      </div>}
                      <div className='grid gap-2 grid-cols-2'>
                        <div className="grid gap-1">
                          <Label>
                            Label*
                          </Label>
                          <Input {...register(`input_schema.${index}.label`)} id="label" disabled={loading} />
                        </div>
                        <div className="grid gap-1">
                          <Label>
                            Placeholder*
                          </Label>
                          <Input {...register(`input_schema.${index}.placeholder`)} disabled={loading} />
                        </div>
                      </div>

                      <div className="grid gap-1">
                        <Label htmlFor="is_admin">
                          Required
                        </Label>
                        <Checkbox
                          id="is_admin"
                          checked={getValues().input_schema?.[index]?.required}
                          onCheckedChange={(checked: boolean) => setValue(`input_schema.${index}.required`, checked)}
                          {...register(`input_schema.${index}.required`)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>))}
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="prompt">
          <div className='flex flex-col gap-2'>
            <Button variant="secondary" onClick={() => getPrompt()}>Get skill prompt</Button>
            <div className="grid grid-cols-1 gap-2">
              <Label>Prompt</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Output examples</Label>
              <Textarea
                id="examples"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('examples', {
                  value: getValues('examples') || 'No examples given',
                })}
                disabled={loading}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
        {loading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Submit
      </Button>

    </ModalBase>
  )
}

export default SkillsAction
