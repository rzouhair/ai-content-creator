import React, { useEffect, useState } from 'react'
import AppNav from '../App/AppNav/AppNav'
import { useAtom, useSetAtom } from 'jotai'
import { sideBarTheme } from '@/stores/theme'
import { setSkills, skills } from '@/stores/templates'
import { Skill } from '@/lib/@types'

import skillsObj from '@/lib/skills'
import { activeProject } from '@/stores/app'
import { TooltipProvider } from '../ui/tooltip'
import { getSkills } from '@/api/skills'
import { me } from '@/api/users'
import { loggedInUser } from '@/stores/app'
import { toast } from 'sonner'
import axios from '@/lib/axios'

function LayoutMain(props: any) {

  const setUser = useSetAtom(loggedInUser)
  const [theme] = useAtom(sideBarTheme)
  const isPadded = props.padded === undefined || props.padded === true

  const [, _setSkills] = useAtom(setSkills)
  const [currentProject] = useAtom(activeProject)

  const [reloaded, setReloaded] = useState<boolean>(false)

  useEffect(() => {
    /* async function fetchSkills() {
      try {
        const tagsObj = Array.from(new Set(skillsObj.map((s) => s.tags.split(',')).flat(Infinity).filter((t: string) => t !== '')));

        const tags = (await Promise.all(tagsObj.map((t) => axios.post(`/content-gen/tags/`, {
          name: t
        })))).map((res) => res.data);

        let sks = skillsObj;

        sks = sks.map((skill) => {
          delete skill.favoriteSkills_aggregate;
          delete skill.id;
          delete skill.improved;
          delete skill.updated_at;

          skill.tags = skill.tags?.split(',').filter((t) => t !== '' || t !== ' ').map((t) => tags.find((tg) => tg.name === t)?._id).filter((t) => !!t);

          return skill;
        });

        const skillsPromises = sks.map((s) => axios.post(`/content-gen/skills/`, s));

        const skillsResponses = await Promise.all(skillsPromises);

        console.log({ skillsResponses, skillsObj });
      } catch (error) {
        console.error(error);
      }
    } */

    async function fetchSkills() {
      try {
        const data = await getSkills({
          page: 1,
          page_size: 100,
        })
        if (data?.data?.length)
          _setSkills(data?.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchUser() {
      try {
        const data = await me()
        if (data)
          setUser(data)
        else
          throw new Error("User not found or not logged in")
      } catch (error: any) {
        toast(error.message)
      }
    }

    fetchSkills()
    fetchUser()
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