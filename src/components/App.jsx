import { Component } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

import Styles from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    name: "",
    number: "",
    filter: "",
  };

  inputChangeName = (ev) => {
    this.setState({ name: ev.target.value });
  };
  inputChangeNumber = (ev) => {
    this.setState({ number: ev.target.value });
  };

  inputFilterName = (ev) => {
    this.setState({ filter: ev.target.value });
  };

  buttonAddContact = (ev) => {
    ev.preventDefault();
    console.log(this.state.name);
    if (this.state.contacts.find((obj) => obj.name === this.state.name)) {
      alert(this.state.name + " is already in contacts");
    } else {
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: prevState.name,
            number: prevState.number,
          },
        ],
        name: "",
        number: "",
      }));
    }
  };

  buttonDelete = (ev) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((obj) => obj.id !== ev.target.value),
    }));
  };

  render() {
    const options = {
      nameHandler: this.inputChangeName,
      numberHandler: this.inputChangeNumber,
      submitHandler: this.buttonAddContact,
    };

    return (
      <section className={Styles.section}>
        <div className={Styles.book}>
          <div className={Styles.leftPage}>
            <h1>Phonebook</h1>
            <ContactForm
              options={options}
              name={this.state.name}
              number={this.state.number}
            />
          </div>
          <div className={Styles.rightPage}>
            <h2>Contacts</h2>
            <ContactList
              allContact={this.state.contacts}
              filter={this.state.filter}
              filterFunc={this.inputFilterName}
              deleteFunc={this.buttonDelete}
            />
          </div>
        </div>
      </section>
    );
  }
}