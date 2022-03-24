from flask import Flask, request, Response, send_file, send_from_directory
from subprocess import Popen, PIPE
from threading import Thread
import json
import uuid

app = Flask(__name__)

OUTPUT_FOLDER = "output/"
INPUT_FOLDER = "input/"


@app.route("/api")
def server_running():
    return "SERVER RUNNING"


@app.route("/api/upload_file", methods=["POST"])
def upload_file():
    processId = uuid.uuid4()

    # source always held in {processId}.txt
    source = INPUT_FOLDER + f"{processId}.txt"

    if "unstructured_terms_text" in request.form:
        # text is list of terms, write to file
        with open(source) as f:
            f.write(request.form["unstructured_terms_text"])
    else:
        # text in file, save it
        f1 = request.files["unstructured_terms_file"]
        f1.save(source)

    if "ontology_text" in request.form:
        # target is link, just keep as link
        target = request.form["ontology_text"]
    else:
        # target is file, save it and point to path ({processId.owl})
        target = INPUT_FOLDER + f"{processId}.owl"
        f1 = request.files["ontology_file"]
        f1.save(target)

    output = OUTPUT_FOLDER + f"{processId}.csv"

    command = [
        "python",
        "ontology-mapper/text2term",
        "-s",
        source,
        "-t",
        target,
        "-o",
        output,
        "-top",
        request.form["top_mappings"],
        "-min",
        request.form["min_score"],
        "-iris",
        request.form["base_iris"],
    ]

    if request.form["incl_deprecated"] == "false":
        command += ["-d"]

    if request.form["incl_individuals"] == "true":
        command += ["-i"]

    dbFile = f"output/{processId}.txt"

    with open(dbFile, "w") as f:
        f.write("Getting Mapper Ready ...\n")

    def run_mapper(dbFile):
        with Popen(command, stdout=PIPE, bufsize=1, universal_newlines=True) as p:
            for line in p.stdout:
                with open(dbFile, "a") as f:
                    f.write(line)  # append line to the appropriate status file

        with open(dbFile, "a") as f:
            f.write("DONE")  # overwrite file

    new_thread = Thread(target=run_mapper, args=(dbFile,))

    new_thread.start()

    resp = Response(str(processId))
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


@app.route("/api/current_status", methods=["GET"])
def current_status():
    processId = request.args["processId"]
    with open(OUTPUT_FOLDER + f"{processId}.txt", "r") as f:
        text = f.read()
    resp = Response(text)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


@app.route("/api/download_csv", methods=["GET"])
def download_csv():
    processId = request.args["processId"]
    resp = send_from_directory(OUTPUT_FOLDER, f"{processId}.csv")
    resp.headers["Content-Type"] = "text/csv"
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


@app.route("/api/download_graph_json", methods=["GET"])
def download_graph_json():
    processId = request.args["processId"]

    resp = send_from_directory(OUTPUT_FOLDER, f"{processId}.csv-term-graphs.json")
    resp.headers["Content-Type"] = "application/json"
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


if __name__ == "__main__":
    app.run(port=5000)
