import React, { Component, Children } from 'react';
import Autosuggest from 'react-autosuggest';
import {
  Container,
  Row,
  Col,
  Collapse,
  Card,
  CardDeck,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  CardText,
  TabContent, FormGroup,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Jumbotron
} from 'reactstrap';

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.


// Use your imagination to render suggestions.



class TeamSuggest extends Component {

  constructor() {
    super();
    this.state = {

    };
  }
  getSuggestionValue = (suggestion) => {
    var { TargetType } = this.props
    if (TargetType == 'team') {
      return suggestion.Name;
    }
    if (TargetType == 'event') {
      return suggestion.Title;
    }
    if (TargetType == 'venue') {
      return suggestion.Name;
    }


  }

  renderSuggestion = (suggestion) => {
    var { TargetType } = this.props
    if (TargetType == 'team') {
      return (
        <span>
          {suggestion.Name}
        </span>
      );
    }
    if (TargetType == 'event') {
      return (
        <span>
          {suggestion.Title}
        </span>
      );
    }
    if (TargetType == 'venue') {
      return (
        <span>
          {suggestion.Name}
        </span>
      );
    }

  }

  onChange = (event, { newValue }) => {
    this.props.onChangeTeam(newValue)
  };


  onSuggestionsFetchRequested = ({ value }) => {

  };

  onSuggestionsClearRequested = () => {
    this.props.onSuggestionsClearRequested()
  };

  onSuggestionSelected = (event, { suggestion }) => {
    var { TargetType } = this.props
    this.props.onSuggestionSelected(suggestion,TargetType);
  }

  render() {
    const { value, TargetType, children } = this.props;


    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: `Type ${TargetType}'s name`,
      value,
      onChange: this.onChange,
      className: "form-control"
    };

    // Finally, render it!
    return (
      <FormGroup row>
        <label className="col-md-3 col-form-label text-right">{TargetType ? TargetType[0].toUpperCase() + TargetType.slice(1) : ''}</label>
        <div className="col-md-6">
          <Autosuggest
            suggestions={this.props.teams.suggestionsTeam}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            onSuggestionSelected={this.onSuggestionSelected}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
          <br></br>
          {children}

        </div>
      </FormGroup >
    );
  }
}
export default TeamSuggest;
