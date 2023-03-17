import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai