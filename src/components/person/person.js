import React, { Component } from 'react';

export default class Person extends Component {
  render() {
    const { person } = this.props;

    return (
      <tr>
        <td>{person.resultRating}</td>
        <td>{person.name}</td>
        <td>{person.hit}</td>
        <td>{person.speedFare}</td>
      </tr>
    );
  }
}
