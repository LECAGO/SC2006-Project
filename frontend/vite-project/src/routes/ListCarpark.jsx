import "./ListCarpark.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import CarparkBasic from "../components/CarparkBasic";

function ListCarpark() {
    return (
        <div className="container mt-4">
            <div className="row border-bottom border-dark py-3">
                <CarparkBasic
                    name="Hall 13 NTU"
                    address="308 Negra Aroyo Lane Alberqueque New Mexico"
                    distance="6.90"
                    availability="69"
                    totalslot="420"
                />
            </div>
            <div className="row border-bottom border-dark py-3">
                <CarparkBasic
                    name="Hall 14 NTU"
                    address="308 Negra Aroyo Lane Alberqueque New Mexico"
                    distance="6.90"
                    availability="69"
                    totalslot="420"
                />
            </div>
        </div>
    )
}

export default ListCarpark;