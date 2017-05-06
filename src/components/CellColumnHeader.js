// @flow
import React, { Component } from 'react';
import '../assets/css/CellColumnHeader.css';

type Props = {
  value: string,
  focus: boolean
};
type State = {
  focus: boolean
};
class CellColumnHeader extends Component<any, Props, State> {
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
      <div className={this.state.focus ? "cell-column-header focus" : "cell-column-header"}  onClick={this.OnCellClick}>
        {this.props.value}
      </div>
    );
  }
}

export default CellColumnHeader;
