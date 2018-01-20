import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Jumbotron} from 'react-bootstrap'
import {decrement, decrementAsync, increment, incrementAsync} from '../../modules/counter'
import {LinkContainer} from "react-router-bootstrap";

const Home = props => (
    <Jumbotron>
        <div class="container">
            <h1>Home</h1>
            <p>Count: {props.count}</p>

            <p>
                <Button onClick={props.increment} disabled={props.isIncrementing}>Increment</Button>
                <Button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</Button>
            </p>

            <p>
                <Button onClick={props.decrement} disabled={props.isDecrementing}>Decrement</Button>
                <Button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</Button>
            </p>

            <p>
                <LinkContainer to="/about">
                    <Button>Go to about page via redux</Button>
                </LinkContainer>
            </p>
        </div>
    </Jumbotron>
);

const mapStateToProps = state => ({
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
