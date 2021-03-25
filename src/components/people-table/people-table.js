import React from 'react';

import Person from '../person/person';

const PeopleTable = ({ peoples, sortBy }) => {
  console.log(peoples)
  const elements = peoples.map((item) => {
    const { resultRating } = item;

    return (
      <Person
        key={resultRating}
        id={resultRating}
        person={item}
      />
    );
  });

  return (
    <table className="highlight PeopleTable">
      <thead>
        <tr>
          <th onClick={() => sortBy('resultRating')}>Rating</th>
          <th onClick={() => sortBy('name')}>Name</th>
          <th onClick={() => sortBy('hit')}>Hit</th>
          <th onClick={() => sortBy('speedFare')}>Speed of fare</th>
        </tr>
      </thead>
      {elements}
    </table>
  );
};

export default PeopleTable;
