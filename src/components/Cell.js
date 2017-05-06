// @flow
import React,{Component} from 'react';
import onClickOutside from 'react-onclickoutside';
import '../assets/css/Cell.css';

type Props = {
  row: number,
  column: number,
  setFocusCoordinates: any,
  focus: boolean,
  noOfRows: number,
  noOfColumns: number
};
type State = {
  focus: boolean,
  readOnly: boolean
};
class Cell extends Component<any, Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);
    (this:any).onCellClick = this.onCellClick.bind(this);
    (this:any).onCellFocus = this.onCellFocus.bind(this);
    (this:any).onCellBlur= this.onCellBlur.bind(this);
    (this:any).onCellDoubleClick= this.onCellDoubleClick.bind(this);
    (this:any).onCellKeyPress= this.onCellKeyPress.bind(this);
    (this:any).setFocusCoordinates= this.setFocusCoordinates.bind(this);

  }
  // ********** class variables start **********
  state = {
    focus: this.props.focus,
    readOnly: true
  };
  // ********** class variables end **********

  componentWillMount(){
  }
  componentDidMount(){
    if(this.state.focus){
      this.refs.cell.focus();
    }
  }
  componentWillReceiveProps(nextProps: any){
    if(this.state.focus != nextProps.focus){
      this.setState({
        focus: nextProps.focus
      });
      if(nextProps.focus){
        this.refs.cell.focus();
      }
    }
  }

  componentDidUpdate(){
  }

  handleClickOutside (){
    this.setState({focus: false, readOnly: true});
  }

  onCellClick(){

  }

  onCellBlur(){
    this.refs.cell.blur();
    this.setState({focus: false, readOnly: true});
  }
  setFocusCoordinates(x: number,y:number): any{
    if(x>=0 && y>=0 && x<this.props.noOfColumns && y < this.props.noOfRows){
      this.refs.cell.blur();
      this.setState({readOnly: true});
      this.props.setFocusCoordinates(x,y);
    }
  }
  onCellFocus(e:any) {
    let temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
    this.setState({focus: true});
    this.props.setFocusCoordinates(this.props.column, this.props.row);
  }
  onCellKeyPress(e: any){
    if(this.state.focus && this.state.readOnly){
      switch(e.key){
        case "Tab":
          // this.setFocusCoordinates(this.props.column + 1, this.props.row);
          // e.preventDefault();
          return;
        case "ArrowUp":
          this.setFocusCoordinates(this.props.column, this.props.row - 1);
          return;
        case "ArrowDown":
          this.setFocusCoordinates(this.props.column, this.props.row + 1);
          return;
        case "ArrowLeft":
          this.setFocusCoordinates(this.props.column - 1, this.props.row);
          return;
        case "ArrowRight":
          this.setFocusCoordinates(this.props.column + 1, this.props.row);
          return;
        case "Enter":
          this.setFocusCoordinates(this.props.column, this.props.row + 1);
          return;
        case "Delete":
          this.refs.cell.value = "";
          return;
        default:
          break;
      }
    }
    if(e.key == "Enter"){
      this.setFocusCoordinates(this.props.column, this.props.row + 1);
    }else if(e.key == "Tab"){
      this.setFocusCoordinates(this.props.column + 1, this.props.row);
      e.preventDefault();
    }if(e.shiftKey && e.key == "Tab"){
      this.setFocusCoordinates(this.props.column - 1, this.props.row);
      e.preventDefault();
    }
    else if((e.keyCode >=32 && e.keyCode <=111) || (e.keyCode>=186 && e.keyCode<=189)){
      if(this.state.readOnly){
        this.setState({readOnly: false});
        // this.refs.cell.value = this.refs.cell.value + e.key;
      }
    }

  }
  onCellDoubleClick(){
    if(this.state.focus){
      this.setState({readOnly: false});
    }
  }
  render() {
    return (
      <input type="text" className={this.state.focus? !this.state.readOnly ? "cell focus editable" : "cell focus": "cell"} ref="cell" onClick={this.onCellClick} onDoubleClick={this.onCellDoubleClick} onFocus={this.onCellFocus} onKeyDownCapture={this.onCellKeyPress} readOnly={this.state.readOnly}/>
    );
  }
}

export default onClickOutside(Cell);
