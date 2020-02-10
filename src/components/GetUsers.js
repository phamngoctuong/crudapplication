import React, { Component } from 'react';
import { AppContext } from '../Context';
class GetUsers extends Component {
  static contextType = AppContext;
  componentDidMount() {
    this.context.get_users()
  }
  handleUpdate = (id) => {
    this.context.handleUpdate(id,this.name.value,this.email.value);
  }
  render() {
    let allUsers;
    allUsers = this.context.all_users.map(({ id, user_name, user_email, isEditing }) => {
    return isEditing === true ?
      (
        <tr key={id}>
          <td>
            <input className="form-control" type="text" ref={(item)=>this.name = item} defaultValue={user_name}/>
          </td>
          <td>
            <input className="form-control" type="email" ref={(item)=>this.email = item} defaultValue={user_email}/>
          </td>
          <td>
            <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(id)}>Save</button>
            <button className="btn btn-light" onClick={() => this.context.cancelEdit(id)}>Cancel</button>
          </td>
        </tr>
      )
      : 
      (
        <tr key={id}>
          <td>{user_name}</td>
          <td>{user_email}</td>
          <td>
            <button className="btn btn-dark mr-2" onClick={() => this.context.editMode(id)}>Edit</button>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });
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
          {allUsers}
        </tbody>
      </table>
    );
  }
}
export default GetUsers;
