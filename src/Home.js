import MapperForm from "./components/MapperForm";
import Layout from "./components/Layout";

function Home() {
    return <Layout currentPath="/" content={<MapperForm />} />;
}

export default Home;
