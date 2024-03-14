import { Configuration, OpenAIApi } from 'openai'

const OPENAI_API_KEY = 'TBD'

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai
