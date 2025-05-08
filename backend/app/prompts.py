def get_analysis_prompt():
    return """
        You are a meticulous web‑content analyst. 
        Read the text after the line `---SCRAPED TEXT START---` and do **not** copy that text verbatim.
        Instead, fill the following JSON schema **exactly** (no extra keys, no comments):

        {
            "type": "object",
            "title": "Website",
            "properties": {
                "businessOverview":        { "type": "string" },
                "uniqueSellingPoints":     { "type": "array",  "items": { "type": "string" } },
                "servicesProducts":        { "type": "array",  "items": { "type": "string" } },
                "brandVoice":              { "type": "string" },
                "valuePropositions":       { "type": "array",  "items": { "type": "string" } },

                "services":                { "type": "string" },
                "differentiators":         { "type": "string" },
                "profitableItems":         { "type": "string" },

                "providedServicesProducts":{ "type": "string",  "description": "Answer: What services or products does your business provide?" },
                "competitiveDifference":   { "type": "string",  "description": "Answer: How are you different from your competitors?" },
                "mostProfitableLineItems": { "type": "string",  "description": "Answer: What are your most profitable line items?" },
                "bestSalesLines":          { "type": "array",   "items": { "type": "string" },
                                            "description": "Answer: What are your 5 best sales lines to close a deal?" }
            },
            "required": [
                "businessOverview",
                "uniqueSellingPoints",
                "servicesProducts",
                "brandVoice",
                "valuePropositions",
                "services",
                "differentiators",
                "profitableItems",
                "providedServicesProducts",
                "competitiveDifference",
                "mostProfitableLineItems",
                "bestSalesLines"
            ]
        }

        Rules:
        * Output **only** valid JSON (no markdown fencing, no explanatory prose).
        * Each array must have **exactly 5 elements** where the schema calls for 5.
        * Use short, information‑dense sentences. Do not cite headings literally; paraphrase.
        * If the answer is unknown, output an empty string (`""`) or an empty array (`[]`) as appropriate.
        * Think step by step, but at the end, return only the final answer prefixed with Answer:

        ---SCRAPED TEXT START---
        {{WEBSITE_SCRAPED_CONTENT}}
        ---SCRAPED TEXT END---
    """ 