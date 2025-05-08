import logging
import os
from logging.handlers import RotatingFileHandler
import json
from datetime import datetime

def setup_logger(name):
    """
    Set up logger with both file and console handlers
    """
    # Create logs directory if it doesn't exist
    if not os.path.exists('logs'):
        os.makedirs('logs')

    # Create logger
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # Create formatters
    file_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    console_formatter = logging.Formatter(
        '%(levelname)s - %(message)s'
    )

    # File handler (with rotation)
    file_handler = RotatingFileHandler(
        'logs/app.log',
        maxBytes=5 * 1024 * 1024,  # 5MB
        backupCount=3,  # Keep 3 backup files
        encoding='utf-8'
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(file_formatter)

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(console_formatter)

    # Add handlers to logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger

def rotate_data_files(data_dir='data', max_size_mb=10, max_files=5, include_subdirs=True):
    """
    Rotate data files in the specified directory based on size and count
    Args:
        data_dir: Main data directory
        max_size_mb: Maximum size in MB for the directory
        max_files: Maximum number of files to keep
        include_subdirs: Whether to include subdirectories in rotation
    """
    if not os.path.exists(data_dir):
        return

    # Get all JSON files in the directory and subdirectories if specified
    json_files = []
    if include_subdirs:
        for root, _, files in os.walk(data_dir):
            json_files.extend([
                os.path.join(root, f) for f in files 
                if f.endswith('.json')
            ])
    else:
        json_files = [
            os.path.join(data_dir, f) for f in os.listdir(data_dir) 
            if f.endswith('.json')
        ]
    
    # Sort files by modification time (oldest first)
    json_files.sort(key=lambda x: os.path.getmtime(x))
    
    # Calculate total size
    total_size = sum(os.path.getsize(f) for f in json_files)
    max_size_bytes = max_size_mb * 1024 * 1024
    
    # Remove oldest files if total size exceeds max_size or file count exceeds max_files
    while (total_size > max_size_bytes or len(json_files) > max_files) and json_files:
        oldest_file = json_files.pop(0)
        file_size = os.path.getsize(oldest_file)
        
        try:
            os.remove(oldest_file)
            total_size -= file_size
            logging.info(f"Rotated out old file: {oldest_file}")
        except Exception as e:
            logging.error(f"Error removing file {oldest_file}: {str(e)}")

def save_data_with_rotation(data, filename, data_dir='data', debug=False):
    """
    Save data to a JSON file with rotation policy
    Args:
        data: Data to save
        filename: Name of the file
        data_dir: Main data directory
        debug: Whether this is a debug file (will be saved in debug subdirectory)
    """
    # Determine the target directory
    target_dir = os.path.join(data_dir, 'debug') if debug else data_dir
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
    
    # Add timestamp to filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{os.path.splitext(filename)[0]}_{timestamp}.json"
    filepath = os.path.join(target_dir, filename)
    
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        # Apply rotation policy after saving
        # For debug files, use smaller limits
        if debug:
            rotate_data_files(target_dir, max_size_mb=5, max_files=3)
        else:
            rotate_data_files(data_dir, max_size_mb=10, max_files=5)
        
        return filepath
    except Exception as e:
        logging.error(f"Error saving data to {filepath}: {str(e)}")
        raise 