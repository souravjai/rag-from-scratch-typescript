export const CONFIG = {
  EMBEDDING_MODEL: "nomic-embed-text",
  CHAT_MODEL: "llama3.2",
  MAX_SEARCH_CONTEXTS: 1,
} as const;

export const DOCUMENTS = [
  "Employees receive 30 days annual leave.",
  "Employees need to submit timesheet every week.",
  "Employees need to come to office atleast 2 days a week.",
];

export const QUESTIONS = [
  "What is the annual leave policy for employees?",
  "When do I fill timesheet",
  "How many leave do i get?",
  "How many days do I need to come to office?",
  "If I take 2 leaves in a week, Do I need to come to office on other days?",
];
