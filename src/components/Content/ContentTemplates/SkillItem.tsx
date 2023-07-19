import { Skill } from "@/lib/@types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
    <button className="list-item-default flex items-center gap-2 p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-600" onClick={(e) => { props.onClick?.(e) }}>
      <div
        className="flex items-center justify-center min-w-5 h-5 bg-gray-100 rounded-xl group-hover:bg-gray-200"
      >
        <div className=" w-[14px] h-[14px]">
          { icon ? <Image src={icon} alt={skill.icon} /> : skill.emoji }
        </div>
      </div>
      <div className="truncate text-sm text-gray-400">
        {skill.name}
      </div>
    </button>
  );
}

export default SkillItem;
