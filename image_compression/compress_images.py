# https://tinify.com/dashboard/api <-- tinify dashboard
import os
import tinify
import glob
from PIL import Image
import sys
from tqdm import tqdm
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
TINIFY_API_KEY = os.getenv('TINIFY_API_KEY')

def compress_with_tinify(image_path, output_path):
    """
    Compress image using TinyPNG's API (best quality compression).
    """
    try:
        tinify.key = TINIFY_API_KEY
        source = tinify.from_file(image_path)
        source.to_file(output_path)
        return True
    except tinify.AccountError:
        print("Error: Invalid TinyPNG API key!")
        return False
    except tinify.ClientError:
        print(f"Error: Could not compress {image_path}. Check your image file.")
        return False
    except Exception as e:
        print(f"Error with TinyPNG compression: {str(e)}")
        return False

def compress_with_pillow(image_path, output_path, quality=65):
    """
    Fallback compression using Pillow with optimized settings.
    """
    try:
        img = Image.open(image_path)
        
        # Convert RGBA to RGB if necessary
        if img.mode == 'RGBA':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        
        # Optimize based on format
        if img.format == 'PNG':
            img.save(output_path, 
                    'PNG',
                    optimize=True,
                    quality=quality,
                    progressive=True)
        else:  # JPEG/JPG
            img.save(output_path, 
                    'JPEG',
                    quality=quality,
                    optimize=True,
                    progressive=True,
                    subsampling=0)  # Better color quality
        return True
    except Exception as e:
        print(f"Error with Pillow compression: {str(e)}")
        return False

def compress_image(image_path, output_path, use_tinify=True):
    """
    Compress image using TinyPNG first, fall back to Pillow if needed.
    """
    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Try TinyPNG first if API key is provided
    if use_tinify and TINIFY_API_KEY:
        if compress_with_tinify(image_path, output_path):
            return True
        print("Falling back to Pillow compression...")
    
    # Use Pillow as fallback
    return compress_with_pillow(image_path, output_path)

def format_size(size):
    """Format file size in KB or MB"""
    if size >= 1024 * 1024:
        return f"{size / (1024 * 1024):.1f}MB"
    return f"{size / 1024:.1f}KB"

def main():
    # Set up paths relative to the project root
    project_root = Path(__file__).parent  # imagecompression folder
    public_folder = project_root.parent / 'public'  # public folder
    
    # Supported image formats
    formats = ['.jpg', '.jpeg', '.png']
    
    # Create compressed folder inside public
    compressed_folder = public_folder / "compressed"
    os.makedirs(compressed_folder, exist_ok=True)
    
    # Get all image files from public folder
    image_files = []
    for ext in formats:
        image_files.extend(glob.glob(str(public_folder / f"**/*{ext}"), recursive=True))
        image_files.extend(glob.glob(str(public_folder / f"**/*{ext.upper()}"), recursive=True))
    
    if not image_files:
        print("No image files found in the public folder!")
        return
    
    print(f"Found {len(image_files)} images to compress...")
    
    # Process each image with progress bar
    for image_path in tqdm(image_files, desc="Compressing images"):
        # Get relative path from public folder
        rel_path = Path(image_path).relative_to(public_folder)
        output_path = compressed_folder / rel_path
        
        # Create necessary subdirectories
        os.makedirs(output_path.parent, exist_ok=True)
        
        # Compress the image
        if compress_image(image_path, str(output_path)):
            # Calculate compression stats
            original_size = os.path.getsize(image_path)
            compressed_size = os.path.getsize(output_path)
            ratio = (1 - compressed_size / original_size) * 100
            
            # Print compression results
            print(f"\n{rel_path}:")
            print(f"Original size: {format_size(original_size)}")
            print(f"Compressed size: {format_size(compressed_size)}")
            print(f"Compression ratio: {ratio:.1f}%")
    
    print("\nCompression complete!")

if __name__ == "__main__":
    main()