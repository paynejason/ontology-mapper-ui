from flask import Flask, request, Response
import subprocess

app = Flask(__name__)


@app.route("/")
def server_running():
    return "SERVER RUNNING"


@app.route("/api/upload_file", methods=["POST"])
def upload_file():

    if "unstructured-terms-text" in request.form:
        # text is list of terms, write to file
        with open("unstructured-terms.txt") as f:
            f.write(request.form["unstructured-terms-text"])
    else:
        # text in file, save it
        f1 = request.files["unstructured-terms-file"]
        f1.save("unstructured-terms.txt")

    # source always held in unstructured-terms.txt
    source = "unstructured-terms.txt"

    if "ontology-text" in request.form:
        # target is link, just keep as link
        target = request.form["ontology-text"]
    else:
        # target is file, save it and point to path
        f1 = request.files["ontology-file"]
        f1.save("ontology.owl")
        target = "ontology.owl"

    output = "t2t-out.csv"

    subprocess.run(
        ["python", "ontology-mapper/text2term", "-s", source, "-t", target,]
    )

    resp = Response("UPLOAD SUCCESSFUL")
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Origin"] = "http://localhost:5000/api/upload_file"
    return resp


if __name__ == "__main__":
    app.run(port=5000)
