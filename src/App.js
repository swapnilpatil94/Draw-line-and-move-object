import React from 'react';
import logo from './logo.svg';
import './App.css';
import Immutable from 'immutable';
import src from './logo.svg';
var pathData;
var history = [Immutable.List([])];
var historyIndex = 0;
var clear = 0;

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      lines: new Immutable.List(),
      isDrawing: false,
      pathD: "M 300 150",
      style1: {
        display: " none"
      }

    };



    this.moving = React.createRef();



    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.getElementById("DrawAREA").addEventListener("mousedown", this.handleMouseDown)
    document.getElementById("DrawAREA").addEventListener("mousemove", this.handleMouseMove)
    // document.addEventListener("mouseup", this.handleMouseUp);
    document.getElementById("DrawAREA").addEventListener("mouseup", this.handleMouseUp)

  }

  componentWillUnmount() {

    // document.removeEventListener("mouseup", this.handleMouseUp);

    document.getElementById("DrawAREA").removeEventListener("mouseup", this.handleMouseUp)

  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button != 0) {
      return;
    }

    console.log("mouseDown")

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true

    }));

    // if (mouseup) {
    //   console.log("MOUSE IS Up")
    // }
    // console.log("LINES : ", this.state.lines)

    // console.log("mouse ", mouseEvent, mouseEvent.button, mouseEvent.buttons)

  }


  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }


  handleMouseUp() {
    this.setState({ isDrawing: false });
    document.getElementById("DrawAREA").removeEventListener("mousedown", this.handleMouseDown)
    document.getElementById("DrawAREA").removeEventListener("mousemove", this.handleMouseMove)


    console.log("mouseup")
    // document.removeEventListener("mousedown", () => { console.log("shoul reamoive") });


    this.setState({ pathD: `"` + pathData + `"` });
    // console.log("PATH : : ", pathData);
    // console.log("newpath", this.state.pathD)
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }



  startDrawing = () => {


    document.getElementById("DrawAREA").addEventListener("mousedown", this.handleMouseDown)
    document.getElementById("DrawAREA").addEventListener("mousemove", this.handleMouseMove)
    console.log("startDrawing");

    // this.handleMouseDown();
    // this.handleMouseMove()
  }



  clear = () => {

    // clear = 1;

    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".path"));

    this.setState({ pathD: "0" })


    // this.state.pathD = "M 0 0"
    this.setState({ pathD: "M0 0" })
    console.log("Path", this.state.pathD)


  }




  play = () => {

    if (clear == 1) {
      var pathNew = "M 0 0"
      this.setState({ pathD: pathNew })

      console.log("clear in IF play", this.state.pathD)
      let style = {
        // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
        // animation: "move 10s linear 0.5s 1 alternate ",
        // position: "absolute ",
        offsetPath: ` path( ${this.state.pathD} )`,
        display: " none"
      }
      this.setState({ style1: style })



      console.log("Path", this.state.pathD)

    } else {
      var style = {
        // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
        animation: "move 10s linear 0.5s 1 alternate ",
        position: "absolute ",
        offsetPath: ` path( ${this.state.pathD} )`,
        // animationIterationCount: 1,
        // offsetDistance: "-190 %"

      }
      console.log("clear in else play", this.state.pathD)

      this.setState({ style1: style })
      // to remove block
      setTimeout(() => {
        var style = {
          display: " none"
        }
        this.setState({ style1: style })
      }, 10960)


    }


  }


  Drawing = ({ lines }) => {



    return (
      <svg className="drawing">
        {lines.map((line, index) => (
          <this.DrawingLine key={index} line={line} />
        ))}

      </svg>
    );
  }

  DrawingLine = ({ line }) => {
    pathData = "M " +
      line
        .map(p => {

          return `${p.get('x')} ${p.get('y')}`;
        })
        .join(" L ");

    console.log("PATH : : ", pathData);


    return <path className="path" d={pathData} stroke="green" />;
  }




  render() {
    // .moving-element {
    //   offset-path: path('M 0 100 L 200 150 L 300 150');
    //   animation: move 4s ease-in-out infinite;
    // }

    // console.log("Path ", style)


    return (
      <div className="trace" >

        <section >
          <div
            id="DrawAREA"
            className="drawArea"
            ref="drawArea"
          // onMouseDown={this.handleMouseDown}
          // onMouseMove={this.handleMouseMove}
          >
            <this.Drawing lines={this.state.lines} />
          </div>
          <div class="moving-element" style={this.state.style1} ref={this.moving}> <img src="./play_tern_4.png" width="50" ></img></div>

        </section>
        <div id="buttons">

          <div id="blue">
            <div id="erase" onClick={this.clear}></div>

            <div id="draw" onClick={this.startDrawing}></div>
          </div>

          <div id="play" onClick={this.play}></div>


        </div>


      </div>

    );
  }
}

// ReactDOM.render(<DrawArea />, document.getElementById("container"));

export default App;