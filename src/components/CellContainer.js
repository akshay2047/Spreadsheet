// @flow
import React, { Component } from 'react';
import '../assets/css/CellContainer.css';
import Cell from "./Cell";
import CellColumnHeader from "./CellColumnHeader";
import CellRowHeader from "./CellRowHeader";

type Props = {
};
type State = {
  alphabets: any,
  focusRow: number,
  focusColumn: number,
  noOfRows: number,
  noOfColumns: number
};
class CellContainer extends Component<any, Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);
    (this:any).setFocusCoordinates= this.setFocusCoordinates.bind(this);
    (this:any).shouldFocus= this.shouldFocus.bind(this);
  }
  // ********** class variables start **********
  state = {
    alphabets: ["A","B","C","D","E","F","G","H","I","J","K","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    focusRow: 0,
    focusColumn: 0,
    noOfRows: 0,
    noOfColumns: 0
  };
  // ********** class variables end **********

  componentWillMount(){
    const bodyWidth = document.body ? document.body.offsetWidth ? document.body.offsetWidth : 0 : 0;
    const bodyHeight = document.body ? document.body.offsetHeight ? document.body.offsetHeight : 0 : 0;
    const cellWidth = 80;
    const cellHeight = 25;
    const bannerHeight = bodyHeight * 0.1 ;
    let noOfColumns = bodyWidth/cellWidth;
    const noOfRows = (bodyHeight - bannerHeight - cellHeight) / cellHeight;

    this.setState({
      noOfColumns: noOfColumns -1,
      noOfRows: noOfRows
    });

  }

  setFocusCoordinates(x: number,y:number){
      this.setState({
        focusColumn: x,
        focusRow: y
      });
  }

  getRow(i: number, noOfCols: number): []{
    let dataCellContainer = [];
    for(let j=0; j<noOfCols; j++ ){
      dataCellContainer.push(<Cell focus={this.shouldFocus(j,i)} setFocusCoordinates={this.setFocusCoordinates} row={i} column={j} noOfRows={this.state.noOfRows} noOfColumns={this.state.noOfColumns} key={i+"_"+j}/>);
    }
    return dataCellContainer;
  }

  shouldFocus(x:number, y:number): boolean{
    if(this.state.focusColumn == x && this.state.focusRow == y){
      return true;
    }
    return false;
  }

  render() {
    let cellColumnHeaderContainer = [];
    let cellRowHeaderContainer = [];
    let dataCellContainer =[];

    for(let i=0; (i<this.state.noOfColumns && i<this.state.alphabets.length); i++){
      cellColumnHeaderContainer.push(
        <CellColumnHeader focus={this.state.focusColumn == i} key={i} value={this.state.alphabets[i]}/>
      );
    }

    for(let i=0; (i<=this.state.noOfRows+1); i++){
      cellRowHeaderContainer.push(
        <CellRowHeader focus={this.state.focusRow + 1 == i} key={i} value={i==0 ? " ": i}/>
      );
    }

    for(let i=0; (i<this.state.noOfRows); i++){
      dataCellContainer.push(
        <div key={i} className="data-cell-container-row">
          {this.getRow(i, this.state.noOfColumns)}
        </div>);
    }

    return (
      <div ref="container" className="cell-container">
        <div className="cell-row-header-container">
          {cellRowHeaderContainer}
        </div>
        <div className="right-container">
          <div className="cell-column-header-container">
            {cellColumnHeaderContainer}
          </div>
          <div className="data-cell-container">
            {dataCellContainer}
          </div>
        </div>
      </div>
    );
  }
}

export default CellContainer;
