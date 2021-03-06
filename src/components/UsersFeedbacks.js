import React from 'react';

import {connect} from 'react-redux';

import {
    Button, Glyphicon,
    Modal,
    Table
} from 'react-bootstrap';

import {
    displayAlert,
    setUsersFeedbacksIsLoad
} from "../actions/globalActions";

import {
    dismissFeedback,
    displayFeedback,
    setUsersFeedbacks
} from "../actions/feedbacksActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";
import FormControl from "react-bootstrap/es/FormControl";

class UsersFeedbacks extends React.Component {

    componentWillMount() {
        if (this.props.users_feedbacks_is_load === false) {
            this.getUserFeedbacks();
        }
    }

    getUserFeedbacks() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication(HttpMethods.GET, Paths.HOST + Paths.MOBILE_FEEDBACK, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {
                        if (me !== undefined) {
                            me.props.setUsersFeedbacks(response.data.feedbacks);
                            me.props.setUsersFeedbacksIsLoad();
                        }

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        if (me !== undefined) {
                            me.props.displayAlert({
                                alertTitle: Texts.ERREUR_TITRE.text_fr,
                                alertText: message
                            });
                        }
                    }
                } else {
                    console.log("hello");
                    if (me !== undefined) {
                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: Texts.ERR_RESEAU.text_fr
                        });
                    }
                }
            },
            function (error) {

                console.log(error);
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    handleFeedbackDismiss() {
        this.props.dismissFeedback();
    }

    handleFeedbackClick(item) {
        this.props.displayFeedback({
            isManager: false,
            feedback: item
        });
    }

    setCursor() {
        return {cursor: "pointer"};
    }

    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Nom de l'utilisateur</th>
                        <th>Login de l'utilisateur</th>
                        <th>Email de l'utilisateur</th>
                        <th>Nom de la salle</th>
                        <th>Version de l'application</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.users_feedbacks.map((item, index) => (
                            <tr style={this.setCursor()} onClick={this.handleFeedbackClick.bind(this, item)}>
                                <td>{item.user.first_name + " " + item.user.last_name}</td>
                                <td>{item.user.login}</td>
                                <td>{item.email}</td>
                                <td>{item.fitness_center.name + " (" + item.fitness_center.zip_code + ", " + item.fitness_center.city + ")"}</td>
                                <td>{item.version}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                {
                    this.props.showUserFeedback === true &&


                    <Modal show={this.props.showUserFeedback} bsSize={"medium"}
                           onHide={this.handleFeedbackDismiss.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"Feedback utilisateur: " + this.props.currentFeedback.user.login}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl.Static>
                                {this.props.currentFeedback.content}
                            </FormControl.Static>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleFeedbackDismiss.bind(this)}><Glyphicon
                                glyph="remove"/> {Texts.FERMER.text_fr}</Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users_feedbacks_is_load: state.global.users_feedbacks_is_load,

        users_feedbacks: state.feedbacks.users_feedbacks,
        showUserFeedback: state.feedbacks.showUserFeedback,
        currentFeedback: state.feedbacks.currentFeedback
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    setUsersFeedbacksIsLoad,
    setUsersFeedbacks,
    displayFeedback,
    dismissFeedback
})(UsersFeedbacks);