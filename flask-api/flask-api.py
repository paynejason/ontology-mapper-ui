from flask import Flask, request, Response, send_from_directory
import subprocess
import json

app = Flask(__name__)

OUTPUT_FOLDER = "./output/"


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

    output = OUTPUT_FOLDER + "t2t-out.csv"

    top_mappings = request.form["top_mappings"] if "top_mappings" in request.form else 3
    min_score = request.form["min_score"] if "min_score" in request.form else 0.5
    base_iris = request.form["base_iris"] if "base_iris" in request.form else ""

    subprocess.run(
        [
            "python",
            "ontology-mapper/text2term",
            "-s",
            source,
            "-t",
            target,
            "-o",
            output,
            "-top",
            top_mappings,
            "min",
            min_score,
            "-iris",
            base_iris,
        ]
    )

    resp = Response("Upload Successful")
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Origin"] = "http://localhost:5000/api/upload_file"
    return resp


@app.route("/api/download_csv")
def download_csv():
    resp = send_from_directory(OUTPUT_FOLDER, "t2t-out.csv",)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Origin"] = "http://localhost:5000/api/download_csv"
    return resp


@app.route("/api/download_graph_json")
def download_graph_json():
    resp = send_from_directory(OUTPUT_FOLDER, "t2t-out.csv-term-graphs.json",)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Origin"] = "http://localhost:5000/api/download_graph_json"
    return resp


if __name__ == "__main__":
    app.run(port=5000)
