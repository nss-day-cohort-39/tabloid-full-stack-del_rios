import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    ListGroupItem,
    Label,
    Input,
    Button,
    Toast, ToastBody, ToastHeader,
} from "reactstrap";
import { ReactionContext } from "../../providers/ReactionProvider";

export const AddReactionForm = () => {
    const {reactions, addReaction, getAllReactions, deleteReaction  } = useContext(ReactionContext);
    const [formState, setformState] = useState();
    const [showToast, setShowToast] = useState(false);
    const [reaction, setReaction] = useState();
    const toggleToast = () => setShowToast(!showToast);

    const handleUserInput = (e) => {
        const updatedState = { ...formState }
        updatedState[e.target.id] = e.target.value
        setformState(updatedState)
    }

    useEffect(() => {
        getAllReactions();
    }, []);

   
    const cancelForm = () => { 
        document.getElementById("addReactionForm").reset();
      }

      const deleteRe = (e) => {
        e.preventDefault();
     deleteReaction(reaction.id).then(toggleToast)
      };

    const submit = (e) => {
        e.preventDefault()
        addReaction(formState).then(()=>{
            cancelForm()
        }) };
       
    return (
        <div className="container pt-4">
        <div className="row justify-content-center">
            <ListGroupItem className="addReactions">
              <div >
              {reactions.map(r => <img className= "reaction" src={r.imageLocation} key={r.id}
                 onClick={ evt => {
                evt.preventDefault();
                setReaction(r);
                toggleToast();
                 }}>
               </img>)}
             </div>
            </ListGroupItem>
        <div className="p-3 my-2 rounded">
            <Toast isOpen={showToast}>
              <ToastHeader className="bg-danger">
                Warning
              </ToastHeader>
              <ToastBody>
                 Delete the Reaction? <strong>{(!reaction) ? null :reaction.name}</strong>
              </ToastBody>
              <div className="buttonContainer">
                <Button onClick={toggleToast} color="primary">No, Cancel</Button><Button onClick={deleteRe} color="danger">Yes, Delete Reaction</Button>
              </div>
            </Toast>
          </div>
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form onSubmit={submit} id="addReactionForm">
                            <FormGroup>
                                <Label for="imageLocation">Image URL</Label>
                                <Input
                                    id="imageLocation"
                                    type="url"
                                    required
                                    onChange={handleUserInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Reaction Name</Label>
                                <Input id="name" onChange={handleUserInput} required />
                            </FormGroup>
                            <div className="buttonContainer">
                                <Button color="info" type="submit">
                                    Add Reaction
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};