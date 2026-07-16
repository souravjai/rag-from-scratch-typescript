import { EmbeddingsService } from "./services/EmbeddingsService";
import { VectorStore } from "./services/VectorStore";
import { RAGService } from "./services/RAGService";
import { CONFIG, DOCUMENTS, QUESTIONS } from "./config";
import { Ollama } from "ollama";

async function main() {
  try {
    console.log("Initializing RAG System...\n");

    const embeddingsService = new EmbeddingsService(CONFIG.EMBEDDING_MODEL);

    const vectorStore = new VectorStore(
      embeddingsService,
      CONFIG.MAX_SEARCH_CONTEXTS,
    );

    const ragService = new RAGService(
      CONFIG.CHAT_MODEL,
      embeddingsService,
      vectorStore,
    );

    await vectorStore.addDocuments(DOCUMENTS);

    for (const question of QUESTIONS) {
      console.log(`Question: ${question}`);
      const answer = await ragService.ask(question);
      console.log(`Answer: ${answer}\n`);
    }
  } catch (error) {
    console.error("Error in RAG system:", error);
  }
}

main();
