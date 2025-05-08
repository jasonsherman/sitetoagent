import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from openai import OpenAI
from app.prompts import get_analysis_prompt
from fake_useragent import UserAgent
import random
import time
from app.logger import setup_logger
import re
from datetime import datetime

# Initialize logger
logger = setup_logger('utils')

# Constants
MAX_CONTENT_LENGTH = 110000  # Maximum content length in characters

def sanitize_filename(url):
    """
    Convert URL to a valid filename
    """
    # Remove protocol and www
    filename = re.sub(r'^https?://(www\.)?', '', url)
    # Replace invalid characters with underscore
    filename = re.sub(r'[^\w\-\.]', '_', filename)
    # Remove trailing slashes
    filename = filename.rstrip('/')
    return filename

def get_openai_client():
    """
    Initialize and return OpenAI client
    """
    try:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPENROUTER_API_KEY"),
        )
        logger.debug("OpenAI client initialized successfully")
        return client
    except Exception as e:
        logger.error(f"Failed to initialize OpenAI client: {str(e)}")
        raise

def get_random_headers():
    """
    Generate random headers for each request
    """
    try:
        ua = UserAgent()
        headers = {
            'User-Agent': ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
        }
        logger.debug(f"Generated random headers with User-Agent: {headers['User-Agent']}")
        return headers
    except Exception as e:
        logger.warning(f"Failed to generate random headers, using fallback: {str(e)}")
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        }

def is_valid_url(url):
    """
    Check if the URL is valid and belongs to the same domain
    """
    try:
        result = urlparse(url)
        is_valid = all([result.scheme, result.netloc])
        logger.debug(f"URL validation for {url}: {is_valid}")
        return is_valid
    except Exception as e:
        logger.error(f"URL validation failed for {url}: {str(e)}")
        return False

def extract_structured_content(soup, url):
    """
    Extract structured content from the page
    """
    try:
        # Initialize content structure
        content_parts = []
        
        # Extract title
        title = soup.title.string if soup.title else ""
        
        # Extract meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        description = meta_desc['content'] if meta_desc else ""
        
        # Extract main content in sequence
        for element in soup.find_all(['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li']):
            if element.name in ['ul', 'ol']:
                # Skip the list container itself, we'll get its items
                continue
                
            # Get text content
            text = element.get_text(strip=True)
            if text:
                # Add element type as prefix for better context
                element_type = element.name.upper()
                content_parts.append(f"{element_type}: {text}")
        
        # Combine all content with newlines
        content = '\n'.join(filter(None, content_parts))
        
        # Create structured data
        structured_data = {
            "url": url,
            "title": title,
            "description": description,
            "content": content
        }
        
        logger.debug(f"Extracted structured content from {url}")
        return structured_data
        
    except Exception as e:
        logger.error(f"Error extracting structured content from {url}: {str(e)}")
        raise

def get_links(soup, base_url):
    """
    Extract all links from the page that belong to the same domain
    """
    try:
        base_domain = urlparse(base_url).netloc
        links = set()
        
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            full_url = urljoin(base_url, href)
            
            if is_valid_url(full_url) and urlparse(full_url).netloc == base_domain:
                links.add(full_url)
        
        logger.debug(f"Found {len(links)} valid links on {base_url}")
        return links
    except Exception as e:
        logger.error(f"Failed to extract links from {base_url}: {str(e)}")
        return set()

def scrape_url(url, max_pages=1):
    """
    Scrape content from a given URL and its linked pages up to max_pages
    """
    logger.info(f"Starting scraping process for {url} with max_pages={max_pages}")
    try:
        visited_urls = set()
        urls_to_visit = {url}
        all_content = []
        total_content_length = 0
        
        while urls_to_visit and len(visited_urls) < max_pages:
            current_url = urls_to_visit.pop()
            
            if current_url in visited_urls:
                logger.debug(f"Skipping already visited URL: {current_url}")
                continue
                
            try:
                logger.info(f"Scraping URL: {current_url}")
                headers = get_random_headers()
                
                # Add a small random delay between requests
                delay = random.uniform(1, 3)
                logger.debug(f"Waiting {delay:.2f} seconds before request")
                time.sleep(delay)
                
                response = requests.get(current_url, headers=headers, timeout=10)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract structured content
                structured_data = extract_structured_content(soup, current_url)
                current_content_length = len(structured_data['content']) + len(structured_data['description'])
                
                # Only add content if it's not empty
                if structured_data['content'].strip():
                    # Check if adding this content would exceed the limit
                    if total_content_length + current_content_length > MAX_CONTENT_LENGTH:
                        logger.warning(f"Content length limit reached ({total_content_length} + {current_content_length} > {MAX_CONTENT_LENGTH}). Skipping remaining pages.")
                        break
                    
                    all_content.append(structured_data)
                    total_content_length += current_content_length
                    visited_urls.add(current_url)
                else:
                    logger.warning(f"Skipping {current_url} due to empty content")
                
                # Get new links if we haven't reached max_pages
                if len(visited_urls) < max_pages:
                    new_links = get_links(soup, current_url)
                    urls_to_visit.update(new_links - visited_urls)
                    logger.debug(f"Added {len(new_links - visited_urls)} new URLs to visit")
                    
            except Exception as e:
                logger.error(f"Error scraping {current_url}: {str(e)}")
                continue
        
        logger.info(f"Completed scraping {len(visited_urls)} pages, total content length: {total_content_length}")
        return all_content
        
    except Exception as e:
        logger.error(f"Error in scraping process for {url}: {str(e)}")
        raise Exception(f"Error in scraping process: {str(e)}")

def process_content(content):
    """
    Process the content using OpenAI API and return the analysis
    """
    logger.info("Starting content processing with OpenAI")
    try:
        client = get_openai_client()
        
        # Convert structured content to text format for the prompt
        formatted_content = []
        for page in content:
            formatted_content.append(f"URL: {page['url']}")
            formatted_content.append(f"Title: {page['title']}")
            formatted_content.append(f"Description: {page['description']}")
            formatted_content.append("Content:")
            formatted_content.append(page['content'])
            formatted_content.append("\n---\n")
        
        combined_content = "\n".join(formatted_content)
        prompt = get_analysis_prompt().replace("{{WEBSITE_SCRAPED_CONTENT}}", combined_content)
        
        logger.debug("Sending request to OpenAI API")
        completion = client.chat.completions.create(
            extra_body={},
            model="microsoft/phi-4-reasoning-plus:free",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        # Extract the answer from the response
        response_content = completion.choices[0].message.content
        last_index = response_content.lower().rfind("answer:")
        result = json.loads(response_content[last_index + len("answer:"):].strip())
        
        # Save the model's response for debugging
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        debug_dir = os.path.join('data', 'debug')
        if not os.path.exists(debug_dir):
            os.makedirs(debug_dir)
            
        debug_file = os.path.join(debug_dir, f"model_response_{timestamp}.json")
        with open(debug_file, "w", encoding="utf-8") as f:
            json.dump({
                "prompt": prompt,
                "raw_response": response_content,
                "parsed_result": result
            }, f, indent=2, ensure_ascii=False)
            
        logger.debug(f"Saved model response to {debug_file}")
        logger.info("Successfully processed content with OpenAI")
        return result
    except Exception as e:
        logger.error(f"Error processing content with OpenAI: {str(e)}")
        raise

def analyze_url(url, max_pages=1):
    """
    Scrape URL and analyze its content
    """
    logger.info(f"Starting URL analysis for {url}")
    try:
        content = scrape_url(url, max_pages)
        
        # Only process if we have content
        if not content:
            logger.warning(f"No content found for {url}")
            return {"error": "No content found to analyze"}

        # Create data directory if it doesn't exist
        if not os.path.exists('data'):
            os.makedirs('data')

        # Generate safe filename
        safe_filename = sanitize_filename(url)
        filepath = os.path.join('data', f"{safe_filename}-{max_pages}_pages.json")
        
        logger.debug(f"Saving scraped data to {filepath}")
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(content, f, indent=2, ensure_ascii=False)

        result = process_content(content)
        logger.info(f"Successfully completed URL analysis for {url}")
        return result
    except Exception as e:
        logger.error(f"Error analyzing URL {url}: {str(e)}")
        raise 