import requests
import json
import re

# URL of the raw markdown file
url = "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-1.md"

# Fetch the content
response = requests.get(url)
markdown_content = response.text

# Initialize variables for parsing
questions = []
current_question = None
correct_answer_prefix = "Correct answer:"

# Split content into lines for processing
lines = markdown_content.split('\n')

for line in lines:
    line = line.strip()

    # Match any question number (1., 2., 3., etc.)
    if re.match(r'^\d+\.', line):
        # Append the previous question if it exists
        if current_question:
            questions.append(current_question)
        # Start a new question object
        question_text = line.split(".", 1)[1].strip()
        current_question = {
            "text": question_text,
            "options": [],
            "correctAnswers": [],
            'exam': '1'
        }
    elif line.startswith("- "):
        # Extract option text and value
        option_value = line[2:3]  # First character after '- '
        option_label = line[4:].strip()
        current_question["options"].append({
            "value": option_value,
            "label": option_label
        })
    elif correct_answer_prefix in line:
        # Extract the correct answer(s)
        correct_answers = line.split(correct_answer_prefix)[1].strip()
        current_question["correctAnswers"] = correct_answers.split(", ")

# Add the last question if exists
if current_question:
    questions.append(current_question)

# Convert the questions to JSON format
output_json = json.dumps(questions, indent=2)

# Save the JSON to a file
output_file_path = "./AWS_Practice_Exam_1.json"
with open(output_file_path, "w") as file:
    file.write(output_json)