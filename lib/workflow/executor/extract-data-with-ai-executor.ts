import OpenAI from 'openai';

import prisma from '@/lib/prisma';
import { symmetricDecrypt } from '@/lib/encryption';
import { ExtractDataWithAiTask } from '@/lib/workflow/task/extract-data-with-ai';
import { ExecutionEnvironment } from '@/types/executor';
import { createGeminiModelInstance } from '@/lib/aiModel';

export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput('Credentials');
    if (!credentials) {
      environment.log.error('input->credentials not defined');
    }

    const prompt = environment.getInput('Prompt');
    if (!prompt) {
      environment.log.error('input->prompt not defined');
    }

    const content = environment.getInput('Content');
    if (!content) {
      environment.log.error('input->content not defined');
    }

    // Get credentials from DB
    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });
    if (!credential) {
      environment.log.error('credential not found');
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error('cannot decrypt credential');
      return false;
    }

    const mockExtractedData = {
      usernameSelector: '#username',
      passwordSelector: '#password',
      loginSelector: 'body > div > form > input.btn.btn-primary',
    };

    const nextractAiSession = createGeminiModelInstance(plainCredentialValue);
    const modelReponse = await nextractAiSession.sendMessage(`${prompt}\n\n\n\n Here is the content: ${content}`);
    const promptTokenCount = modelReponse.response.usageMetadata?.promptTokenCount;
    const candidatesTokenCount = modelReponse.response.usageMetadata?.candidatesTokenCount;
    environment.log.info(`Prompt token: ${promptTokenCount}`);
    environment.log.info(`Completion token: ${candidatesTokenCount}`);

    const result = JSON.parse(JSON.stringify(modelReponse.response.text()))
    if (!result) {
      environment.log.error('Empty response from AI');
      return false;
    }
    environment.setOutput('Extracted data', result);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
