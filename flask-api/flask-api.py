from flask import Flask, request, Response

app = Flask(__name__)


@app.route("/")
def server_running():
    return "SERVER RUNNING"


@app.route("/api/upload_file", methods=["POST"])
def upload_file():
    print(request.files)
    print(request.form)
    if "unstructured-terms-text" in request.form:
        print("ut text")
    else:
        f1 = request.files["unstructured-terms-file"]
        f1.save("test.txt")

    if "ontology-text" in request.form:
        print("ont text")
    else:
        f1 = request.files["ontology-file"]
        f1.save("test.owl")

    resp = Response("UPLOAD SUCCESSFUL")
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Origin"] = "http://localhost:5000/api/upload_file"
    return resp


if __name__ == "__main__":
    app.run(port=5000)
