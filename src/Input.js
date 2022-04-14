import MapperForm from "./components/MapperForm";
import Layout from "./components/Layout";

function Input() {
    return <Layout currentPath="/" content={<MapperForm />} />;
}

export default Input;
