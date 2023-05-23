import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class SerieEdit extends Component {
  emptyItem = {
    serieid: '',
    nom: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem,
      values: [],
      validationError: '',
      series: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const zones = await fetch('http://localhost:8080/ville')
    .then(res => res.json())
    .catch(error => console.error(error));

    this.setState({ zones });

    const { id } = this.props.match.params;

    if (id !== 'new') {
      const serieResponse = await fetch(`http://localhost:8080/serie/Byid/${id}`);
      const serie = await serieResponse.json();
      this.setState({ item: serie });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };
    item[name] = value;

    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
  
    await fetch('http://localhost:8080/serie' + (item.serieid ? '/' + item.serieid : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...item,
       // ville: JSON.parse(item.ville)
       ville: item.ville ? JSON.parse(item.ville) : null

      }),
    });
    this.props.history.push('/serie');
  }
  
  





  render() {
    const { item, values } = this.state;
    const title = <h2 style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}} >{item.serieid ? 'Edit serie' : 'Add serie'}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="nom" style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}} >Name</Label>
              <Input type="text" name="nom" id="nom" value={item.nom || ''}
                     onChange={this.handleChange} autoComplete="nom" />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" href="/serie">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(SerieEdit);
