import { useLoaderData } from "react-router"


const Warehouse = () => {
    const warehouse = useLoaderData();

    console.log(warehouse);

    return (
        <div>
            <h1>A cool warehouse!</h1>
        </div>
    )
}

export default Warehouse;