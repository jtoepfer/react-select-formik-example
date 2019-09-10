import React from "react";
import Select from "react-select";

export default class CommunitySelect extends React.Component {
  state = {
    communityList: []
  };

  componentDidMount() {
    fetch("data.json")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          communityList: data
        });
      });
  }

  handleCommunityChange = optn => {
    console.log(optn);
    const name = `communities[${this.props.arrayIndex}].communityId`;
    this.props.handleChange(name, optn.value);
  };

  render() {
    const { communityList } = this.state || [];
    const { arrayIndex } = this.props || [];
    return (
      <div className="selector">
        <label htmlFor="community">Community:</label>{" "}
        <Select
          name={`communities[${arrayIndex}].communityId`}
          onChange={this.handleCommunityChange}
          options={communityList}
        />
        <button type="button" onClick={this.props.onRemove}>
          Remove
        </button>
      </div>
    );
  }
}
