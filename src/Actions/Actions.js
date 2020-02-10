import React, { Component } from 'react';
import Axios from 'axios';
class Actions extends Component {
  state = {
    users: []
  }
  fetchUsers = () => {
    Axios.get('http://localhost/php-react/all-users.php')
      .then(({ data }) => {
        this.setState({
          users: data.users.reverse()
        })
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }
  editMode = (id) => {
    let users = this.state.users.map(user => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    this.setState({
      users
    });
  }
  cancelEdit = (id) => {
    let users = this.state.users.map(user => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user

    });
    this.setState({
      users
    });
  }
}
export default Actions;