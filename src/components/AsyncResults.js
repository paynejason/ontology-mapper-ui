import Async from "react-async";
import Results from "./Results";
import Papa from "papaparse";
import { default as _ } from "lodash";

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

async function getData() {
    const URL_BASE =
        process.env.REACT_DOCKER === "true" ? "" : "http://localhost:5000";
    const [csvResponse, jsonResponse] = await Promise.all([
        fetch(URL_BASE + "/api/download_csv"),
        fetch(URL_BASE + "/api/download_graph_json"),
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
    return { data: combinedData, maxCount: maxCount };
}

export default function AsyncResults() {
    return (
        <Async promiseFn={getData}>
            <Async.Pending>Loading...</Async.Pending>
            <Async.Fulfilled>
                {(results) => <Results {...results} />}
            </Async.Fulfilled>
            <Async.Rejected>
                {(error) => `Something went wrong: ${error.message}`}
            </Async.Rejected>
        </Async>
    );
}
