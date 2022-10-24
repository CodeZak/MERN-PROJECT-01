import React, { useEffect, useState } from "react";
import Record from "./Record";

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    async function getRecords() {
        const response = await fetch(`http://localhost:5000/record/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const records = await response.json();
        setRecords(records);
    }

    useEffect(() => {
        getRecords();
    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE",
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }
    console.log(records);

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => {
                        return (
                            <Record
                                record={record}
                                deleteRecord={deleteRecord}
                                key={record._id}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
