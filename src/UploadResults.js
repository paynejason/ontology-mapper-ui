import ResultsForm from "./components/ResultsForm";
import Layout from "./components/Layout";

function Home() {
    return <Layout currentPath="/upload-results" content={<ResultsForm />} />;
}

export default Home;
