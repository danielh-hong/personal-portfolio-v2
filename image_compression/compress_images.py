import os
import tinify
from PIL import Image
import glob
from tqdm import tqdm
from dotenv import load_dotenv

# Load environment variables
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

def compress_with_pillow(image_path, output_path):
    """
    Fallback compression using Pillow with aggressive settings.
    """
    try:
        img = Image.open(image_path)
        
        # Keep track of original mode
        original_mode = img.mode
        
        # Convert RGBA to RGB if necessary
        if original_mode == 'RGBA':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background

        # Aggressive compression settings based on format
        if image_path.lower().endswith('.png'):
            img.save(output_path, 
                    'PNG',
                    optimize=True,
                    quality=0,
                    progressive=True)
        else:
            img.save(output_path, 
                    'JPEG',
                    quality=30,
                    optimize=True,
                    progressive=True,
                    subsampling=2)
        
        return True
    except Exception as e:
        print(f"Error with Pillow compression: {str(e)}")
        return False

def compress_image(image_path, output_path):
    """
    Compress image using TinyPNG first, fall back to Pillow if needed.
    """
    if TINIFY_API_KEY:
        if compress_with_tinify(image_path, output_path):
            return True
        print(f"Falling back to Pillow compression for {image_path}...")
    return compress_with_pillow(image_path, output_path)

def format_size(size):
    """Format file size in KB or MB"""
    if size >= 1024 * 1024:
        return f"{size / (1024 * 1024):.1f}MB"
    return f"{size / 1024:.1f}KB"

def main():
    if not TINIFY_API_KEY:
        print("Warning: No TinyPNG API key found in .env file. Using Pillow compression only.")
    
    # Supported image formats - only look in current directory
    formats = ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']
    
    # Create compressed folder in current directory
    compressed_folder = "compressed"
    os.makedirs(compressed_folder, exist_ok=True)
    
    # Get all image files in current directory only (no recursion)
    image_files = []
    for pattern in formats:
        image_files.extend(glob.glob(pattern))
    
    # Remove duplicates and sort
    image_files = sorted(set(image_files))
    
    if not image_files:
        print("No image files found in current directory!")
        return
    
    print(f"\nFound {len(image_files)} images to compress:")
    for file in image_files:
        print(f"- {file}")
    
    print("\nStarting compression...")
    
    # Process each image
    for image_path in tqdm(image_files, desc="Compressing images"):
        # Skip if it's in the compressed folder
        if image_path.startswith(compressed_folder):
            continue
            
        # Create output path
        output_path = os.path.join(compressed_folder, os.path.basename(image_path))
        
        # Compress the image
        if compress_image(image_path, output_path):
            # Calculate compression stats
            original_size = os.path.getsize(image_path)
            compressed_size = os.path.getsize(output_path)
            ratio = (1 - compressed_size / original_size) * 100
            
            # Print compression results
            print(f"\n{image_path}:")
            print(f"Original size: {format_size(original_size)}")
            print(f"Compressed size: {format_size(compressed_size)}")
            print(f"Compression ratio: {ratio:.1f}%")
    
    print("\nCompression complete!")

if __name__ == "__main__":
    main()