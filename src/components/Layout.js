import "./Layout.css";
import NavBar from "./NavBar";
export default function Layout(props) {
    return (
        <div className="App">
            <div className="Header">
                <div>
                    <h1>text2term Ontology Mapper</h1>
                    <h6>
                        A tool for mapping (uncontrolled) terms to ontology
                        terms to facilitate semantic integration.
                    </h6>
                </div>
                <NavBar currentPath={props.currentPath} />
            </div>
            <hr />
            {props.content}
        </div>
    );
}
