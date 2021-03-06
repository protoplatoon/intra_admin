import React from 'react';

import {connect} from 'react-redux';

import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    Tabs, Tab, Table
} from 'react-bootstrap';

import {
    displayAlert,
    dismissAlert,
    setManagersFeedbacksIsLoad
} from "../actions/globalActions";

import {
    setManagersFeedbacks
} from "../actions/feedbacksActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";
import HttpMethods from "../utils/HttpMethods";
import ManagersFeedbacks from "./ManagersFeedbacks";
import UsersFeedbacks from "./UsersFeedbacks";

class Feedbacks extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: "Managers"
        };
    }

    componentWillMount() {
        if (this.props.managers_is_load === false) {
            this.getManagers();
        }
        if (this.props.fitness_centers_is_load === false) {
            this.getFitnessCenters();
        }
    }

    handleSelect(key) {
        this.setState({
            key: key
        });
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }


    render() {
        return (
            <div>

                <Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
                    <Tab.Pane eventKey={"Managers"} title="Managers">
                        <ManagersFeedbacks/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"Users"} title="Users">
                        <UsersFeedbacks/>
                    </Tab.Pane>
                </Tabs>


                <Modal show={this.props.showAlert} bsSize={"small"} onHide={this.handleAlertDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.alertTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.props.alertText}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAlertDismiss.bind(this)}><Glyphicon
                            glyph="remove"/> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setManagersFeedbacksIsLoad,
    setManagersFeedbacks
})(Feedbacks);