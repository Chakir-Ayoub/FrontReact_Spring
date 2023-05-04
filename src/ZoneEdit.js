import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';


var values;
fetch('http://localhost:8080/ville')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        values = json;
 
    });
class ZoneEdit extends Component {

    emptyItem = {
        zoneid: '',
        nom: '',
        ville:''
    };
    
    state = {
        currencies: [],
        selectedUser : "",
        validationError : ""
      }

        constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const zone = await (await fetch(`http://localhost:8080/zone/Byid/${this.props.match.params.id}`)).json();
            this.setState({item: zone});
        }
    }

  



    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('http://localhost:8080/zone' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('http://localhost:8080/zone');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.zoneid ? 'Edit Zone' : 'Add Zone'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    
                    <FormGroup>
                        <Label for="nom">Name</Label>
                        <Input type="text" name="nom" id="nom" value={item.nom || ''}
                               onChange={this.handleChange} autoComplete="nom"/>

                      <FormGroup>
                      <div>
  <label htmlFor="options">Choose an option:</label>
  <select id="ville-select" name="ville" onChange={this.handleChange} autoComplete="ville">
    {values?.map((ville) => (
      <option key={ville.id} value={ville.nom}>
        {ville.nom}
      </option>
    ))}
  </select>
</div>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" href={"/zone"}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(ZoneEdit);