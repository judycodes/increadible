import React, { Component } from 'react';

class Reflection extends Component {
  constructor(props){
    super(props);

    this.state = {
      editMode: false,
      updatedReflection: {
        subject: this.props.subject,
        tidbit: this.props.tidbit
      },
      reflectionSubject: this.props.reflectionSubject,
      reflectionTidbit: this.props.reflectionTidbit

    }
  }

  handleEdit = (e) => {
    e.preventDefault();

    this.props.edit(this.state.updatedReflection, this.props.id);

    this.setState({
      editMode : false
    })

  }

  editModeActivated = () => {

    this.setState({
      editMode: !this.state.editMode
    })

    // console.log(this.state.editMode, "edit Mode changed");
  }

  handleInputChange = (e) => {

      this.setState({
        [e.target.name] : e.target.value
      })

  }

  render(){
    console.log(this.props.subject, "subject");
    console.log(this.props.tidbit, "tidbit");

    let reflection;

    if(this.state.editMode){
      reflection = (
        <div>
        <form id="edit_reflection_form" onSubmit = {this.handleEdit}>
            <input
                name = "updatedReflectionSubject"
                type = "text"
                placeholder = {this.props.subject}
                value = {this.state.updatedReflectionSubject || ''}
                onChange = {this.handleInputChange}/>
            <textarea
                rows="10" cols="20"
                name = "updatedReflectionTidbit"
                type = "text"
                placeholder = {this.props.tidbit}
                value = {this.state.courseCode}
                onChange = {this.handleInputChange}/>

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
