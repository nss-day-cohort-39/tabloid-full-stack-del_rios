import React, { useContext, useEffect, useState } from "react";
import { UserProfile } from "./UserProfile";
import { UserProfileContext } from "../../providers/UserProfileProvider";



export const UserProfileList = () => {

    const { users, setUsers, getAllUserProfiles } = useContext(UserProfileContext)

    useEffect(() => {
        getAllUserProfiles();
    }, []);



    return (
        <div> {users.map(u => {
            return <UserProfile key={u.id} userprofile={u} />
        })}
        </div>
    )
}
