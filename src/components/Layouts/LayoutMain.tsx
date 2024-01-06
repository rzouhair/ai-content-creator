import React, { useEffect, useState } from 'react'
import AppNav from '../App/AppNav/AppNav'
import { useAtom } from 'jotai'
import { sideBarTheme } from '@/stores/theme'
import { setSkills, skills } from '@/stores/templates'
import { Skill } from '@/lib/@types'

import skillsObj from '@/lib/skills'
import { activeProject } from '@/stores/projects'
import { TooltipProvider } from '../ui/tooltip'

function LayoutMain(props: any) {

  const [theme] = useAtom(sideBarTheme)
  const isPadded = props.padded === undefined || props.padded === true

  const [, _setSkills] = useAtom(setSkills)
  const [currentProject] = useAtom(activeProject)

  const [reloaded, setReloaded] = useState<boolean>(false)

  useEffect(() => {
    /* async function fetchSkills() {
      try {
        const tagsObj = Array.from(new Set(skillsObj.map((s) => s.tags.split(',')).flat(Infinity).filter((t: string) => t !== '')));

        const tagsPromises = await Promise.all(tagsObj.map((t) => fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/content-gen/tags/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: t,
          }),
        })));

        const tagsResponses = await Promise.all(tagsPromises);
        const tags = await Promise.all(tagsResponses.map(response => response.json()));

        let sks = skillsObj;

        sks = sks.map((skill) => {
          delete skill.favoriteSkills_aggregate;
          delete skill.id;
          delete skill.improved;
          delete skill.updated_at;

          skill.tags = skill.tags?.split(',').filter((t) => t !== '' || t !== ' ').map((t) => tags.find((tg) => tg.name === t)?._id).filter((t) => !!t);

          console.log(skill.tags);

          return skill;
        });

        const skillsPromises = sks.map((s) => fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/content-gen/skills/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(s),
        }));

        const skillsResponses = await Promise.all(skillsPromises);
        const results = await Promise.all(skillsResponses.map(response => response.json()));

        console.log({ results, skillsObj });
      } catch (error) {
        console.error(error);
      }
    } */

    async function fetchSkills() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/content-gen/skills/`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        _setSkills(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSkills()
  }, [])

  useEffect(() => {
    setReloaded(false)

    setTimeout(() => {
      setReloaded(true)
    }, 1000)

  }, [currentProject])

  return (
    <TooltipProvider>
      <main className={`flex items-stretch justify-center max-h-screen bg-background ${theme}`}>
        <p></p>
        <AppNav navCollapsed={props.navCollapsed} />
        <div className={`flex-1 max-h-screen overflow-auto ${isPadded ? 'px-4' : ''}`}>
          {
            props.title
            && <div className='mb-4'>
              <h1 className='text-3xl font-semibold leading-none tracking-tight mb-2 dark:text-white'>{props.title}</h1>
              {
                props.description && <p className='text-sm text-muted-foreground'>{props.description}</p>
              }
            </div>
          }
          { reloaded ? props.children : <div className='h-screen w-full flex items-center justify-center'>
            <i className='i-tabler-loader animate-spin text-2xl text-indigo-600'></i>
          </div> }
        </div>
      </main>
    </TooltipProvider>
  )
}

export default LayoutMain