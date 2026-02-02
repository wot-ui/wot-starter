import re
import os
import argparse

def split_llms(input_file, output_dir, remove_input=False):
    print(f"Reading from: {input_file}")
    print(f"Outputting to: {output_dir}")

    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by "---" lines which seem to separate sections
    # However, "---" is also used for frontmatter.
    # The structure seems to be:
    # ---
    # url: '...'
    # ---
    # # Title
    # ... content ...

    # We can split by "\n---\n" but this tears apart the frontmatter.
    # Let's try to split by the `url` marker which is quite unique in this file context

    # Alternatively, keep the sections and merge them.
    chunks = re.split(r'\n---\n', content)

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    merged_sections = []
    current_metadata = {}

    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue

        # Check if this chunk is metadata (contains url:)
        url_match = re.search(r"^url: '(.*?)'", chunk, re.MULTILINE)
        if url_match:
            current_metadata['url'] = url_match.group(1)
            continue

        # If not metadata, it's content. If we have pending metadata, apply it.
        filename = None
        if 'url' in current_metadata:
            url = current_metadata['url']
            filename = url.split('/')[-1]
            if not filename.endswith('.md'):
                filename += '.md'
            # Reset metadata after using it
        else:
            # Fallback for content without preceding metadata
            lines = chunk.split('\n')
            title_line = next((line for line in lines if line.startswith('# ')), None)
            if title_line:
                title = title_line.replace('# ', '').strip().split(' ')[0].lower()
                filename = f"{title}.md"
            else:
                 # Skip chunks that are likely just navigation or noise
                 continue

        if filename:
            filepath = os.path.join(output_dir, filename)

            # Construct file content
            file_content = ""
            if 'url' in current_metadata:
                file_content += "---\n"
                file_content += f"url: '{current_metadata['url']}'\n"
                file_content += "---\n\n"
                # Reset metadata
                current_metadata = {}

            file_content += chunk

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(file_content)
            print(f"Created {filepath}")

    if remove_input:
        try:
            os.remove(input_file)
            print(f"Successfully removed input file: {input_file}")
        except OSError as e:
            print(f"Error removing input file: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Split llms-full.txt into component markdown files.')
    parser.add_argument('--input', type=str, required=True, help='Path to llms-full.txt')
    parser.add_argument('--output', type=str, required=True, help='Output directory for references')
    parser.add_argument('--remove-input', action='store_true', help='Remove the input file after processing')

    args = parser.parse_args()

    split_llms(args.input, args.output, args.remove_input)
