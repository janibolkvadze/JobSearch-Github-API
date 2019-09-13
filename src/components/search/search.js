import React from 'react';
import { Col, Row, Label, Button, Form, FormGroup, Input, Pagination, PaginationItem, PaginationLink, Spinner  } from 'reactstrap';
import axios from 'axios';
import Table from './table/table';
import './searchFilter.css';

export default class Search extends React.Component {
  state = {
    description: "",
    location: "",
    full_time: false,
    jobs: [],
    currentPage: 1,
    errorMessages: {
      description: {
        showing: false,
        message: "Please introduce an alphanumerical value"
      },
      location: {
        showing: false,
        message: "Please introduce an alphanumerical value"
      },
      full_time: {
        showing: false,
        message: "Please provide true of value"
      }
    }
  }


  onDescriptionUpdate(e) {
    if(e.target.value.trim() !== '' && typeof e.target.value === 'string') {
      this.setState({
        description: e.target.value
      });
      console.log(e.target.value.trim());
    }
    else {
      const errorMessages = {
        ...this.state.errorMessages
      }
      errorMessages['description']['showing'] = true;

      this.setState({
        ...this.state,
        errorMessages: errorMessages
      });
      e.target.style.border = "1px solid red";
    }
  }

  onLocationUpdate(e) {
    this.setState({
      location: e.target.value
    });
  }

  onFulltimeUpdate() {
    this.setState({
      full_time: !this.state.full_time
    });
  }

  prevPage() {
    this.setState({
      currentPage: this.state.currentPage - 1
    });
    this.onFormSubmit(undefined, this.state.currentPage - 1);
  }

  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
    this.onFormSubmit(undefined, this.state.currentPage + 1);
  }

  onFormSubmit(e, page = this.state.currentPage) {
    if(e){
      e.preventDefault();
    }

    this.setState({
      loading: true,
      jobs: []
    });
    
    const apiUrl = `https://jobs.github.com/positions.json?description=${this.state.description}&type=${this.state.full_time}&location=${this.state.location}&page=${page}`;
        axios.get(apiUrl)
            .then(result => {
              console.log(apiUrl);
              let jobsArray = [];
              result.data.map(job => {
                return jobsArray.push({
                  id: job.id,
                  title: job.title,
                  description: job.description,
                  location: job.location,
                  type: job.type,
                  company: job.company,
                  // created_at: new Date(job.created_at)
                  created_at: job.created_at
                })
              });
              this.setState({
                  jobs: jobsArray,
                  loading: false
              })
            })
            .catch(err => console.log(err));
  }

  errorMessage =(message) => {
    return <div style={{color: "red"}}>{message}</div>;
  } 


  render() {
    let jobsTable;
    let pagination;
    let prev = this.state.currentPage === 1 ? true: false;
    let next = this.state.jobs.length === 50 ? false: true;
    
    if(this.state.jobs.length !== 0) {
      jobsTable = <Table jobs={this.state.jobs} />
      pagination = (<Pagination size="md" style={{width: "100px", margin: "20px auto"}}>
      <PaginationItem disabled={prev}>
      <PaginationLink previous onClick={() => this.prevPage()}  />
      </PaginationItem>

      <PaginationItem disabled>
        <PaginationLink>
          {this.state.currentPage}
        </PaginationLink>
      </PaginationItem>

      <PaginationItem disabled={next}>
        <PaginationLink next onClick={() => this.nextPage()} />
      </PaginationItem>
    </Pagination>);
    }

    return (
      <div className="searchFilter">

        <div className="filters">
      <Form>
        <Row form>
            <Col lg="4">
              <FormGroup style={{margin: 0}}>
                <Input placeholder="description" value={this.state.description} onChange={this.onDescriptionUpdate.bind(this)} type="text" name="description" id="description"/>{' '}
                {this.state.errorMessages.description.showing ? this.errorMessage(this.state.errorMessages.description.message) : ""}

              </FormGroup>
            </Col>
            <Col lg="3">
              <FormGroup style={{margin: 0}}>
                <Input placeholder="location" value={this.state.location} onChange={this.onLocationUpdate.bind(this)}  type="text" name="state" id="location"/>{' '}
              </FormGroup>
            </Col>
            <Col lg="3">
            <FormGroup check inline style={{margin: 0}}>
              <Label check>
                <Input type="checkbox" onChange={this.onFulltimeUpdate.bind(this)} name="full_time" id="full_time" />{' '}
                Only full time jobs
              </Label>
            </FormGroup>
            </Col>
            <Col lg="2">
              <FormGroup style={{margin: 0}}>
              <Button color="info" style={{float: "right"}} onClick={this.onFormSubmit.bind(this)}>Find jobs</Button>
              </FormGroup>  
            </Col>
        </Row>
      </Form>
        </div>
                {this.state.loading ? <div style={{width: "100%", height: "60px", textAlign: "center"}}><Spinner color="info" /></div> : ""}
                  {jobsTable}
                    {pagination}
      </div>
    );
  }
}