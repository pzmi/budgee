import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Col, FormControl, FormGroup, Glyphicon, Panel, Row, Table} from 'react-bootstrap'
import * as Transactions from '../../actions/transactions'
import {actions, Control, Form} from "react-redux-form";
import Grid from "react-bootstrap/es/Grid";

function lastTransactionTime(transactions) {
  if (transactions[transactions.length - 1] !== undefined) {
    return transactions[transactions.length - 1].transaction_time;
  } else {
    return "0";
  }
}

function tagsToArray(tags) {
  return tags.split(",").map(t => t.trim());
}

class UserTransactions extends React.Component {
  componentDidMount() {
    if (this.props.transactions.length <= 0) {
      this.props.getLatestTransactions(this.props.match.params.user);
    }
  }

  handleAdd(transaction) {
    this.props.reset();
    this.props.addTransaction(this.props.match.params.user,
      {
        ...transaction,
        tags: tagsToArray(transaction.tags),
        transaction_time: new Date(transaction.transaction_time),
        value: transaction.value * 100
      });
  }

  updateTags(transaction) {
    let tags = tagsToArray(transaction.editedTags);
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
      <td>{new Date(transaction.transaction_time_date).toLocaleString()}</td>
      <td>{transaction.details}</td>
      <td>{transaction.description}</td>
      <td>{transaction.value}</td>
      {this.tags(transaction)}
    </tr>;
  }

  handleShowFrom(showFrom) {
    let date = new Date(showFrom.date);
    date.setDate(date.getDate() + 1);
    this.props.getTransactionsFromDate(this.props.match.params.user, date);
  }

  static today() {
    let now = new Date();
    let month = (now.getMonth() + 1);
    let day = now.getDate();
    if (month < 10)
      month = "0" + month;
    if (day < 10)
      day = "0" + day;
    return now.getFullYear() + '-' + month + '-' + day;
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

          <Grid>
            <Row>
              <Col md={8}>
                Transactions from:
                <Form className="form-inline" model="showFrom" onSubmit={(d) => this.handleShowFrom(d)}>

                  <FormGroup
                    horizontal="true"
                    controlId="showFrom.date"
                    validationState={null}>
                    <Control model="showFrom.date" placeholder="From"
                             defaultValue={UserTransactions.today()}
                             component={FormControl} type="date"/>
                  </FormGroup>
                  <Button type="submit">
                    Show
                  </Button>

                </Form>
              </Col>
              <Col className="balance" md={4}>
                Your balance is: <strong>{this.props.balance}</strong>
              </Col>
            </Row>
          </Grid>

        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Heading>
          Add new transaction
        </Panel.Heading>
        <Panel.Body>
          <Grid>
            <Row>
              <Form className="form-inline" model="transactionForm" onSubmit={(t) => this.handleAdd(t)}>
                <Col md={2}>
                <FormGroup
                  horizontal="true"
                  controlId="transaction.transaction_time"
                  validationState={null}>
                  <Control model="transactionForm.transaction_time" placeholder="Transaction time"
                           component={FormControl} type="datetime-local"/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup
                  horizontal="true"
                  controlId="transaction.details"
                  validationState={null}>
                  <Control model="transactionForm.details" placeholder="Details"
                           component={FormControl} type="text"/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup
                  horizontal="true"
                  controlId="transaction.description"
                  validationState={null}>
                  <Control model="transactionForm.description" placeholder="Description"
                           component={FormControl} type="text"/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup
                  horizontal="true"
                  controlId="transaction.value"
                  validationState={null}>
                  <Control model="transactionForm.value" placeholder="Value"
                           component={FormControl} type="number" step="0.01"/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup
                  horizontal="true"
                  controlId="transaction.tags"
                  validationState={null}>
                  <Control model="transactionForm.tags" placeholder="Tags"
                           component={FormControl} type="text"/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <Button type="submit">
                  Add
                </Button>
                </Col>
              </Form>
            </Row>
          </Grid>
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
      <Button block
              onClick={() => this.props.getTransactionsFromTranscationTime(this.props.match.params.user, lastTransactionTime(this.props.transactions))}>Load
        more</Button>
    </div>
  }
}

function valueWithMinorPart(t) {
  return {...t, value: roundTo2Decimal(t.value)};
}

function roundTo2Decimal(v) {
  return Math.round((v / 100) * 100) / 100;
}

function calculateBalance(state) {
  let balance = state.transactions.transactions[0] === undefined ? 0 : state.transactions.transactions[0].balance;
  return roundTo2Decimal(balance);
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions.map(valueWithMinorPart),
  balance: calculateBalance(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...Transactions,
  reset: () => actions.reset("transactionForm")
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTransactions)
