import React from "react";
import ReactDOM from "react-dom";
import CommunitySelect from "./CommunitySelect";
import { Formik } from "formik";
import uuid from "uuid";

import "./styles.css";

var Community = function(index) {
  this.index = index;
};

class App extends React.Component {
  state = {
    communities: []
  };

  handleAddCommunity = () => {
    let community = this.createCommunity();
    let { communities } = this.state;
    communities.push(community);
    this.setState({
      communities: communities
    });
  };

  handleRemoveCommunity = index => {
    this.setState(state => {
      let { communities } = state;
      communities.splice(index, 1);
      return {
        communities: communities
      };
    });
  };

  createCommunity = () => {
    let community = new Community(uuid.v4());
    return community;
  };

  render() {
    return (
      <div className="App">
        <h2>Formik + React-Select</h2>
        <Formik
          initialValues={{ ...this.state }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <button
                type="button"
                aria-pressed="false"
                onClick={() => this.handleAddCommunity()}
              >
                Add Community
              </button>
              {props.values.communities.map((community, i) => (
                <CommunitySelect
                  key={community.index}
                  arrayIndex={i}
                  community={community}
                  onRemove={() => this.handleRemoveCommunity(community.index)}
                  {...props}
                />
              ))}
              <div style={{ textAlign: "left", paddingTop: "20px" }}>
                <DebugFormikState {...props} />
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

const DebugFormikState = props => (
  <div style={{ margin: "1rem 0" }}>
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem"
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
