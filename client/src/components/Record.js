import { Link } from "react-router-dom";

const Record = ({record,deleteRecord}) => (
    <tr>
        <td>{record.name}</td>
        <td>{record.position}</td>
        <td>{record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${record._id}`}>
                Edit
            </Link>
            <button
                className="btn btn-link"
                onClick={() => {
                    deleteRecord(record._id);
                }}
            >
               Delete 
            </button>
        </td>
    </tr>
);

export default Record;
