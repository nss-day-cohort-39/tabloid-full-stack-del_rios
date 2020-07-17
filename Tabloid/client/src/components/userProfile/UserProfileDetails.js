import React, { useEffect, useContext, useState } from "react";
import { Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import { useParams, useHistory, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const UserProfileDetails = () => {
    const { id } = useParams();
    const { isLoggedIn } = useContext(UserProfileContext);
    const { getUserProfileById } = useContext(UserProfileContext);
    const [userProfile, setUserProfile] = useState({ userType: "" });
    let userTypeId = 0;

    if (isLoggedIn === true) {
        userTypeId = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;
    }

    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    useEffect(() => {
        const parsedId = +id;
        getUserProfileById(parsedId).then(setUserProfile);
    }, []);

    let formatedDate = "";

    if (userProfile.createDateTime != null) {
        const unformatedDate = userProfile.createDateTime.split("T")[0];
        const [year, month, day] = unformatedDate.split("-");
        formatedDate = month + "/" + day + "/" + year;
    }

    const userProfileTypeCheck = () => {
        if (userTypeId == 0) {
            return (
                <div>Loading</div>
            )
        } else if (userTypeId == 1) {
            return (
                <div className="col-sm-12 col-lg-6">
                    <ListGroup>
                        <ListGroupItem><p><strong>Display Name:</strong> {userProfile.displayName}</p></ListGroupItem>
                        <ListGroupItem className="avatarContainer">
                            {
                                (userProfile.imageLocation)
                                    ? <img className="userProfileAvatar" src={userProfile.imageLocation} alt="user avatar" />
                                    : ""
                            }
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                        <ListGroupItem className="userInfoContainer">
                            <p><strong>Name: </strong>{userProfile.fullName}</p>
                            <p><strong>Email: </strong>{userProfile.email}</p>
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                        <ListGroupItem className="userInfoContainer">
                            <p><strong>User Type: </strong>{userProfile.userType.name}</p>
                            <p><strong>Join Date: </strong>{formatedDate}</p>
                        </ListGroupItem>
                    </ListGroup>
                    <div className="buttonContainer">
                        <Button onClick={() => {
                            history.push("/userprofiles");
                        }}>Return to User Profile List</Button>
                    </div>
                </div>
            )
        } else if (userTypeId == 2) {
            return (
                <Redirect to="/" />
            )
        }
    }

    return (
        <Container>
            <div className="row justify-content-center">
                {userProfileTypeCheck()}
            </div>
        </Container>
    );
};