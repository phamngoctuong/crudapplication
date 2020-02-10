import React, { Component } from 'react';
import { Provider } from './Context';
import AllUsers from './components/GetUsers';
import Actions from './Actions/Actions';
class App extends Actions {
  render() {
    const contextValue = {
      all_users: this.state.users,
      get_users: this.fetchUsers,
      editMode: this.editMode,
      handleUpdate: this.handleUpdate
    }
    return (
      <Provider value={contextValue}>
        <div className="container-fluid bg-light">
          <div className="container p-5">
            <div className="card shadow-sm">
              <h1 className="card-header text-center text-uppercase text-muted">React PHP CRUD Application</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <form>
                      <div className="form-row">
                        <div className="form-group col-sm-6">
                          <label className="font-weight-bold">Name</label>
                          <input type="text" name="username" className="form-control" placeholder="Name" />
                        </div>
                        <div className="form-group col-sm-6">
                          <label className="font-weight-bold">Email</label>
                          <input type="email" name="useremail" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group col-sm-12 text-right">
                          <button type="submit" className="btn btn-primary">Add user</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-8">
                    <AllUsers/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}
export default App;