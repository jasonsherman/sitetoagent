import { Website } from '../types/website';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export function transformResponse(data: any, url: any): Website {
  // Use the input URL as the name if no URL is provided in the response

  let name = '';
  
  try {
    if (url) {
      name = new URL(url).hostname.replace('www.', '');
    } else {
      name = 'Website';
    }
  } catch (error) {
    name = 'Website';
  }

  return {
    url,
    name,
    summary: {
      businessOverview: data.businessOverview || '',
      uniqueSellingPoints: data.uniqueSellingPoints || [],
      servicesProducts: data.servicesProducts || [],
      brandVoice: data.brandVoice || '',
      valuePropositions: data.valuePropositions || [],
    },
    greetings: data.greetings || [],
    salesQA: {
      services: data.providedServicesProducts || '',
      differentiators: data.competitiveDifference || '',
      profitableItems: data.mostProfitableLineItems || '',
      closingLines: data.bestSalesLines || [],
    },
    faqs: data.faqs || [],
  };
}

export async function analyzeWebsite(url: string): Promise<Website> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze website');
    }

    const data = await response.json();
    // Add the input URL to the response data
    return transformResponse(data, url);
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
    throw 'An unexpected error occurred';
  }
}

export async function startAnalysis(url: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/analyze-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) throw new Error('Failed to start analysis');
  const data = await response.json();
  return data.task_id;
}

export async function getAnalysisStatus(taskId: string) {
  const response = await fetch(`${API_BASE_URL}/api/analyze-status?task_id=${taskId}`);
  if (!response.ok) throw new Error('Failed to get analysis status');
  return response.json();
} 