import React, { Component } from 'react';
import { Button } from 'reactstrap'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { logs: [], loading: true };
  }

  componentDidMount() {
    this.populateLogsData();
  }

  renderLogsTable(logs) {
    const that = this;

    return (
      <div>
        <Button onClick={() => that.clearLogsData()}>Clear logs</Button>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log =>
              <tr key={log.creationDateTime}>
                <td>{log.creationDateTime}</td>
                <td>{log.message}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderLogsTable(this.state.logs);

    return (
      <div>
        <h1 id="tabelLabel" >Logs</h1>
        {contents}
      </div>
    );
  }

  async populateLogsData() {
    const response = await fetch('log');
    const data = await response.json();
    this.setState({ logs: data, loading: false });
  }

  async clearLogsData() {
    this.setState({ loading: true });

    const response = await fetch('log', {
      method: 'DELETE'
    });

    if(response.ok)
    {
      this.setState({ logs: [], loading: false });
    }
    else {
      alert("An error happened on attempt to clear logs.");

      await this.populateLogsData();
    }
  }
}
