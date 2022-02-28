import { Dropzone, FileItem } from "@dropzone-ui/react";
import { useState, useEffect } from "react";

function FileTextUpload({ ontology, setOntology, setUnstructuredTerms }) {
    const [display, setDisplay] = useState("both");
    const [files, setFiles] = useState([]);
    const [textField, setTextField] = useState("");
    const updateFiles = (incomingFiles) => {
        setFiles(incomingFiles);
    };

    useEffect(() => {
        if (files.length === 0 && textField === "") {
            setDisplay("both");
        } else if (files.length !== 0) {
            setDisplay("files");
        } else if (textField !== "") {
            setDisplay("terms");
        }
    }, [files, textField]);

    useEffect(() => {
        if (ontology) {
            if (display === "both") {
                setOntology(false);
            } else {
                setOntology(true);
            }
        } else {
            if (display === "both") {
                setUnstructuredTerms(false);
            } else {
                setUnstructuredTerms(true);
            }
        }
    }, [display]);

    return (
        <div
            className="ft-upload-block"
            style={{ gridColumn: ontology ? 3 : 1 }}
        >
            <h3 className="center-text">
                {ontology ? "Ontology" : "Unstructured Terms"}
            </h3>
            <div
                className="ft-upload"
                style={{ justifyContent: display !== "both" ? "center" : "" }}
            >
                {(display === "both" || display === "files") && (
                    <Dropzone
                        onChange={updateFiles}
                        value={files}
                        accept={ontology ? ".owl" : ".txt"}
                        behavior="replace"
                        label={
                            ontology
                                ? "Drag ontology file here or click to browse computer."
                                : "Drop file of terms here (one term per line) or click to browse computer."
                        }
                        maxFiles={1}
                        minHeight={0}
                    >
                        {files.map((file) => (
                            <FileItem {...file} preview />
                        ))}
                    </Dropzone>
                )}

                {display === "both" && <h6 className="or"> - OR - </h6>}

                {(display === "both" || display === "terms") && (
                    <div className="arg-field textarea">
                        <div className="label">
                            <label htmlFor="textfield">
                                {ontology ? "Ontology URL" : "Enter Terms:"}
                            </label>
                        </div>

                        {ontology ? (
                            <input
                                style={{ width: "100%" }}
                                type="url"
                                name="textfield"
                                value={textField}
                                onChange={(e) => setTextField(e.target.value)}
                            ></input>
                        ) : (
                            <textarea
                                name="textfield"
                                placeholder="(one term per line)"
                                value={textField}
                                onChange={(e) => setTextField(e.target.value)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileTextUpload;
