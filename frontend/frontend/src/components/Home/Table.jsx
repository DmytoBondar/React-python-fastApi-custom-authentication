import React, { useContext, useEffect, useState } from 'react';
// import { mockComponent } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { UserContext } from '../Context/UserContext';
// import Home from '../Home/Home';

const Table = () => {
    const [token] = useContext(UserContext);
    const [lead, setLeads] = useState(null);
    // const [error, setError] = useState("");
    // const [id, setId] = useState(null);
    // const [activeModal, setActiveModal] = useState(false);

    // const handleUpdate = async (id) => {
        // setId(id);
        // setActiveModal(true);
    // }
    // const handleDelete = async () => {
        // const requestOptions = {
        //     method: "DELETE",
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: "Bearer" + token,
        //     },
        // }
        // const response = await fetch(`/api/leads/${id}`, requestOptions)
        // if (!response.ok) {
        //     setError("Falided happed")
        // }
        // else {
        //     getLeads();
        //     console.log("succefully delete")
        // }
    // }

    useEffect(() => {
        const getLeads = async () => {
            const requestHeader = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer" + token,
                }
            }
            const response = await fetch("/api/leads", requestHeader);
            if (!response.ok) {
                // setError("Something went wrong on getLeads function")
            }
            else {
                const data = await response.json();
                setLeads(data);
            }
        }
        getLeads();
    }, [])

    // const handleModal = () => {
        // setActiveModal(!activeModal)
        // getLeads();
        // setId(null);
    // }
    return (
        <>
            {/* <Home
                active={activeModal}
                handleModal={handleModal}
                token={token}
                id={id}
                setError={setError}
            /> */}
            {/* <button onClick={setActiveModal(true)}>Create a Lead</button> */}

            {lead ? (
                <></>
                // lead.map((item, id) => (
                //     <url key={ id}>
                //         <li>{item.first_name}</li>
                //         <li>{item.last_name}</li>
                //         <li>{item.company}</li>
                //         <li>{item.email}</li>
                //         <li>{item.note}</li>
                //         {/* // <li>{(item.date_last_updated).format("MMM Do YY")}</li> */}
                //         <button onClick={handleUpdate(lead.id)}> Update</button>
                //         <button onClick={handleDelete(lead.id)}> delete</button>
                //     </url>
                // ))
            ) : (
                <></>
            )}
        </>
    );
};

export default Table;