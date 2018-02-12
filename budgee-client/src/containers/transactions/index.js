import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, FormControl, Glyphicon, Panel, Table} from 'react-bootstrap'
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
    if (this.props.transactions.length <= 0) {
      this.props.getLatestTransactions(this.props.match.params.user);
    }
  }

  updateTags(transaction) {
    let tags = transaction.editedTags.split(",").map(t => t.trim());
    this.props.updateTags(this.props.match.params.user, transaction.transaction_time, {tags})
  }

  tags(transaction) {
    if (transaction.editable) {
      return <td>
        <div className="input-group" style={{whiteSpace: "nowrap"}}>
          <FormControl
            type="text"
            value={transaction.editedTags}
            onChange={e => this.props.tagsType(e.target.value)}
          />
          <Button onClick={() => this.updateTags(transaction)}><Glyphicon glyph="ok"/></Button>
        </div>
      </td>
    } else {
      return <td onClick={() =>
        this.props.tagsEditable(transaction.transaction_time)}>
        {transaction.tags.join(", ")}</td>
    }

  }

  transactionToRow(transaction) {
    return <tr>
      <td>{transaction.transaction_time_date}</td>
      <td>{transaction.details}</td>
      <td>{transaction.description}</td>
      <td>{transaction.value}</td>
      {this.tags(transaction)}
    </tr>;
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

      <Table striped bordered hover responsive>
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
        {this.props.transactions.map(t => this.transactionToRow(t))}
        </tbody>
      </Table>
      <Button block onClick={() => this.props.getTransactionsFromTranscationTime(this.props.match.params.user, lastTransactionTime(this.props.transactions))}>Load more</Button>
    </div>
  }
}

// function

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  balance: state.transactions.transactions[0] === undefined ? 0 : state.transactions.transactions[0].balance,
});

const mapDispatchToProps = dispatch => bindActionCreators(Transactions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTransactions)
