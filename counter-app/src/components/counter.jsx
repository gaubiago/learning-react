import React, { Component } from "react";

class Counter extends Component {
  render() {
    let isZero = (value) => value === 0;

    return (
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-1 d-flex justify-content-center">
            <span className={this.getBadgeClasses()}>
              {" "}
              {this.formatCount()}{" "}
            </span>
          </div>
          <div className="col">
            <button
              onClick={() => this.props.onIncrement(this.props.counter)}
              className="btn btn-secondary btn-sm"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => this.props.onDecrement(this.props.counter)}
              className="btn btn-secondary btn-sm ms-2"
              disabled={isZero(this.props.counter.value)}
            >
              -
            </button>
            <button
              onClick={() => this.props.onDelete(this.props.counter.id)}
              className="btn btn-danger btn-sm ms-2"
            >
              x
            </button>
          </div>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
