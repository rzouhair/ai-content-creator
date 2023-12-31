import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default openai