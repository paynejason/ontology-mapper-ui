import { useState } from "react";
import "./Form.css";
import ArgField from "./ArgField.js";
import FileTextUpload from "./FileTextUpload";
import axios from "axios";

function Form() {
    const [expanded, setExpanded] = useState(false);
    const [topMappings, setTopMappings] = useState(3);
    const [minScore, setMinScore] = useState(0.5);
    const [baseIRI, setBaseIRI] = useState("");
    const [inclDeprecated, setInclDeprecated] = useState(true);
    const [inclIndividuals, setInclIndividuals] = useState(false);

    const [unstructuredTerms, setUnstructuredTerms] = useState(undefined);
    const [ontology, setOntology] = useState(undefined);

    const mainArgFields = [
        {
            name: "top_mappings",
            label: "Top Mappings",
            tip:
                "Maximum number of top-ranked mappings returned per source term.",
            field: (
                <input
                    type="number"
                    name="top_mappings"
                    value={topMappings}
                    onChange={(e) => setTopMappings(e.target.value)}
                />
            ),
        },
        {
            name: "min_score",
            label: "Minimum Score",
            tip:
                "Minimum score [0,1] for the mappings (0=dissimilar, 1=exact match).",
            field: (
                <input
                    type="number"
                    min={0}
                    max={1}
                    step={"any"}
                    name="min_score"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                />
            ),
        },
    ];

    const expandedArgFields = [
        {
            name: "base_iri",
            label: "Base IRI",
            tip:
                "Map only to terms whose IRIs start with any IRI given in this comma-separated list.",
            field: (
                <input
                    type="text"
                    onChange={(e) => setBaseIRI(e.target.value)}
                    value={baseIRI}
                />
            ),
        },

        {
            name: "incl_deprecated",
            label: "Include Deprecated Terms",
            tip: "Include terms stated as deprecated via owl:deprecated.",
            field: (
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="incl_deprecated"
                    checked={inclDeprecated}
                    onChange={(e) => setInclDeprecated(!inclDeprecated)}
                />
            ),
        },

        {
            name: "incl_individuals",
            label: "Include Ontology Individuals",
            tip: "Include ontology individuals in addition to classes.",
            field: (
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="incl_individuals"
                    checked={inclIndividuals}
                    onChange={(e) => setInclIndividuals(!inclIndividuals)}
                />
            ),
        },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:5000/api/upload_file";
        const formData = new FormData();

        if (typeof unstructuredTerms === "string") {
            formData.append("unstructured-terms-text", unstructuredTerms);
        } else {
            formData.append(
                "unstructured-terms-file",
                unstructuredTerms[0].file
            );
        }

        if (typeof ontology === "string") {
            formData.append("ontology-text", ontology);
        } else {
            formData.append("ontology-file", ontology[0].file);
        }

        formData.append(
            "ontology-" + (typeof ontology === "string" ? "text" : "file"),
            ontology
        );

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Origin: "http://localhost:3000",
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });
    }

    // uses Bootstrap grid system
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                {mainArgFields.map((d) => (
                    <ArgField {...d} key={d.name} />
                ))}
                {expanded &&
                    expandedArgFields.map((d) => (
                        <ArgField {...d} key={d.name} />
                    ))}
                <div className="center-btn">
                    {!expanded ? (
                        <div
                            className="bold btn btn-secondary"
                            onClick={() => setExpanded(true)}
                        >
                            ▼ Show More Options ▼
                        </div>
                    ) : (
                        <div
                            className="bold btn btn-secondary"
                            onClick={() => setExpanded(false)}
                        >
                            ▲ Show Less Options ▲
                        </div>
                    )}
                </div>
                <hr />
                <div className="ft-upload-area">
                    <FileTextUpload setOutput={setUnstructuredTerms} />
                    <div className="vertical-line"></div>
                    <FileTextUpload ontology={true} setOutput={setOntology} />
                </div>
                {unstructuredTerms && ontology && (
                    <div className="center-btn">
                        <input
                            type="submit"
                            className="bold btn btn-secondary"
                        />
                    </div>
                )}
            </form>
        </div>
    );
}

export default Form;
