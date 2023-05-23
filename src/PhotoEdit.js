import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class photoEdit extends Component {
  emptyItem = {
    photoid: '',
    url: '',
    resto: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem,
      values: [],
      validationError: '',
      photos: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const photos = await fetch('http://localhost:8080/resto')
    .then(res => res.json())
    .catch(error => console.error(error));

    this.setState({ photos });

    const { id } = this.props.match.params;

    if (id !== 'new') {
      const photoResponse = await fetch(`http://localhost:8080/photo/Byid/${id}`);
      const photo = await photoResponse.json();
      this.setState({ item: photo });
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
  
    await fetch('http://localhost:8080/photo' + (item.photoid ? '/' + item.photoid : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...item,
       // resto: JSON.parse(item.resto)
       resto: item.resto ? JSON.parse(item.resto) : null

      }),
    });
    this.props.history.push('/photo');
  }
  
  


  render() {
    const { item, values } = this.state;
    const title = <h2 style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}} >{item.photoid ? 'Edit photo' : 'Add photo'}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="url" style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}} >Name</Label>
              <Input type="text" name="url" id="url" value={item.url || ''} onChange={this.handleChange} autoComplete="url" />
            </FormGroup>
            <FormGroup>
              <Label for="resto" style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}}>City</Label>
              <select id="resto-select" name="resto" className="custom-select" style={{width:'100%'}}  onChange={this.handleChange}>
                {this.state.photos.map((resto) => (
                  <option key={resto.id} value={JSON.stringify(resto)}>{resto.nom}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" href="/photo">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(photoEdit);
