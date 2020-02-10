import React, { Component } from 'react';
import Axios from 'axios';
class Actions extends Component {
  state = {
    users: []
  }
  fetchUsers = () => {
    Axios.get('http://localhost/php-react/all-users.php')
    .then(({data})=>{
      this.setState({
        users: data.users.reverse()
      })
    })
    .catch(({error})=> {
        console.log(error);
    });
  }
}
export default Actions;