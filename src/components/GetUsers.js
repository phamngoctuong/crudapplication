import React, { Component } from 'react';
import { AppContext } from '../Context';
class GetUsers extends Component {
  static contextType = AppContext;
  componentDidMount() {
    this.context.get_users()
  }
  render() {
    let allusers;
    allusers = this.context.all_users.map((user,index)=>{
      return (
        <tr key={index}>
          <td>{user.user_name}</td>
          <td>{user.user_email}</td>
          <td>
            <button className="btn btn-dark mr-2">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      )
    })
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allusers}
        </tbody>
      </table>
    );
  }
}
export default GetUsers;
