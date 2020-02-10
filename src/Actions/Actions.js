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
  handleUpdate = (id,user_name,user_email) => {
    Axios.post('http://localhost/php-react/update-user.php', {
      id: id,
      user_name: user_name,
      user_email: user_email
    }).then(({data})=>{
      if (data.success === 1) {
        let users = this.state.users.map(user => {
          if(user.id === id) {
              user.user_name = user_name;
              user.user_email = user_email;
              user.isEditing = false;
              return user;
            }
            return user;
          }
        );
        this.setState({
          users
        });
      };
    })
    .catch(error => {
      console.log(error);
    });
  }
  handleDelete = (id) => {
    let deleteUser = this.state.users.filter(user => {
      return user.id !== id;
    });
    Axios.post('http://localhost/php-react/delete-user.php', {
      id: id
    })
    .then(({ data }) => {
      if (data.success === 1) {
        this.setState({
          users: deleteUser
        });
      } else {
        alert(data.msg);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  insertUser = (event, user_name, user_email) => {
    event.preventDefault();
    event.persist();
    Axios.post('http://localhost/php-react/add-user.php', {
      user_name: user_name,
      user_email: user_email
    })
    .then(function({ data }) {
      if (data.success === 1) {
        this.setState({
          users: [
            { "id": data.id, "user_name": user_name, "user_email": user_email },
            ...this.state.users
          ]
        });
          event.target.reset();
      }else {
        alert(data.msg);
      }
    }.bind(this))
    .catch(function(error) {
      console.log(error);
    });
  }
}
export default Actions;