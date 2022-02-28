import Tooltip from "./Tooltip";

function ArgField({ name, label, tip, field }) {
    return (
        <div className="arg-field row">
            <div className="col label">
                <label htmlFor={name}>{label}</label>
                <Tooltip tip={tip} />
            </div>
            <div className="col">{field}</div>
        </div>
    );
}

export default ArgField;
