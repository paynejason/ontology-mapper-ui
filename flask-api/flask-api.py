from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def server_running():
    return 'SERVER RUNNING'

@app.route("/api/upload_file", methods=['POST'])
def upload_file():
    f1 = request.files['file1']
    f2 = request.files['file2']

    min_score = request.form['min_score']
    individual = request.form['individual']
    top_mapping = request.form['top_mapping']

    print(f'min score: {min_score}')
    print(f'individual: {individual}')
    print(f'top mapping: {top_mapping}')

    f1.save('file1.txt')
    f2.save('file2.txt')
    ''
    # dynamically saves based on the file name
    # f1.save(f1.filename)

    return 'UPLOAD SUCCESSFUL'

if __name__ == "__main__":
    app.run(port=5000)

