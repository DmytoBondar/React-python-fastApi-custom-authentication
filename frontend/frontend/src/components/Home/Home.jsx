import React, { useContext,useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'

// active={activeModal}
// handleModal={handleModal}
// token={token}
// id={id}
// setError={setError}
const Home = ({ active, handleModal, token, id, setError }) => {
    const [value, setValue] = useState({firstName:"", lastName:"", company:"", email:"", note:""})
    // const [token] = useContext(UserContext)
    // console.log(token)

    useEffect(() => {
        const getLead = async () => {
            const requestHeader = {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer" + token,
                },
            };
            const response = await fetch(`/api/leads/${id}`, requestHeader);
            if (!response.ok) {
                setError("Error happend")
                console.log(Error)
            }
            else {
                const data = await response.json();
                console.log(data)
            }
        }
        if (id) {
            getLead();
        }
    }, [id, token])
    
    const hanldeCreatedLead = async (e) => {
        e.preventDefault();
        const requestHeader = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:"Bearer" +token
            },
            body: JSON.stringify({
                first_name: value.firstName,
                last_name: value.lastName,
                company: value.company,
                email: value.email,
                note: value.note
            })
            
        }
        const response = await fetch("api/leads", requestHeader);
        if (!response.ok) {
            console.log("okay happend")
        }
        else {
            console.log("succyfully created")
            handleModal();
        }

    }
    // const handleUpdateLead = async (e) => {
    //     e.preventDefault();
    //     const requestOptions = {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + token,
    //       },
    //       body: JSON.stringify({
    //         first_name: firstName,
    //         last_name: lastName,
    //         company: company,
    //         email: email,
    //         note: note,
    //       }),
    //     };
    //     const response = await fetch(`/api/leads/${id}`, requestOptions);
    //     if (!response.ok) {
    //       setErrorMessage("Something went wrong when updating lead");
    //     } else {
    //       cleanFormData();
    //       handleModal();
    //     }
    //   };
    return (
        <div>
            <h1>hellow world</h1>
        </div>
    )
}

export default Home
