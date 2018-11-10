import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium from 'radium';

class App extends Component {
  state = {
    persons: [
      { id: 'a1', name: 'Pedro', age: 30 },
      { id: 'a2', name: 'Jasmin', age: 20 },
      { id: 'a3', name: 'Jose', age: 29 },
      { id: 'a4', name: 'Carla', age: 19 }
    ],
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  nameChangedHandle = (event, id) => {
    //get the personIndexer
    const personIndex = this.state.persons.findIndex(f => { return f.id === id })

    //create a copy of the person using the index
    const person = { ...this.state.persons[personIndex] };

    //update the name of the person
    person.name = event.target.value;

    //create a copy of the persons
    const persons = [...this.state.persons];

    //update the person in the array
    persons[personIndex] = person;

    //update the react state
    this.setState({ persons: persons })



  }

  togglePersonsHandle = () => {
    const doesShowPersons = this.state.showPersons;
    this.setState({ showPersons: !doesShowPersons });

  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      border: '1px solid gray',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color:'black'
      }
    }

    let personsCpt = null;

    if (this.state.showPersons) {
      personsCpt = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandle(event, person.id)} />
            })}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color:'black'
      }
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a react App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandle}>Toggle Persons</button>
        {personsCpt}
      </div>
    );
  }
}

export default Radium(App);
