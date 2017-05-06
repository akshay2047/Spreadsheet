// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import Banner from "./Banner";
import CellContainer from "./CellContainer";

type Props = {

}

type State = {
  loading: boolean
};

class App extends Component<any, Props, State> {
  constructor(props: Props, context: any){
    super(props, context);
    this.state = {
      loading: false
    };
  }

  state: State;

  componentWillMount(){

  }
  componentDidMount(){

  }

  render( ) {
    return (
      <div>
        <Banner ref="banner"/>
        <CellContainer/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

