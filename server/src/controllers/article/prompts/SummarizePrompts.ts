import { Article } from "@prisma/client";

export class SummarizePrompts {
  static summarizeArticle(article: Article, url: string | string[]) {
    return `As an academic research analyst, please provide a comprehensive analysis of the following academic article:

Article Title: ${article.name}
Article URL: ${url}

Please structure your analysis in the following sections:

1. Executive Summary (2-3 sentences)
   - Main research question or objective
   - Key findings or conclusions

2. Methodology Overview
   - Research approach
   - Data collection methods
   - Analysis techniques used

3. Key Contributions
   - Main theoretical contributions
   - Practical implications
   - Novel approaches or findings

4. Critical Analysis
   - Strengths of the research
   - Potential limitations
   - Areas for future research

Please ensure your analysis is clear, concise, and maintains academic rigor while being accessible to readers.`;
  }

  static relationArticle(article: Article, url: string | string[]) {
    return `As an academic research assistant, please analyze the following article and suggest related academic works:

    Article Title: ${article.name}
    Article URL: ${url}
    
    Please provide a list of related articles that:
    1. Share similar research methodologies or approaches
    2. Cover related topics or themes
    3. Build upon or extend the findings
    4. Present alternative viewpoints or contrasting perspectives
    5. Are from the same field of study
    
    For each related article suggestion, please explain briefly why it's relevant to the original article.
    
    Format your response as a structured list with clear explanations for each recommendation.`;
  }
}
