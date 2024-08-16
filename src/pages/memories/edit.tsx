import { createMemory } from '@/api/memories'
import AppInput from '@/components/App/AppInput'
import AppTextarea from '@/components/App/AppTextArea'
import LayoutMain from '@/components/Layouts/LayoutMain'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { MEMORY_TYPES, Memory } from '@/lib/@types'
import { cn, objectToFormData } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ObjectSchema } from 'yup'
import * as yup from "yup"

interface Inputs {
  name: string;
  type: string;
}

const schema: ObjectSchema<Inputs> = yup
  .object({
    name: yup.string().required("This field is required"),
    type: yup.mixed<MEMORY_TYPES>().oneOf(Object.values(MEMORY_TYPES)).default(MEMORY_TYPES.TEXT).required("This field is required"),
  })
  .required()

export default function CreateMemory({className, ...props}: any) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  watch('type')

  const router = useRouter()

  useEffect(() => {
    setValue('type', MEMORY_TYPES.TEXT)
  }, [setValue])

  function validateFileInput(fileInput: File) {
    const allowedExtensions = ['txt', 'docx', 'pdf'];
    const filePath = fileInput?.name;

    if (!filePath)
      return false

    if (filePath.trim() === '') {
      // No file selected
      return false;
    }
    const fileExtension = filePath?.split('.')?.pop()?.toLowerCase();
    if (!fileExtension)
      return false
    if (!allowedExtensions.includes(fileExtension)) {
      // Invalid file extension
      return false;
    }
    return true;
  }

  function validateAndExtractVideoId(url: string) {
    // Regular expressions for matching YouTube video URLs
    const longFormatRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
    const shortFormatRegex = /^https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
    
    // Check if the URL matches the long format
    let match = url.match(longFormatRegex);
    if (match) {
        return match[1]; // Extract the video ID
    }

    // Check if the URL matches the short format
    match = url.match(shortFormatRegex);
    if (match) {
        return match[1]; // Extract the video ID
    }

    // If the URL doesn't match either format, return null (invalid URL)
    return null;
  }

  const [isLoading, setLoading] = useState(false)

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true)

  const [backgroundInfo, setBackgroundInfo] = useState<string>('')
  const [backgroundFile, setBackgroundFile] = useState<File>()
  const [youtubeUrl, setYoutubeUrl] = useState<string>('')

  const currentType = getValues('type')

  async function onSubmit() {
    try {
      setLoading(true)
      if (isSubmitButtonDisabled)
        return
      const formData = objectToFormData(getValues())
      switch (currentType) {
        case MEMORY_TYPES.TEXT:
          if (backgroundInfo.length > 0) {
            formData.append('text', backgroundInfo)
          }
          break;

        case MEMORY_TYPES.FILE:
          if (backgroundFile) {
            formData.append('file', backgroundFile)
            break;
          }
          break;

        case MEMORY_TYPES.YTB:
          if (youtubeUrl) {
            formData.append('url', youtubeUrl)
            break;
          }
          break;
      
        default:
          break;
      }
      await createMemory(formData)
      router.push('/memories')
    } catch (error: any) {
      toast(error.message)
    } finally {
      setLoading(false)
    }
  }

  function renderTextType() {
    return <div>
      <div className="grid gap-1">
        <p className='text-gray-600 text-sm mt-2'>Please type or paste your memory directly into the provided text input field. Ensure that the text accurately reflects the information you wish to use when generating content.</p>
        <Label htmlFor="text" className='mt-2'>
          Input your background information
        </Label>
        <AppTextarea
          id="text"
          placeholder=""
          value={backgroundInfo}
          onChange={(e) => setBackgroundInfo(e.target.value)}
        />
        <p className="text-sm text-destructive m-0">{errors.name?.message}</p>
      </div>
    </div>
  }
  function renderFileType() {
    return <div>
      <div className="grid gap-1">
        <p className='text-gray-600 text-sm mt-2'>You can upload .txt, .pdf, or .docx files as your memory. Make sure your file is in one of these formats to ensure successful submission and utilization by the AI.</p>
        <Label htmlFor="text" className='mt-2'>
          Upload your file
        </Label>
        <AppInput
          id="text"
          type="file"
          accept=".txt, .docx, .pdf"
          onChange={(e) => {
            console.log(e.target.files[0])
            setBackgroundFile(e.target.files[0])
          }}
          hint='Allowed types: txt, pdf and docx'
        />
        <p className="text-sm text-destructive m-0">{errors.name?.message}</p>
      </div>
    </div>
  }
  function renderYoutubeType() {
    return <div>
      <div className="grid gap-1">
        <p className='text-gray-600 text-sm mt-2'>To submit YouTube captions as memory, please provide the URL of the YouTube video containing the captions you wish to use. The AI will extract and analyze the captions to generate content.</p>
        <Label htmlFor="text" className='mt-2'>
          Youtube video URL
        </Label>
        <AppInput
          id="text"
          placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <p className="text-sm text-destructive m-0">{errors.name?.message}</p>
      </div>
    </div>
  }

  useEffect(() => {
    setBackgroundFile(undefined)
  }, [currentType])

  useEffect(() => {
    const type = getValues('type')
    switch (type) {
      case MEMORY_TYPES.TEXT:
        setSubmitButtonDisabled(!backgroundInfo || (!!backgroundInfo && backgroundInfo.length <= 0))
        break;

      case MEMORY_TYPES.FILE:
        if (backgroundFile) {
          setSubmitButtonDisabled(!validateFileInput(backgroundFile))
        } else {
          setSubmitButtonDisabled(true)
        }
        break;

      case MEMORY_TYPES.YTB:
        if (youtubeUrl) {
          setSubmitButtonDisabled(!validateAndExtractVideoId(youtubeUrl))
          break;
        } else {
          setSubmitButtonDisabled(!youtubeUrl)
          break;
        }
    
      default:
        break;
    }
  }, [getValues, backgroundFile, backgroundInfo, youtubeUrl])

  return (
    <div>
      <div className={cn("grid gap-6 w-full max-w-2xl mx-auto mt-12", className)} {...props}>
        {isSubmitButtonDisabled && 'Disabled'}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">    
            <div className="grid gap-1">
              <Label htmlFor="first_name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Memory name"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('name')}
                disabled={isLoading}
              />
              <p className="text-sm text-destructive m-0">{errors.name?.message}</p>
            </div>
            <div>
            <Label>
              Memory type
            </Label>
            <RadioGroup {...register('type')} defaultValue={MEMORY_TYPES.TEXT} onValueChange={(e) => setValue('type', e)} className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <RadioGroupItem value={MEMORY_TYPES.TEXT} id="text" className="peer sr-only" />
                <Label
                  htmlFor="text"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary-900 cursor-pointer"
                >
                  <i className="i-tabler-text-caption mb-3 h-6 w-6" />
                  Text
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value={MEMORY_TYPES.FILE}
                  id="file"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="file"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer peer-data-[state=checked]:bg-primary-900"
                >
                  <i className="i-tabler-file mb-3 h-6 w-6" />
                  File
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value={MEMORY_TYPES.YTB}
                  id="youtube"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="youtube"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer peer-data-[state=checked]:bg-primary-900"
                >
                  <i className="i-tabler-brand-youtube mb-3 h-6 w-6" />
                  Youtube Video
                </Label>
              </div>
            </RadioGroup>

            {{
              [MEMORY_TYPES.TEXT]: renderTextType(),
              [MEMORY_TYPES.FILE]: renderFileType(),
              [MEMORY_TYPES.YTB]: renderYoutubeType(),
            }[currentType]}

            </div>
            <Button type="submit" loading={isLoading} disabled={isSubmitButtonDisabled}>
              Create memory
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

CreateMemory.getLayout = (page: any) => {
  return <LayoutMain
    title="Create Memory"
  >
    {page}
  </LayoutMain>
}
