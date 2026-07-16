import { EmbeddingsResponse, Message } from "ollama";

export type Embeddings = {
  text: string;
} & EmbeddingsResponse;

export interface DocumentWithSimilarity extends Embeddings {
  similarity: number;
}
