import { useEffect, useState } from 'react'
import { getMemories as getMemoriesList } from '@/api/memories';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import AppListbox from '../App/AppListbox'
import { MEMORY_STATUS_TYPES } from '@/lib/@types';
import { toast, Toaster } from 'sonner';
import { writeBlogPost, writeToWordpress } from '@/api/writer';
import OutlineEditor from './OutlineEditor';
import { CheckCircle, CheckIcon, Loader2 } from 'lucide-react';

export default function Form() {
  const articleTypeOptions = [
    { value: 'listicle', label: 'List post (Listicle)' },
    { value: 'how_to_guide', label: 'How-to Guide Post' },
    { value: 'expanded_definition', label: 'Expanded Definition Post' },
    { value: 'beginner_guide', label: 'Beginner\'s Guide Post' },
  ];
  
  const seoOptimizationOptions = [
    { value: 'default', label: 'Default' },
    { value: 'manual', label: 'Manual' },
    { value: 'ai-powered', label: 'AI-Powered' }, 
  ];

  const articleLengthOptions = [
    { value: 'default', label: 'Default' },
    { value: 'custom', label: 'Custom Number of Sections' },
    { value: 'shorter', label: 'Shorter (2-3 Sections, 450-900 Words)' },
    { value: 'short', label: 'Short (3-5 Sections, 950-1350 Words)' },
    { value: 'medium', label: 'Medium (5-7 Sections, 1350-1870 Words)' },
    { value: 'long', label: 'Long Form (7-10 Sections, 1900-2440 Words)' },
    { value: 'longer', label: 'Longer (10-12 Sections, 2350-2940 Words)' }
  ];
  
  const toneOfVoiceOptions = [
    { value: 'seo_optimized', label: 'SEO Optimized (Confident, Knowledgeable, Neutral, and Clear)' },
    { value: 'excited', label: 'Excited' },
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'custom', label: 'Custom' }
  ];
  
  const languageOptions = [ 
    // You'll need to fill in the languages supported by your application 
    // For example:
    { value: 'English', label: 'English' },
    // ... add more languages
  ];
  
  const countryOptions = [
    // You'll need to fill in the countries supported by your application
    // For example:
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    // ... add more countries
  ];
  
  const pointOfViewOptions = [
    { value: 'first_person_singular', label: 'First Person Singular (I, me, my, mine)' },
    { value: 'first_person_plural', label: 'First Person Plural (we, us, our, ours)' },
    { value: 'second_person', label: 'Second Person (you, your, yours)' },
    { value: 'third_person', label: 'Third Person (he, she, it, they)' }
  ];

  const [memories, setMemories] = useState<{ label: string; value: string; }[]>([])

  enum State {
    FILLING_FORM = 'filling-form',
    SETTING_OUTLINE = 'setting-outline',
    GENERATING = 'generating',
    DONE = 'done'
  }
  const [currentState, setCurrentState] = useState<State>(State.FILLING_FORM)

  const [finalPost, setFinalPost] = useState<any>({})

  useEffect(() => {
    getMemories()
  }, [])

  async function getMemories() {
    try {
      const lists = await getMemoriesList()
      if (lists)
        setMemories(lists.filter(l => l.status === MEMORY_STATUS_TYPES.PROCESSED).map((l) => ({
          label: l.name,
          value: l._id
        })))
    } catch (error: any) {
      toast(error.message)
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
   // Form data state
  const [formData, setFormData] = useState({
    selectedPreset: 'test',
    articleType: 'listicle',
    targetKeyword: '',
    seoOptimization: 'default',
    automaticInternalLinkingDomain: null,
    aiImagesAndVideos: 'none',
    articleLength: 'default',
    toneOfVoice: 'seo_optimized',
    language: 'English',
    country: 'United States',
    pointOfView: 'first_person_singular',
    useRealTimeData: false,
    useOutlineEditor: true,
    includeH3: false,
    generateImages: false,
    includeFaqSection: false,
    includeKeyTakeaways: false,
    improveReadability: true,
    getLinkedParagraph: true,
    urlsToLinkTo: '',
    customOutline: '',
    extraTitlePrompt: '',
    extraSectionPrompt: '',
    extraIntroductionPrompt: '',
    disableIntroduction: false,
    disableConclusion: false,
    part: 'title',
    memory: undefined
  });

  const [outline, setOutline] = useState<any>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log(formData)

      const title = await writeBlogPost(formData)
      if (title) {
        const newFormData = {...formData, part: 'sections', title}
        setFormData(newFormData)
        const outline = await writeBlogPost(newFormData)
        console.log({
          title,
          outline
        })

        setFinalPost((prev) => ({...prev, title: title.title, featuredImagePrompt: title.prompt}))
        console.log({
          outline
        })

        setOutline(outline.sections)

        const outlineFormData = {...newFormData, sections: outline.sections, outline: outline.sections }
        setFormData(prev => outlineFormData)

        await new Promise(r => setTimeout(r, 2000))

        if (newFormData.useOutlineEditor) {
          setCurrentState(State.SETTING_OUTLINE)
        } else {
          await postOutlineGeneration(outlineFormData)
        }
      }
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  async function postOutlineGeneration (outlineFormData: any) {
    try {
      setIsLoading(true)
      setCurrentState(State.GENERATING)
      const sections = []
      console.log({
        formData
      })
      // Keep on generating until the outline is complete
      for (let i = 0; i < outlineFormData.outline.length; i++) {
        setCurrentSection(i)
        const heading = outlineFormData.outline[i]
        const newFormData = {
          ...outlineFormData,
          part: 'section',
          sectionNum: i + 1,
          section: heading,
        }
        setFormData(newFormData)
        const section = await writeBlogPost(newFormData)
        console.log({
          section,
          finalPost
        })

        sections.push(section)

        setFinalPost((prev) => ({
          ...prev,
          outline,
          sections
        }))
        console.log({
          newSections: sections
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setCurrentState(State.DONE)
      setIsLoading(false)
    }
  }

  async function validateOutline () {
    if (currentState !== State.SETTING_OUTLINE) return
    const newFormData = {
      ...formData,
      outline
    }
    setFormData(newFormData)
    await postOutlineGeneration(newFormData)
  }

  async function publishToWordpress () {
    try {
      setIsLoading(true)
      const markdownContent = finalPost.sections?.map((section) => {
        return `## ${section['h2'].heading}\n\n${section['h2'].paragraph}\n\n${section?.h3?.length ? section['h3']?.map((h3) => `### ${h3.heading}\n\n${h3.paragraph}\n\n`).join('\n\n') : ''}`
      }).join('\n\n')

      console.log({
        markdownContent,
        finalPost: finalPost.sections
      })

      await writeToWordpress(markdownContent, finalPost.title)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {currentState === State.FILLING_FORM && <form className={`grid grid-cols-2 gap-4 max-w-screen-lg w-full px-4 mx-auto`} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label>Article Type</Label>
          <Select
            value={formData.articleType}
            onValueChange={(value) => setFormData(prev => ({...prev, articleType: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Article type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Article type</SelectLabel>
                {articleTypeOptions.map((t) => <SelectItem value={t.value} key={t.value}>{t.label}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Article Length</Label>
          <Select
            value={formData.articleLength}
            onValueChange={(value) => setFormData(prev => ({...prev, articleLength: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Article length" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Article length</SelectLabel>
                {articleLengthOptions.map((t) => <SelectItem value={t.value} key={t.value}>{t.label}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <Label>Target Keyword</Label>
          <Input
            placeholder="Enter your target keyword"
            value={formData.targetKeyword}
            onChange={(e) => setFormData(prev => ({...prev, targetKeyword: e.target.value}))} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Tone of Voice</Label>
          <Select
            value={formData.toneOfVoice}
            onValueChange={(value) => setFormData(prev => ({...prev, toneOfVoice: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tone of Voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tone of Voice</SelectLabel>
                {toneOfVoiceOptions.map((t) => <SelectItem value={t.value} key={t.value}>{t.label}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Point of View</Label>
          <Select
            value={formData.pointOfView}
            onValueChange={(value) => setFormData(prev => ({...prev, pointOfView: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Point of View" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Point of View</SelectLabel>
                {pointOfViewOptions.map((t) => <SelectItem value={t.value} key={t.value}>{t.label}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Language</Label>
          <Select
            value={formData.language}
            onValueChange={(value) => setFormData(prev => ({...prev, language: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {languageOptions.map((t) => <SelectItem value={t.value} key={t.value}>{t.label}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData(prev => ({...prev, country: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Country</SelectLabel>
                {countryOptions.map((t) => <SelectItem value={t.value} key={t.value}>{t.label}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <AppListbox
            value={formData.memory}
            label='Memory'
            options={memories}
            onChange={(e: string | undefined) => {
              setFormData(prev => ({...prev, memory: e}))
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Use Real-Time Data</Label>
          <Switch
            checked={formData.useRealTimeData}
            onCheckedChange={(value) => setFormData(prev => ({...prev, useRealTimeData: value}))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Use Outline Editor</Label>
          <Switch
            checked={formData.useOutlineEditor}
            onCheckedChange={(value) => setFormData(prev => ({...prev, useOutlineEditor: value}))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Include H3 Section</Label>
          <Switch
            checked={formData.includeH3}
            onCheckedChange={(value) => setFormData(prev => ({...prev, includeH3: value}))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Generate Images</Label>
          <Switch
            checked={formData.generateImages}
            onCheckedChange={(value) => setFormData(prev => ({...prev, generateImages: value}))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Include FAQ Section</Label>
          <Switch
            checked={formData.includeFaqSection}
            onCheckedChange={(value) => setFormData(prev => ({...prev, includeFaqSection: value}))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Include Key Takeaways</Label>
          <Switch
            checked={formData.includeKeyTakeaways}
            onCheckedChange={(value) => setFormData(prev => ({...prev, includeKeyTakeaways: value}))}
          />
        </div>


        <div className="flex flex-col gap-2">
          <Label>Improve Readability</Label>
          <Switch
            checked={formData.improveReadability}
            onCheckedChange={(value) => setFormData(prev => ({...prev, improveReadability: value}))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Get Paragraphs with Links</Label>
          <Switch
            checked={formData.getLinkedParagraph}
            onCheckedChange={(value) => setFormData(prev => ({...prev, getLinkedParagraph: value}))}
          />
        </div>

        <Button type='submit' className='mt-4 col-span-2' loading={isLoading}>{isLoading ? 'Generating...' : 'Generate'}</Button>

      </form>}

      {(currentState === State.SETTING_OUTLINE) && <div className='w-full max-w-screen-lg mx-auto'>
        <OutlineEditor outline={outline} setOutline={setOutline} done={validateOutline} />
      </div>}

      {(currentState === State.GENERATING || currentState === State.DONE)
        && <main className='prose max-w-screen-lg mx-auto'>
        {currentState === State.GENERATING && <div className='flex items-center gap-2 my-4 text-primary font-medium text-xl'>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />

          Generating section {currentSection + 1} of {formData.outline.length} - {formData.outline?.[currentSection]?.name}
        </div>}

        <div>
          <section>
            <Button className='mb-10 mt-4' onClick={publishToWordpress} loading={isLoading}>
              <CheckIcon className='mr-2 h-4 w-4' />
              Publish to Wordpress
            </Button>
            <h1>{finalPost.title}</h1>
            {finalPost.sections?.map((section, index) => (
              <div key={index}>
                <h2>{section['h2'].heading}</h2>
                {section['h2'].paragraph && <p className='whitespace-pre-line'>{section['h2'].paragraph}</p>}

                {section['h3']?.map((h3, cIndex) => (
                  <div key={cIndex}>
                    <h3>{h3.heading}</h3>
                    {h3.paragraph && <p className='whitespace-pre-line'>{h3.paragraph}</p>}
                  </div>
                ))}
              </div>
            ))}
          </section>

          <section className='mb-10'>
            <div className='h-0.5 bg-slate-300 rounded-full w-full mt-10' />

            <p className='text-lg font-bold text-primary'>Prompts</p>

            {finalPost.featuredImagePrompt && <div>
              <div className='p-4 rounded-sm bg-slate-200 mt-4'>
                <p className='font-semibold m-0'>Featured Image Prompt:</p>
                <pre className='mt-4 mb-0 whitespace-pre-line'>
                  {finalPost.featuredImagePrompt}
                </pre>
              </div>
            </div>}

            {finalPost.sections?.filter((section) => !!section['h2'].prompt).map((section, key) => {
              return <div key={key} className='p-4 rounded-sm bg-slate-200 mt-4'>
                <p className='font-semibold m-0'>Prompt for {section['h2'].heading}:</p>
                <pre className='mt-4 mb-0 whitespace-pre-line'>
                  {section['h2'].prompt}
                </pre>
              </div>
            })}
          </section>
        </div>
      </main>}
    </div>
  )
}