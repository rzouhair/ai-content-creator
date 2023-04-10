import AppAccordion from '@/components/App/AppAccordion'
import AppButton from '@/components/App/AppButton'
import AppCard from '@/components/App/AppCard'
import AppInput from '@/components/App/AppInput'
import Idea from '@/components/Ideation/Idea'
import LayoutMain from '@/components/Layouts/LayoutMain'
import axios from '@/lib/axios'
import openai from '@/lib/openai'
import { actionPhraseQualiiers, baseKeywordQualifiers, conceptPluralQualifiers, conceptSingularQualifiers, continuousVerbQualifiers, personInvolvedQualifiers } from '@/lib/qualifiers'
import React, { useState } from 'react'

function Ideation() {

  const [loadingForms, setLoadingForms] = useState<boolean>(false)
  const [keywordForms, setKeywordForms] = useState<{
    general_niche: string;
    concept_in_plural_form: string;
    concept_in_singular_form: string;
    person_involved_in_niche_plural: string;
    action_phrase: string;
    verb_in_continuous_form: string;
  }>({
    general_niche: "",
    concept_in_plural_form: "",
    concept_in_singular_form: "",
    person_involved_in_niche_plural: "",
    action_phrase: "",
    verb_in_continuous_form: "",
  })

  const getKeywordForms = async() => {
    try {
      setLoadingForms(true)
      if (!keywordForms.general_niche || keywordForms.general_niche === '')
        return

      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo-0301',
        messages: [
          { role: 'system', content: `You are an English JSON master, the user provides a general niche/noun and you return only a valid JSON objects in the following format (and example for the general noun "Kayaking"):
          {
            "general_niche": "Kayaking",
            "concept_in_plural_form": "Kayaks",
            "concept_in_singular_form": "Kayak",
            "person_involved_in_niche_plural": "Kayaker",
            "action_phrase": "ride a kayak",
            "verb_in_continuous_form": "riding a kayak",
          }
          
          the object keys are very descriptive.
          
          Please make sure you return only the JSON object, with no jargon or fluff` },
          {
            role: "user",
            content: `Provide ONLY the valid JSON object containing different forms of the base keyword/niche "${keywordForms.general_niche}"`
          }
        ],
      })

      const content = response.data.choices[0].message?.content
      if (content) {
        try {
          const parsedJSON = JSON.parse(content)
          console.log({ parsedJSON })
          setKeywordForms(parsedJSON)
        } catch (error) {
          const matchedObject = content.match(/\{(.*)\}/)?.[0]
          if (matchedObject) {
            const parsedJSON = JSON.parse(matchedObject)
            console.log({ parsedJSON })
            setKeywordForms(parsedJSON)
          }
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingForms(false)
    }
  }
  
  return (
    <div className='p-4'>
      <AppCard className={'max-w-2xl mx-auto !overflow-visible'}>
        <h1 className='font-semibold mt-0'>Ideation search queries constructor</h1>
        <div>
          <div className={'bg-gray-50 rounded-md p-4 mb-4'}>
            <AppInput
              hintClassName='mb-4'
              hint='For example: cycling, tax planning, motherhood'
              label='General niche'
              value={keywordForms.general_niche}
              onChange={(e) => {
                const oldForms = {...keywordForms}
                oldForms.general_niche = e.target.value
                setKeywordForms(oldForms)
              }}
            />
            <AppButton
              className='my-4'
              loading={loadingForms}
              disabled={!keywordForms.general_niche || keywordForms.general_niche === ''}
              block={true}
              onClick={(e) => {
                getKeywordForms()
              }}
            >
              Get base keyword&apos;s forms (General niche required)
            </AppButton>
            <AppAccordion
              items={[
                {
                  title: 'Toggle search queries',
                  content: () => {
                    return <div className='flex gap-4 flex-col'>
                      {baseKeywordQualifiers.map((qualifier: string, i: number) => <Idea key={i} qualifier={qualifier} keyword={keywordForms.general_niche} />)}
                    </div>
                  }
                }
              ]}
            />
          </div>
          <div className={'bg-gray-50 rounded-md p-4 mb-4'}>
            <AppInput
              hintClassName='mb-4'
              hint='For example: bikes, Quickbooks, baby schedules'
              label='Noun or concept in plural form'
              value={keywordForms.concept_in_plural_form}
              onChange={(e) => {
                const oldForms = {...keywordForms}
                oldForms.concept_in_plural_form = e.target.value
                setKeywordForms(oldForms)
              }}
            />
            <AppAccordion
              items={[
                {
                  title: 'Toggle search queries',
                  content: () => {
                    return <div className='flex gap-4 flex-col'>
                      {conceptPluralQualifiers.map((qualifier: string, i: number) => <Idea key={i} qualifier={qualifier} keyword={keywordForms.concept_in_plural_form} />)}
                    </div>
                  }
                }
              ]}
            />
          </div>
          <div className={'bg-gray-50 rounded-md p-4 mb-4'}>
            <AppInput
              hintClassName='mb-4'
              hint='For example: bike, CPA test, baby sleep'
              label='Noun or concept in singular form'
              value={keywordForms.concept_in_singular_form}
              onChange={(e) => {
                const oldForms = {...keywordForms}
                oldForms.concept_in_singular_form = e.target.value
                setKeywordForms(oldForms)
              }}
            />
            <AppAccordion
              items={[
                {
                  title: 'Toggle search queries',
                  content: () => {
                    return <div className='flex gap-4 flex-col'>
                      {conceptSingularQualifiers.map((qualifier: string, i: number) => <Idea key={i} qualifier={qualifier} keyword={keywordForms.concept_in_singular_form} />)}
                    </div>
                  }
                }
              ]}
            />
          </div>
          <div className={'bg-gray-50 rounded-md p-4 mb-4'}>
            <AppInput
              hintClassName='mb-4'
              hint='For example, cyclists, accountants, mothers'
              label='Person involved in your niche in plural form'
              value={keywordForms.person_involved_in_niche_plural}
              onChange={(e) => {
                const oldForms = {...keywordForms}
                oldForms.person_involved_in_niche_plural = e.target.value
                setKeywordForms(oldForms)
              }}
            />
            <AppAccordion
              items={[
                {
                  title: 'Toggle search queries',
                  content: () => {
                    return <div className='flex gap-4 flex-col'>
                      {personInvolvedQualifiers.map((qualifier: string, i: number) => <Idea key={i} qualifier={qualifier} keyword={keywordForms.person_involved_in_niche_plural} />)}
                    </div>
                  }
                }
              ]}
            />
          </div>
          <div className={'bg-gray-50 rounded-md p-4 mb-4'}>
            <AppInput
              hintClassName='mb-4'
              hint='For example: ride a bike, take the CPA test, get baby to sleep'
              label='Action phrase'
              value={keywordForms.action_phrase}
              onChange={(e) => {
                const oldForms = {...keywordForms}
                oldForms.action_phrase = e.target.value
                setKeywordForms(oldForms)
              }}
            />
            <AppAccordion
              items={[
                {
                  title: 'Toggle search queries',
                  content: () => {
                    return <div className='flex gap-4 flex-col'>
                      {actionPhraseQualiiers.map((qualifier: string, i: number) => <Idea key={i} qualifier={qualifier} keyword={keywordForms.action_phrase} />)}
                    </div>
                  }
                }
              ]}
            />
          </div>
          <div className={'bg-gray-50 rounded-md p-4 mb-4'}>
            <AppInput
              hintClassName='mb-4'
              hint='For example: biking, taking the CPA test, getting baby to sleep'
              label='Verb or action phrase ending in -ing'
              value={keywordForms.verb_in_continuous_form}
              onChange={(e) => {
                const oldForms = {...keywordForms}
                oldForms.verb_in_continuous_form = e.target.value
                setKeywordForms(oldForms)
              }}
            />
            <AppAccordion
              items={[
                {
                  title: 'Toggle search queries',
                  content: () => {
                    return <div className='flex gap-4 flex-col'>
                      {continuousVerbQualifiers.map((qualifier: string, i: number) => <Idea key={i} qualifier={qualifier} keyword={keywordForms.verb_in_continuous_form} />)}
                    </div>
                  }
                }
              ]}
            />
          </div>
        </div>
      </AppCard>

    </div>
  )
}

Ideation.getLayout = (page: any) => {
  return <LayoutMain>
    {page}
  </LayoutMain>
}

export default Ideation