import { useState, useEffect } from "react";
import "./Form.css";
import ArgField from "./ArgField.js";
import FileTextUpload from "./FileTextUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [topMappings, setTopMappings] = useState(3);
    const [minScore, setMinScore] = useState(0.5);
    const [baseIRI, setBaseIRI] = useState("");
    const [inclDeprecated, setInclDeprecated] = useState(true);
    const [inclIndividuals, setInclIndividuals] = useState(false);

    const [unstructuredTerms, setUnstructuredTerms] = useState(undefined);
    const [ontology, setOntology] = useState(undefined);
    const [currentStatus, setCurrentStatus] = useState(
        "Starting Mapping Process"
    );

    // api information
    const URL_BASE =
        process.env.REACT_APP_DOCKER === "true" ? "" : "http://localhost:5000";
    const url_mapper = URL_BASE + "/api/upload_file";
    const url_status = URL_BASE + "/api/current_status";

    useEffect(() => {
        // while waiting for mapper to finish, ping current status endpoint

        const TIME_INTERVAL = 100000; // in ms
        let timer;

        function startTimer() {
            timer = setInterval(function () {
                axios.get(url_status).then((response) => {
                    setCurrentStatus(response.data);
                    if (response.data === "DONE") {
                        setWaiting(false);
                        stopTimer();
                        navigate("/results/");
                    }
                });
            }, TIME_INTERVAL);
        }

        function stopTimer() {
            clearInterval(timer);
        }
        if (waiting) {
            startTimer();
        }
    }, [waiting, navigate, url_status]);

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
            name: "base_iris",
            label: "Base IRIs",
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

        const formData = new FormData();

        if (typeof unstructuredTerms === "string") {
            formData.append("unstructured_terms_text", unstructuredTerms);
        } else {
            formData.append(
                "unstructured_terms_file",
                unstructuredTerms[0].file
            );
        }

        if (typeof ontology === "string") {
            formData.append("ontology_text", ontology);
        } else {
            formData.append("ontology_file", ontology[0].file);
        }

        formData.append("top_mappings", topMappings);
        formData.append("min_score", minScore);
        formData.append("base_iris", baseIRI);
        formData.append("incl_deprecated", inclDeprecated);
        formData.append("incl_individuals", inclIndividuals);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        axios.post(url_mapper, formData, config);

        setWaiting(true);
    }

    if (waiting) {
        return (
            <div className="waiting">
                <h3>
                    {currentStatus.split("\n").map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </h3>
            </div>
        );
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
