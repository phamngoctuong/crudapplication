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
  handleUpdate = (id, user_name, user_email) => {
    Axios.post('http://localhost/php-react/update-user.php', {
        id: id,
        user_name: user_name,
        user_email: user_email
      })
      .then(({ data }) => {
        if (data.success === 1) {
          let users = this.state.users.map(user => {
            if (user.id === id) {
              user.user_name = user_name;
              user.user_email = user_email;
              user.isEditing = false;
              return user;
            }
            return user;
          });
          this.setState({
            users
          });
        } else {
          alert(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
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