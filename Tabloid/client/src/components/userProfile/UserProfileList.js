import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { UserProfile } from "./UserProfile";
import { UserProfileContext } from "../../providers/UserProfileProvider";



export const UserProfileList = () => {
    const { users, getAllUserProfiles } = useContext(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        getAllUserProfiles();
    }, []);

    const filteredUsers = users.filter(u => u.isActive === true);
    return (
        <div>
            <div className="buttonContainer">
                <Button color="primary" onClick={() => {
                    history.push("/userprofilesdeactivated");
                }}>View List of Deactivated Users</Button>
            </div>
            {
                filteredUsers.map(u => {
                    return <UserProfile key={u.id} userprofile={u} />
                })
            }
        </div>
    )
}
