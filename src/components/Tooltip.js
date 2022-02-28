import ReactTooltip from "react-tooltip";

function Tooltip({ tip }) {
    return (
        <>
            <span data-tip={tip}>ⓘ:</span>
            <ReactTooltip place="top" type="dark" effect="float" />
        </>
    );
}

export default Tooltip;
