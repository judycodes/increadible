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

  //PASS STATE TO EDIT REFLECTION
  handleEdit = (e) => {
    e.preventDefault();

    if(this.state.updatedReflection.subject !== '' || this.state.updatedReflection.tidbit !== '') {

    this.props.edit(this.state.updatedReflection, this.props.id);

    this.setState({
      editMode : false
    })

  } else {
    alert("No changes were made.");
  }

  }

  //TOGGLES EDIT FORM
  editModeActivated = () => {

    this.setState({
      editMode: !this.state.editMode
    })

  }

  //INPUT ONCHANGE FROM REFLECTION FORM FOR SUBJECT
  handleSubjectInputChange = (e) => {

    e.preventDefault();

    if(e.target.value.trim() !== ''){
      this.setState({
        updatedReflection: {
          subject: e.target.value.trim(),
          tidbit: this.state.updatedReflection.tidbit
        }
      })
    } else {
      alert("Please give your reflection a title.");

      this.setState({
        updatedReflection: {
          subject: this.props.subject,
          tidbit: this.props.tidbit
        }
      })
    }


  }

  //INPUT ONCHANGE FROM REFLECTION FORM FOR TIDBIT
  handleTidbitInputChange = (e) => {

    e.preventDefault();

    if(e.target.value.trim() !== ''){
      this.setState({
        updatedReflection: {
          subject: this.state.updatedReflection.subject,
          tidbit: e.target.value.trim()
        }
      })
    } else {
      alert("Please do not leave your reflection empty.");

      this.setState({
        updatedReflection: {
          subject: this.props.subject,
          tidbit: this.props.tidbit
        }
    })
  }
  }

  render(){

    let reflection;

    if(this.state.editMode){
      reflection = (
        <div>
        <form id="edit_reflection_form" onSubmit = {this.handleEdit}>
            <input
                id = "edit_subject"
                name = "subject"
                type = "text"
                placeholder = {this.props.subject}
                defaultValue = {this.props.subject}
                onChange = {this.handleSubjectInputChange}/>
            <textarea
                id = "edit_tidbit"
                rows="10" cols="20"
                maxLength="250"
                name = "tidbit"
                type = "text"
                placeholder = {this.props.tidbit}
                defaultValue = {this.props.tidbit}
                onChange = {this.handleTidbitInputChange}/>

            <div className="btns_sidebyside">
              <button className="blue_btn" onClick={this.editModeActivated} type="button">cancel</button>
              <button className="white_btn" type="submit">update</button>
            </div>

        </form>
      </div>)
    } else {
      reflection = (
        <div className="reflection_content">


          <div className="reflection_text">
            <h2 className="reflection_subject">{this.props.subject}</h2>

            <p className="reflection_tidbit">{this.props.tidbit}</p>
          </div>


          <div className="btns_stacked">

            <button className="edit_btn" onClick={this.editModeActivated} type="submit"><i className="far fa-edit"></i></button>
            <button className="delete_btn" onClick={this.props.delete} type="button"><i className="fas fa-trash-alt"></i></button>

          </div>

        </div>
      )
    }

    return reflection;
  }
}

export default Reflection;
