import { Skill } from "@/lib/@types";
import { atom } from "jotai";

export enum IdeationPhases {
  NICHE_SELECTION = 'NICHE_SELECTION',
  AUTOCOMPLETE = 'AUTOCOMPLETE',
  ALPHABET_SOUP = 'ALPHABET_SOUP',
  QUERY_GENERATOR = 'QUERY_GENERATOR',
  RESULTS = 'RESULTS'
}

export interface IdeationForm {
  method: string;
  form: Record<string, string>
}

const currentPhaseAtom = atom<IdeationPhases>(IdeationPhases.NICHE_SELECTION)
const selectedIdeationMethodAtom = atom<IdeationPhases.AUTOCOMPLETE | IdeationPhases.ALPHABET_SOUP | IdeationPhases.QUERY_GENERATOR | null>(null)

export interface IdeationResult {
  keywords_count: number;
  list_id: string
}
const ideationResultsAtom = atom<IdeationResult | null>(null)

const autocompleteFormAtom = atom<IdeationForm | null>(null)

const cardHeader = {
  [IdeationPhases.NICHE_SELECTION]: {
    title: 'Welcome to Keyword Ideation',
    description: 'Select a method to generate SEO-optimized keywords for your niche.',
  },
  [IdeationPhases.AUTOCOMPLETE]: {
    title: 'Qualifiers Method',
    description: 'Enhance your search query by adding qualifiers to your niche.',
  },
  [IdeationPhases.ALPHABET_SOUP]: {
    title: 'Alphabet Soup Method',
    description: 'Expand your keyword list using the Alphabet Soup technique.',
  },
  [IdeationPhases.QUERY_GENERATOR]: {
    title: 'Query Generation',
    description: 'Get multiple search query suggestions out of a simple niche',
  },
  [IdeationPhases.RESULTS]: {
    title: 'Results',
    description: 'Explore the generated keywords based on your selected method.',
  },
}

function navigatePhases(direction: 'forward' | 'back', currentPhase: any, selectedIdeationMethod: any, setCurrentPhase: any) {
  const phasesMap: Record<string, number> = {
    [IdeationPhases.NICHE_SELECTION]: 0,
    [IdeationPhases.AUTOCOMPLETE]: 1,
    [IdeationPhases.ALPHABET_SOUP]: 1,
    [IdeationPhases.QUERY_GENERATOR]: 1,
    [IdeationPhases.RESULTS]: 2,
  }

  let currentPhaseIndex: number = phasesMap[currentPhase]
  if (direction === 'forward') {
    if (currentPhaseIndex === 0) {
      if (!selectedIdeationMethod) {
        return
      } else {
        setCurrentPhase(selectedIdeationMethod)
        return
      }
    } 
    if (currentPhaseIndex + 1 > Math.max(...Object.values(phasesMap))) {
      return
    }
  } else {
    if (currentPhaseIndex - 1 < 0) {
      return
    }
  }
  const newPhase = Object.keys(phasesMap).find(
    (key: string) => phasesMap[key as IdeationPhases] === (currentPhaseIndex + (direction === 'forward' ? 1 : -1))
  )
  setCurrentPhase(newPhase as IdeationPhases)
}

export {
  currentPhaseAtom,
  autocompleteFormAtom,
  ideationResultsAtom,
  selectedIdeationMethodAtom,
  navigatePhases,
  cardHeader
}
