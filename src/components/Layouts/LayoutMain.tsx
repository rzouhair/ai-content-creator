import React, { useEffect, useState } from 'react'
import AppNav from '../App/AppNav/AppNav'
import { useAtom } from 'jotai'
import { sideBarTheme } from '@/stores/theme'
import axiosInstance from '@/lib/axios'
import { setSkills, skills } from '@/stores/templates'
import { Skill } from '@/lib/@types'

import skillsObj from '@/lib/skills'
import { activeProject } from '@/stores/projects'

function LayoutMain(props: any) {

  const [theme] = useAtom(sideBarTheme)

  const [, _setSkills] = useAtom(setSkills)
  const [currentProject] = useAtom(activeProject)

  const [reloaded, setReloaded] = useState<boolean>(false)

  useEffect(() => {
    /* async function fetchSkills() {
      try {
        const tagsObj = Array.from(new Set(skillsObj.map((s) => s.tags.split(',')).flat(Infinity).filter((t: string) => t !== '')))

        const tagsPromises = await Promise.all(tagsObj.map((t) => axiosInstance.post('/content-gen/tags/', {
          name: t
        })))

        const { data: tags } = await axiosInstance.get('/content-gen/tags/')

        let sks = skillsObj

        sks = sks.map((skill) => {
          delete skill.favoriteSkills_aggregate
          delete skill.id
          delete skill.improved
          delete skill.updated_at

          skill.tags = skill.tags?.split(',').filter((t) => t !== '' || t !== ' ').map((t) => tags.find((tg) => tg.name === t)?._id).filter((t) => !!t)

          console.log(skill.tags)

          return skill
        })

        const res = await Promise.all(sks.map((s) => axiosInstance.post('/content-gen/skills/', s)))

        console.log({ res, skillsObj })


      } catch (error) {
        console.error(error)
      }
    } */

    async function fetchSkills() {
      try {
        const res: { data: Skill[] } = await axiosInstance.get('/content-gen/skills/')
        _setSkills(res.data)

      } catch (error) {
        console.error(error)
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
    <main className={`flex items-stretch justify-center max-h-screen ${theme}`}>
      <AppNav navCollapsed={props.navCollapsed} />
      <div className="flex-1 max-h-screen overflow-auto">
        { reloaded ? props.children : <div className='h-screen w-full flex items-center justify-center'>
          <i className='i-tabler-loader animate-spin text-2xl text-indigo-600'></i>
        </div> }
      </div>
    </main>
  )
}

export default LayoutMain