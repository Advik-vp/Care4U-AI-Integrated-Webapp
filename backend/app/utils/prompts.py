import os

def load_prompt(prompt_name):
    # Go up from backend/app/utils to workspace root, then into shared/ai_prompts
    path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'shared', 'ai_prompts', f'{prompt_name}.txt')
    with open(path, 'r') as f:
        return f.read()