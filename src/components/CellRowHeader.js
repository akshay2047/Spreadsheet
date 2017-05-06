// @flow
import React, { Component } from 'react';
import '../assets/css/CellRowHeader.css';

type Props = {
  value: string,
  focus: boolean
};
type State = {
  focus: boolean
};
class CellRowHeader extends Component<any, Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);
    (this:any).OnCellClick = this.OnCellClick.bind(this);
  }
  // ********** class variables start **********
  state = {
    focus: this.props.focus
  };
  // ********** class variables end **********

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps: any){
    if(nextProps.focus!= this.state.focus){
      this.setState({
        focus: nextProps.focus
      });
    }
  }

  componentDidUpdate(){
  }

  OnCellClick(){
  }

  render() {
    return (
      <div className={this.props.value === " " ? "cell-row-header first" : this.state.focus ? "cell-row-header focus" : "cell-row-header"}  onClick={this.OnCellClick}>
        {this.props.value}
      </div>
    );
  }
}

export default CellRowHeader;
