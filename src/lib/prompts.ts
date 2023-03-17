interface Prompt {
  title: string
  description?: string
  prompt: string
}

const prompts: Prompt[] = [
  {
    title: 'Title generator',
    description: 'It generates a certain number of catchy titles based on a main keyword',
    prompt: `Create {{NUMBER OF TITLES}} titles for a blog post on "{{ CHANGE YOUR MAIN KEYWORD HERE }}" that follows the following recipe for a great eye-catching blog post title.
  Make sure to include the blog post title provided, as well as a specific number, power words, and be concise. under 59 characters, and  include the target topic keywords at the start of the title"
  For example, if the topic is "10 Tips for Staying Focused While Working from Home," a possible title could be:
  "10 Proven Tips to Boost Your Focus and Productivity When Working from Home`
  },
  {
    title: 'Tee-up paragraph generator',
    description: 'It generates a certain number of catchy titles based on a main keyword',
    prompt: `Provide the first sentence for the blog post "{{ INSERT THE BLOGPOST TITLE }}" that respect the following criteria:
    - Clearly identify the topic
    - Establish rapport with the reader
    - Give confidence you can help
    - Be careful not to trick google by mentioning other topics too much
    - a human touch free from plagiarism
    - contains 2-3 sentences`
  },
]

export default prompts