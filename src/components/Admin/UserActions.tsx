import React, { useEffect, useState } from 'react'
import ModalBase from '../Modals/ModalBase'
import characters from '@/lib/characters'
import { Button } from '@/components/ui/button'
import AppInput from '../App/AppInput'
import AppTextarea from '../App/AppTextArea'
import { createProject, getProjects } from '@/api/projects'
import { setProjects as _setProjects } from '@/stores/app'
import { useAtom } from 'jotai'
import { createKeywordsList } from '@/api/keywords'
import { Label } from '@/components/ui/label'
import { EyeOff, Eye } from 'lucide-react'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ObjectSchema } from "yup"
import { SignupPayload, createUser, updateUser } from '@/api/users'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Checkbox } from '../ui/checkbox'

interface Inputs extends Omit<SignupPayload, 'password'> {
}

const schema: ObjectSchema<Inputs> = yup
  .object({
    first_name: yup.string().required("First name required"),
    last_name: yup.string().required("Last name required"),
    email: yup.string().email("Field must be a valid email").required("Email is required"),
  })
  .required()
function UserActions(props: any) {
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

  const watchAdmin = watch("is_admin")

  const [title, setTitle] = useState('')
  const [keywordsList, setKeywordsList] = useState('')
  
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(data: Inputs) {
    try {
      setLoading(true)
      if (props.mode === 'create') {
        await createUser({
          ...data,
          username: data.email,
        })
        toast("User created successfully!")
      } else if (props.payload.id) {
        await updateUser(props.payload.id, getValues())
        toast("User updated successfully!")
      }
      props.onClose()
    } catch (error: any) {
      toast(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setValue('first_name', props.mode === 'edit' ? props.payload?.first_name : '')
    setValue('last_name', props.mode === 'edit' ? props.payload?.last_name : '')
    setValue('email', props.mode === 'edit' ? props.payload?.email : '')
    setValue('is_admin', props.mode === 'edit' ? props.payload?.is_admin : false)
  }, [props])

  return (
    <ModalBase
      title={`${props.mode === 'create' ? 'Create' : 'Edit'} User`}
      open={props.open}
      trigger={props.trigger}
      onClose={props.onClose}
      className="max-w-[450px]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">    
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
            <div className="grid gap-1">
              <Label htmlFor="first_name">
                First Name*
              </Label>
              <Input
                id="first_name"
                placeholder="John"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('first_name')}
                disabled={loading}
              />
              <p className="text-sm text-destructive m-0">{errors.first_name?.message}</p>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="last_name">
                Last name*
              </Label>
              <Input
                id="last_name"
                placeholder="Doe"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('last_name')}
                disabled={loading}
              />
              <p className="text-sm text-destructive m-0">{errors.last_name?.message}</p>
            </div>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">
              Email*
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email')}
              disabled={loading}
            />
            <p className="text-sm text-destructive m-0">{errors.email?.message}</p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="is_admin">
              Is Admin
            </Label>
            <Checkbox
              id="is_admin"
              checked={getValues().is_admin}
              onCheckedChange={(checked: boolean) => setValue('is_admin', checked)}
              {...register('is_admin')}
              disabled={loading}
            >Is admin</Checkbox>
          </div>
          <p className="-mt-2 text-sm text-muted-foreground">
            (*) Required
          </p>
          <Button type="submit" disabled={loading}>
            {loading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </ModalBase>
  )
}

export default UserActions
