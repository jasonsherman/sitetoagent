from flask import Blueprint, jsonify, request
from app.utils import process_content, analyze_url
from app.logger import setup_logger

# Initialize logger
logger = setup_logger('routes')

main = Blueprint('main', __name__)

@main.route('/api/analyze', methods=['POST'])
def analyze_content():
    logger.info("Received request to /api/analyze")
    try:
        data = request.get_json()
        if not data or 'content' not in data:
            logger.warning("No content provided in request")
            return jsonify({'error': 'No content provided'}), 400
            
        content = data['content']
        logger.debug(f"Processing content of length: {len(content)}")
        result = process_content(content)
        logger.info("Successfully processed content")
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error processing content: {str(e)}")
        return jsonify({'error': str(e)}), 500

@main.route('/api/analyze-url', methods=['POST'])
def analyze_url_endpoint():
    logger.info("Received request to /api/analyze-url")
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            logger.warning("No URL provided in request")
            return jsonify({'error': 'No URL provided'}), 400
            
        url = data['url']
        max_pages = data.get('max_pages', 1)  # Default to 1 if not specified
        
        logger.debug(f"URL: {url}, max_pages: {max_pages}")
        
        # Validate max_pages
        try:
            max_pages = int(max_pages)
            if max_pages < 1:
                logger.warning(f"Invalid max_pages value: {max_pages}")
                return jsonify({'error': 'max_pages must be at least 1'}), 400
            if max_pages > 10:
                logger.warning(f"max_pages exceeds limit: {max_pages}")
                return jsonify({'error': 'max_pages cannot exceed 10'}), 400
        except ValueError:
            logger.warning(f"Invalid max_pages format: {max_pages}")
            return jsonify({'error': 'max_pages must be a valid integer'}), 400
            
        result = analyze_url(url, max_pages)
        logger.info(f"Successfully analyzed URL: {url}")
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error analyzing URL: {str(e)}")
        return jsonify({'error': str(e)}), 500

@main.route('/health', methods=['GET'])
def health_check():
    logger.debug("Health check request received")
    return jsonify({'status': 'healthy'}) 