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
import { InputSchema, Skill } from '@/lib/@types'
import { createSkill, generateSkillPrompt, getSkillPrompt, setSkillPrompt, updateSkill } from '@/api/skills'
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
import { Plus } from 'lucide-react'
import AppListbox from '../App/AppListbox'
import { Textarea } from '../ui/textarea'

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

  const inputTypes = [
    { label: 'Text Input', value: 'text' },
    { label: 'Textarea', value: 'textarea' },
  ]

  async function onSubmit(data: Inputs) {
    try {
      const values = getValues()
      let created
      setLoading(true)
      if (props.mode === 'create') {
        created = await createSkill(data)
        toast("Skill created successfully!")
      } else if (values._id) {
        await updateSkill(values._id, {
          ...values,
          tags: values.tags.map((t) => t._id)
        })
        toast("Skill updated successfully!")
      }
      if (values?._id || created?._id) {
        console.log({
          created: created?._id,
          values: values._id
        })
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
        label: "Untitled " + getValues().input_schema.length,
        default: "",
        required: false,
        placeholder: ""
      }
    ])
  }

  useEffect(() => {
    const values = getValues()
    async function retrievePrompt() {
      try {
        const skillPrompt = await getSkillPrompt(values._id)
        setPrompt(skillPrompt?.prompt || '')
      } catch (error: any) {
        toast("An error occurred: " + error.message)
      }
    }
    if (props.mode === 'edit')
      retrievePrompt()
  }, [props])

  useEffect(() => {
    const values = getValues()

    Object.entries(values).map(([key, val]: any) => {
      setValue(key, props.mode === 'edit' ? props.payload?.[key] : '')
    })
  }, [props, getValues, setValue])

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
      title={`${props.mode === 'create' ? 'Create' : 'Edit'} User`}
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
                {...register('examples')}
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
