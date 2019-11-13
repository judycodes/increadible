import React, { Component } from 'react';

class Reflection extends Component {
  constructor(props){
    super(props);

    this.state = {
      editMode: false,
      updatedReflection: {
        subject: this.props.subject,
        tidbit: this.props.tidbit
      }
    }
  }

  handleEdit = (e) => {
    e.preventDefault();

    if(this.state.updatedReflection.subject !== '' || this.state.updatedReflection.tidbit !== '') {
    this.props.edit(this.state.updatedReflection, this.props.id);

    console.log(this.state.updatedReflection, "updatedReflection submitted");

    this.setState({
      editMode : false
    })

  } else {
    alert("No edits made.");
  }

  }

  editModeActivated = () => {

    this.setState({
      editMode: !this.state.editMode
    })

    // console.log(this.state.editMode, "edit Mode changed");
  }

  handleSubjectInputChange = (e) => {

    e.preventDefault();

    this.setState({
      updatedReflection: {
        subject: e.target.value,
        tidbit: this.state.updatedReflection.tidbit
      }
    })

  }

  handleTidbitInputChange = (e) => {

  e.preventDefault();

    this.setState({
      updatedReflection: {
        subject: this.state.updatedReflection.subject,
        tidbit: e.target.value
      }
    })

  }

  render(){

    let reflection;

    if(this.state.editMode){
      reflection = (
        <div>
        <form id="edit_reflection_form" onSubmit = {this.handleEdit}>
            <input
                name = "subject"
                type = "text"
                placeholder = {this.props.subject}
                defaultValue = {this.props.subject}
                onChange = {this.handleSubjectInputChange}/>
            <textarea
                rows="10" cols="20"
                name = "tidbit"
                type = "text"
                placeholder = {this.props.tidbit}
                defaultValue = {this.props.tidbit}
                onChange = {this.handleTidbitInputChange}/>

            <div className="btns_sidebyside">
              <button type="submit">Save</button>
              <button onClick={this.editModeActivated}>Cancel</button>
            </div>

        </form>
      </div>)
    } else {
      reflection = (
        <div className="reflection_content">


          <div className="reflection_subject">
            <h3>{this.props.subject}</h3>
          </div>

          <div className="reflection_tidbit">
            <p>{this.props.tidbit}</p>
          </div>


          <div className="btns_stacked">

            <button onClick={this.editModeActivated}>edit</button>
            <button onClick={this.handleDelete}>delete</button>

          </div>

        </div>
      )
    }

    return reflection;
  }
}

export default Reflection;
