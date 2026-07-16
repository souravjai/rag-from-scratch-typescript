import { DocumentWithSimilarity, Embeddings } from "../types";
import { EmbeddingsService } from "./EmbeddingsService";

export class VectorStore {
  private database: Embeddings[] = [];
  private embeddingsService: EmbeddingsService;
  private maxSearchContext: number;

  constructor(embeddingsService: EmbeddingsService, maxSearchContext: number) {
    this.embeddingsService = embeddingsService;
    this.maxSearchContext = maxSearchContext;
  }

  async addDocuments(documents: string[]): Promise<void> {
    try {
      const embeddingsPromises = await Promise.allSettled(
        documents.map((docs) => this.embeddingsService.getEmbedding(docs)),
      );
      const embeddings = embeddingsPromises.map((result) =>
        result.status === "fulfilled" ? result.value : [],
      );

      this.database = documents.map((text, index) => ({
        text,
        embedding: embeddings[index],
      }));

      console.log(
        `Added ${documents.length} documents to database with embeddings.`,
      );
    } catch (error) {
      console.error("Error adding documents to database:", error);
      throw error;
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error("Vectors must have the same length");
    }

    const magnitude = (vector: number[]) =>
      Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));

    const dotProduct = a.reduce(
      (sum, value, index) => sum + value * b[index],
      0,
    );
    const magnitudeA = magnitude(a);
    const magnitudeB = magnitude(b);

    if (magnitudeA * magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }

  search(queryEmbedding: number[]): DocumentWithSimilarity[] {
    if (queryEmbedding.length === 0) {
      console.warn("Query embedding is empty");
      return [];
    }

    const rankedDocs = this.database
      .map((doc) => ({
        ...doc,
        similarity: this.cosineSimilarity(queryEmbedding, doc.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity);

    return rankedDocs.slice(0, this.maxSearchContext);
  }
}
