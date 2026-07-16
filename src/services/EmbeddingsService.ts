import ollama from "ollama";

export class EmbeddingsService {
  private model: string;

  constructor(model: string) {
    this.model = model;
  }

  async getEmbedding(prompt: string): Promise<number[]> {
    try {
      const response = await ollama.embeddings({
        model: this.model,
        prompt,
      });
      return response.embedding;
    } catch (error) {
      console.error(`Error getting embedding for prompt: ${prompt}`, error);
      throw error;
    }
  }
}
