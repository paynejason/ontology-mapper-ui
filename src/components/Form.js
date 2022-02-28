import { useState } from "react";
import "./Form.css";
import ArgField from "./ArgField.js";

function Form() {
    const [expanded, setExpanded] = useState(false);
    const [topMappings, setTopMappings] = useState(3);
    const [minScore, setMinScore] = useState(0.5);
    const [baseIRI, setBaseIRI] = useState("");
    const [inclDeprecated, setInclDeprecated] = useState(true);
    const [inclIndividuals, setInclIndividuals] = useState(false);

    // uses Bootstrap grid system

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

    // uses Bootstrap grid system
    return (
        <div className="form">
            <form
                action="http://localhost:5000/api/upload_file"
                method="POST"
                encType="multipart/form-data"
            >
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
                            className="btn btn-secondary"
                            onClick={() => setExpanded(true)}
                        >
                            ▼ Show More Options ▼
                        </div>
                    ) : (
                        <div
                            className="btn btn-secondary"
                            onClick={() => setExpanded(false)}
                        >
                            ▲ Show Less Options ▲
                        </div>
                    )}
                </div>
                <hr />
                <label>File 1</label>
                <input type="file" name="file1" />
                <br />

                <label>File 2</label>
                <input type="file" name="file2" />
                <br />

                <input type="submit" />
            </form>
        </div>
    );
}

export default Form;
