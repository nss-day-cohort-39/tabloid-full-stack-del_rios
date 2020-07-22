import React, { useEffect, useContext, useState } from "react";
import { Button, Container, ListGroup, ListGroupItem, Toast, ToastBody, ToastHeader } from "reactstrap";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const UserProfileDetails = () => {
    const { id } = useParams();
    const { isLoggedIn, logout, editUserProfile, getUserProfileById } = useContext(UserProfileContext);
    const [userProfile, setUserProfile] = useState({ userType: "" });
    const [process, setProcess] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [initializeToast, setInitializeToast] = useState(false);
    const toggleToast = () => setShowToast(!showToast);
    const toggleInitializeToast = () => setInitializeToast(!showToast);
    let userTypeId = 0;
    let curretUserId = 0;

    if (isLoggedIn === true) {
        userTypeId = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;
        curretUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
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

    const deactivateUser = () => {
        toggleInitializeToast();
        toggleToast();
        const parsedId = +curretUserId;
        userProfile.isActive = false;
        editUserProfile(parsedId, userProfile).then(() => {
            getUserProfileById(userProfile.id).then((resp) => {
                debugger
                if (resp.id === parsedId) {
                    logout();
                } else {
                    setUserProfile(resp);
                }
            })
        })
    }

    const reactivateUser = () => {
        toggleInitializeToast();
        toggleToast();
        const parsedId = +id;
        userProfile.isActive = true;
        editUserProfile(parsedId, userProfile).then(() => {
            getUserProfileById(id).then(setUserProfile)
        })
    }

    const promoteUser = () => {
        toggleInitializeToast();
        toggleToast();
        const parsedId = +id;
        userProfile.userTypeId = 1;
        editUserProfile(parsedId, userProfile).then(() => {
            getUserProfileById(id).then(setUserProfile)
        })
    }

    const demoteUser = () => {
        toggleInitializeToast();
        toggleToast();
        const parsedId = +curretUserId;
        userProfile.userTypeId = 2;
        editUserProfile(parsedId, userProfile).then(() => {
            getUserProfileById(userProfile.id).then((resp) => {
                debugger
                if (resp.id === parsedId) {
                    logout();
                } else {
                    setUserProfile(resp);
                }
            })
        })
    }

    const invokeToast = (process) => {
        setProcess(process)
        toggleInitializeToast();
        toggleToast();
    }

    const toastRender = () => {
        return (
            <div className="p-3 my-2 rounded">
                <Toast isOpen={showToast}>
                    <ToastHeader className="bg-danger">
                        Warning
                    </ToastHeader>
                    <ToastBody>
                        Are you certain that you wish to {process} the user: {userProfile.displayName}
                    </ToastBody>
                    <div className="buttonContainer">
                        <Button onClick={() => {
                            toggleToast();
                            toggleInitializeToast();
                        }} color="primary">No, Cancel</Button>
                        {
                            (process === "deactivate")
                                ? <Button onClick={deactivateUser} color="danger">Yes, Deactivate {userProfile.displayName}</Button>
                                : ""
                        }
                        {
                            (process === "reactivate")
                                ? <Button onClick={reactivateUser} color="warning">Yes, Reactivate {userProfile.displayName}</Button>
                                : ""
                        }
                        {
                            (process === "promote")
                                ? <Button onClick={promoteUser} color="warning">Yes, Promote {userProfile.displayName}</Button>
                                : ""
                        }
                        {
                            (process === "demote")
                                ? <Button onClick={demoteUser} color="danger">Yes, Demote {userProfile.displayName}</Button>
                                : ""
                        }
                    </div>
                </Toast>
            </div>
        )
    }

    const userProfileTypeCheck = () => {
        if (userTypeId === 0) {
            return (
                <div>Loading</div>
            )
        } else if (userTypeId === 1) {
            return (
                <div className="col-sm-12 col-lg-6">
                    {
                        (initializeToast)
                            ? toastRender()
                            : ""
                    }
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
                        {
                            (userProfile.userTypeId === 1)
                                ? <Button color="primary" onClick={(e) => {
                                    e.preventDefault();
                                    invokeToast("demote");
                                }}>Demote to Author</Button>
                                : <Button color="primary" onClick={(e) => {
                                    e.preventDefault();
                                    invokeToast("promote");
                                }}>Promote to Admin</Button>
                        }
                        {
                            (userProfile.isActive === true)
                                ? <Button color="primary" onClick={(e) => {
                                    e.preventDefault();
                                    invokeToast("deactivate");
                                }}>Deactivate Account</Button>
                                : <Button color="primary" onClick={(e) => {
                                    e.preventDefault();
                                    invokeToast("reactivate");
                                }}>Reactivate Account</Button>
                        }
                        {
                            (userProfile.isActive === true)
                                ? <Button color="success" onClick={() => {
                                    history.push("/userprofiles");
                                }}>Return to User Profile List</Button>
                                : <Button color="success" onClick={() => {
                                    history.push("/userprofilesdeactivated");
                                }}>Return to Deactivated User Profile List</Button>
                        }
                    </div>
                </div>
            )
        } else if (userTypeId === 2) {
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