import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";



export default class table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      count: 0,
      isUnSorted: true,
    };
    this.count = 0;
    this.handleTableSort = this.handleTableSort.bind(this);
  }

  componentWillMount() {
    this.setState({
      columns: [
        {
          name: 'Title',
          selector: 'title',
          sortable: true,
        },
        {
          name: 'Location',
          selector: 'location',
          sortable: true,
        },
        {
          name: 'Type',
          selector: 'type',
          sortable: false,
        },
        {
          name: 'Created at',
          selector: 'created_at',
          sortable: true,
        },
        {
          name: 'Company',
          selector: 'company',
          sortable: true,
        },
      ],
      data: this.props.jobs
    })
  }

  

  handleTableSort = (column, sortDirection) => {
    console.log(column, sortDirection)
    if(this.state.count === 3) {
      this.setState({
        count: 0,
        isUnSorted: true,
      })
    } else {
      this.setState((prevState) => ({
        count: prevState.count + 1,
        isUnSorted: false
      }));
    }
  }
    render() {
      const handleChange = (state) => {
        const rowId = state.id;
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        window.location.href = `/job-offer/${rowId}`;
      };
        return (
          <div>
            {!this.state.isUnSorted && (
                    <DataTable className="table table-bordered"
                      columns={this.state.columns}
                      data={this.state.data}
                      onRowClicked ={handleChange}
                      onSort={this.handleTableSort}
                    />
                  )}
                  {this.state.isUnSorted && (
                    <DataTable className="table table-bordered"
                      columns={this.state.columns}
                      data={this.state.data}
                      onRowClicked ={handleChange}
                      onSort={this.handleTableSort}
                    />
                  )}
          </div>
        )
    }
}
