import { Skill } from "@/lib/@types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";

function SkillItem({ skill, ...props }: { skill: Skill; children?: any; onClick?: (e: any) => void }) {

  const [icon, setIcon] = useState<string | null>(null)

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


  return (
    <button className="block max-w-sm px-6 py-5 rounded-md border border-slate cursor-pointer group flex flex-col hover:bg-muted transition-colors duration-150" onClick={(e) => { props.onClick?.(e) }}>
      <div className=" w-[32px] h-[32px] text-2xl mb-2">
        { icon ? <Image src={icon} alt={skill.icon} /> : skill.emoji }
      </div>
      <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
        {skill.name}
      </h3>
      <div className="font-base transition text-left text-sm text-ghost_white-300 group-hover:text-gray-700 dark:text-platinum-300 dark:group-hover:text-platinum-400">
        {skill.description}
      </div>
      <div className="flex flex-1 items-end gap-2 pt-4 flex-wrap">
        {skill.tags.slice(0, 2).map((tag) => (
          <Badge key={tag._id}>{tag.name}</Badge>
        ))}
        {skill.tags.length > 2 && <Badge variant={'outline'}>{`+${skill.tags.length - 2}`}</Badge>}
      </div>
    </button>
  );
}

export default SkillItem;
