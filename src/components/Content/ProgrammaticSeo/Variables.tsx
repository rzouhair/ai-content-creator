import React, { useEffect, useState } from 'react'

type Props = {
  document: any
}

export default function Variables({ document }: Props) {
  const [variables, setVariables] = useState<string[]>([])

  function getVariablesBetweenCurlyBraces(inputString: string): string[] {
    const regex = /{{([^}]+)}}/g; // Regular expression to match content within curly braces
    const matches = inputString.match(regex); // Get all matches
    
    if (matches) {
      // Extract variables by removing curly braces and duplicates
      const variables = matches.map(match => match.replace(/{|}/g, '')).filter((value, index, self) => self.indexOf(value) === index);
      return variables;
    } else {
      return [];
    }
  }

  useEffect(() => {
    const vars: string[] = getVariablesBetweenCurlyBraces(document.content)
    setVariables(vars)
  }, [document])

  return (
    <div>Variables: {variables}</div>
  )
}