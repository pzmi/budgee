import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Panel, Table} from 'react-bootstrap'
import * as Transactions from '../../actions/transactions'

function lastTransactionTime(transactions) {
  if (transactions[transactions.length - 1] !== undefined) {
    return transactions[transactions.length - 1].transaction_time;
  } else {
    return "0";
  }
}

class UserTransactions extends React.Component {
  componentDidMount() {
    this.props.getLatestTransactions(this.props.match.params.user);
  }

  render() {
    return <div className="container">
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h1">
            Hello {this.props.match.params.user}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          Your balance is: {this.props.balance}
        </Panel.Body>
      </Panel>

      <Table striped bordered condensed hover responsive>
        <thead>
        <tr>
          <th>Transaction Time</th>
          <th>Details</th>
          <th>Description</th>
          <th>Value</th>
          <th>Tags</th>
        </tr>
        </thead>
        <tbody>
        {this.props.rows}
        </tbody>
      </Table>
      <Button onClick={() => this.props.getTransactionsFromTranscationTime(this.props.match.params.user, lastTransactionTime(this.props.transactions))}>Load more</Button>
    </div>
  }
}

function transactionToRow(transaction) {
  return <tr>
    <td>{transaction.transaction_time_date}</td>
    <td>{transaction.details}</td>
    <td>{transaction.description}</td>
    <td>{transaction.value}</td>
    <td>{transaction.tags}</td>
  </tr>;
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  rows: state.transactions.transactions.map(transactionToRow),
  balance: state.transactions.transactions[0] === undefined ? 0 : state.transactions.transactions[0].balance
});

const mapDispatchToProps = dispatch => bindActionCreators(Transactions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTransactions)
