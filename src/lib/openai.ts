export function getOpenAIKeyStatus() {
  return {
    hasServerKey: Boolean(process.env.OPENAI_API_KEY),
  };
}
