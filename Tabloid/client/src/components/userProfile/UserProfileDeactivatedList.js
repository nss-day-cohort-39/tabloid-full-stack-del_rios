import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { UserProfile } from "./UserProfile";
import { UserProfileContext } from "../../providers/UserProfileProvider";



export const UserProfileDeactivatedList = () => {
    const { users, getAllUserProfiles } = useContext(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        getAllUserProfiles();
    }, []);

    const filteredUsers = users.filter(u => u.isActive == false);

    return (
        <div>
            <div className="buttonContainer">
                <Button color="primary" onClick={() => {
                    history.push("/userprofiles");
                }}>View List of Active Users</Button>
            </div>
            {
                filteredUsers.map(u => {
                    return <UserProfile key={u.id} userprofile={u} />
                })
            }
        </div>
    )
}
