# Local RAG from Scratch (TypeScript + Ollama)

A Retrieval-Augmented Generation (RAG) implementation built **from scratch** in **TypeScript**, without using LangChain, ChromaDB, or any vector database.

The goal of this project is to understand **how RAG actually works** before relying on frameworks.

## Features

- Generate **embeddings** using Ollama
- Build an in-memory **vector** store
- Implement **cosine similarity** from scratch
- Perform **semantic search** over documents
- Generate answers using a **local LLM**

## Architecture

## Tech Stack

- TypeScript
- Node.js
- Ollama
- Llama 3.2 (Chat Model)
- nomic-embed-text (Embedding Model)

## Getting Started

### Prerequiste

1. Download and install Ollama from: https://ollama.com/download
2. Pull Local LLMs

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```

3. Verify the models are available: `bash
ollama list
`

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install dependencies

```bash
npm install
```

### 6. Run the project

```bash
npm run start
```
