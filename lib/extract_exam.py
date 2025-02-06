import requests
import json
import re

# URL of the raw markdown file
urls = [
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-1.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-2.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-3.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-4.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-5.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-6.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-7.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-8.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-9.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-10.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-11.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-12.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-13.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-14.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-15.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-16.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-17.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-18.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-19.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-20.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-21.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-22.md",
    "https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/refs/heads/master/practice-exam/practice-exam-23.md",
]


def get_content(url):
    # Fetch the content
    response = requests.get(url)
    markdown_content = response.text
    return markdown_content


def extract(no, markdown_content):
    # Initialize variables for parsing
    questions = []
    current_question = None
    correct_answer_prefix = "Correct answer:"
    correct_answer_prefix_2 = "Correct Answer:"

    # Split content into lines for processing
    lines = markdown_content.split("\n")

    for line in lines:
        print(correct_answer_prefix in line, line)
        line = line.strip()

        # Match any question number (1., 2., 3., etc.)
        if re.match(r"^\d+\.", line):
            # Append the previous question if it exists
            if current_question:
                questions.append(current_question)
            # Start a new question object
            question_text = line.split(".", 1)[1].strip()
            current_question = {
                "text": question_text,
                "options": [],
                "correctAnswers": [],
                "exam": f"{no}",
            }
        elif line.startswith("- "):
            # Extract option text and value
            option_value = line[2:3]  # First character after '- '

            if line[3] != ".":
                continue

            option_label = line[4:].strip()
            current_question["options"].append(
                {"value": option_value, "label": option_label}
            )
        elif correct_answer_prefix in line:
            # Extract the correct answer(s)
            correct_answers = line.split(correct_answer_prefix)[1].strip()
            current_question["correctAnswers"] = correct_answers.split(", ")
        elif correct_answer_prefix_2 in line:
            correct_answers = line.split(correct_answer_prefix_2)[1].strip()
            current_question["correctAnswers"] = correct_answers.split(", ")

            if (len(correct_answers) != len(correct_answers.split(', '))):
                answers = []

                for index in range(len(correct_answers)):
                    print(index, correct_answers)
                    answers.append(correct_answers[index])
                
                current_question['correctAnswers'] = answers

            print(line, correct_answers.split(", "))

    # Add the last question if exists
    if current_question:
        questions.append(current_question)

    # Convert the questions to JSON format
    output_json = json.dumps(questions, indent=2)

    # Save the JSON to a file
    output_file_path = f"./exams/aws/cloud-practitioner/AWS_Practice_Exam_{no}.json"
    with open(output_file_path, "w") as file:
        file.write(output_json)


if __name__ == "__main__":
    for index, url in enumerate(urls, start=1):
        markdown_content = get_content(url)
        extract(index, markdown_content)
