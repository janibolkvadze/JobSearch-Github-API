import React, { Component } from 'react'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'; // Para utilizar los html tags que vienen del API
import { connect } from 'react-redux';
import { saveJob } from '../store/actions/jobActions';
import { Row, Col, Button } from 'reactstrap';

class jobOffer extends Component {

    state = {
        loading: true,
        unsaved: true
    }

    saveJob = (id, title) => {
        this.props.saveJob({
            id: id,
            title: title
        });
        this.setState({
            unsaved: false
        })
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        // Axios request es un side effect, por eso lo hacemos dentro de componentDidMount
        axios.get(`https://jobs.github.com/positions/${id}.json`)
            .then(result => {
                this.setState({
                    loading: false,
                    ...result.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div style={{marginTop: 30}}>
                <Row>
                <Col md={9}>
                    <h1>{this.state.title}</h1>
                </Col>
                <Col md={3}>
                <Button outline={this.state.unsaved} color="info" style={{float: "right"}} onClick={() => this.saveJob(this.props.match.params, this.state.title)}>Save job</Button>
                </Col>
                </Row>
                <br />
                    {ReactHtmlParser(this.state.description)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    savedJobs: state.savedJobs
});


export default connect(mapStateToProps, {saveJob})(jobOffer);