import Async from "react-async";
import Results from "./Results";
import Papa from "papaparse";
import Layout from "./Layout";
import { default as _ } from "lodash";
import { useLocation } from "react-router-dom";

export async function parseCsv(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => _.snakeCase(header),
            complete: (results) => {
                return resolve(results);
            },
            error: (error) => {
                return reject(error);
            },
        });
    });
}

async function getData(processId) {
    // varies based on local versus Docker
    const URL_BASE =
        process.env.REACT_APP_DOCKER === "true"
            ? "http://localhost:3000"
            : "http://127.0.0.1:5000";
    const csvURL = new URL(URL_BASE + "/api/download_csv");
    const jsonURL = new URL(URL_BASE + "/api/download_graph_json");
    csvURL.searchParams.append("processId", processId);
    jsonURL.searchParams.append("processId", processId);
    const [csvResponse, jsonResponse] = await Promise.all([
        fetch(csvURL),
        fetch(jsonURL),
    ]);

    const [result, json] = await Promise.all([
        csvResponse.body.getReader().read(),
        jsonResponse.json(),
    ]);

    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);

    const data = (await parseCsv(csv)).data;

    // combine
    const combinedData = _.map(data, (d) => {
        const g = _.find(json, ["iri", d.mapped_term_iri]);
        return {
            ...d,
            graph: g,
        };
    });

    const maxCount = _.max(_.values(_.countBy(data, "source_term")));
    return { data: combinedData, maxCount: maxCount, graphs: json };
}

export default function AsyncResults() {
    const location = useLocation();
    const processId = location.state.processId;
    return (
        <Async promiseFn={() => getData(processId)}>
            <Async.Pending>
                <Layout
                    content={
                        <div className="d-flex justify-content-center">
                            <div
                                className="spinner-border text-dark"
                                role="status"
                                style={{ width: "4rem", height: "4rem" }}
                            >
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    }
                />
            </Async.Pending>
            <Async.Fulfilled>
                {(results) => <Results {...results} />}
            </Async.Fulfilled>
            <Async.Rejected>
                {(error) => `Something went wrong: ${error.message}`}
            </Async.Rejected>
        </Async>
    );
}
