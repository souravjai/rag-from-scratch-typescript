import ollama from "ollama";
import { CONFIG } from "../config";
import { EmbeddingsService } from "./EmbeddingsService";
import { VectorStore } from "./VectorStore";

export class RAGService {
  private chatModel: string;
  private embeddingsService: EmbeddingsService;
  private vectorStore: VectorStore;

  constructor(
    chatModel: string,
    embeddingsService: EmbeddingsService,
    vectorStore: VectorStore,
  ) {
    this.chatModel = chatModel;
    this.vectorStore = vectorStore;
    this.embeddingsService = embeddingsService;
  }

  async ask(question: string): Promise<string> {
    try {
      const questionEmbedding =
        await this.embeddingsService.getEmbedding(question);

      const similarDocs = this.vectorStore.search(questionEmbedding);

      similarDocs.forEach((doc) =>
        console.debug(
          `Context: ${doc.text} | Similarity: ${doc.similarity.toFixed(4)}`,
        ),
      );

      const context = similarDocs.map((doc) => doc.text).join("\n");

      const prompt = `Using Only the Context: \n\n${context}\n\nAnswer the question: ${question}`;

      const response = await ollama.chat({
        model: this.chatModel,
        messages: [{ role: "user", content: prompt }],
      });

      return response.message.content;
    } catch (error) {
      console.error(`Error answering question: ${question}`, error);
      throw error;
    }
  }
}
