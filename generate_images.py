import os
import re
import time
from openai import OpenAI

# Configuration
API_KEY_FILE = r'c:\Users\MI\Desktop\OPENAI_API_KEY.env'
COURSE_DIR = r'c:\Users\MI\Desktop\Cours_code_route\cours\Le conducteur'

def load_api_key():
    try:
        with open(API_KEY_FILE, 'r') as f:
            content = f.read().strip()
            # Extract key if in KEY=VALUE format
            if '=' in content:
                return content.split('=', 1)[1].strip()
            return content
    except Exception as e:
        print(f"Error loading API key: {e}")
        return None

def generate_image(client, prompt, output_path):
    if os.path.exists(output_path):
        print(f"Skipping {output_path} (already exists)")
        return

    print(f"Generating image for: {output_path}")
    print(f"Prompt: {prompt}")
    
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        
        image_url = response.data[0].url
        
        # Download image
        import requests
        img_data = requests.get(image_url).content
        with open(output_path, 'wb') as handler:
            handler.write(img_data)
        
        print(f"Saved to {output_path}")
        
    except Exception as e:
        print(f"Error generating image: {e}")

def process_files():
    api_key = load_api_key()
    if not api_key:
        return

    client = OpenAI(api_key=api_key)
    
    files = [f for f in os.listdir(COURSE_DIR) if f.endswith('.md')]
    
    for filename in files:
        file_path = os.path.join(COURSE_DIR, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to find prompts: **Fichier :** filename.jpg | **Prompt :** description
        # Handling variations in whitespace
        matches = re.finditer(r'\*\*Fichier\s*:\*\*\s*(.*?)\s*\|\s*\*\*Prompt\s*:\*\*\s*(.*)', content)
        
        for match in matches:
            img_filename = match.group(1).strip()
            prompt = match.group(2).strip()
            
            output_path = os.path.join(COURSE_DIR, img_filename)
            
            generate_image(client, prompt, output_path)
            time.sleep(1) # Rate limiting caution

if __name__ == "__main__":
    process_files()
