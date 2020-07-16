import React from 'react';
import { Button } from "reactstrap";
import "./UserProfile.css"

import { useHistory } from "react-router-dom";


export const UserProfile = ({ userprofile }) => {
    const history = useHistory();

    const handleLink = () => { history.push(`/userprofiles/${userprofile.id}`); };
    return (
        <>
            <div className="userProfile">
                <div className="userprofile--userInfo">
                    <div> Display Name:{userprofile.displayName}</div>
                    <div> Name: {userprofile.firstName} {userprofile.lastName}</div>
                    <div> User Type: {(userprofile.userTypeId == 1) ? "admin" : "author"}</div>
                </div>
                <div className="userprofile--detailsButton">
                    <Button onClick={e => {
                        e.preventDefault();
                        handleLink();
                    }
                    }
                        color="primary">View Profile</Button>
                </div>
            </div>
        </>
    )

}