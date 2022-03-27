export default function Layout(props) {
    return (
        <div className="App">
            <h1>text2term Ontology Mapper</h1>
            <h6>
                A tool for mapping (uncontrolled) terms to ontology terms to
                facilitate semantic integration.
            </h6>
            <hr />
            {props.content}
        </div>
    );
}
