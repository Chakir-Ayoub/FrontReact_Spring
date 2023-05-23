import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class RestoList extends Component {
  constructor(props) {
    super(props);
    this.state = { restos: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('http://localhost:8080/resto')
      .then(response => response.json())
      .then(data => this.setState({ restos: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/resto/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedRestos = [...this.state.restos].filter(i => i.id !== id);
      this.setState({ restos: updatedRestos });
    });
  }

  render() {
    const { restos, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const restoList = restos.map(resto => (
      <tr style={{borderBlockColor: 'black' }} key={resto.id}>
        <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{resto.restoid}</td>
        <td style={{ color: 'white' }}>{resto.nom}</td>
        <td style={{ color: 'white' }}>{resto.adresse}</td>
        <td style={{ color: 'white' }}>{resto.zone.nom}</td>
        <td style={{ color: 'white' }}>{resto.zone.ville.nom}</td>
        <td style={{ color: 'white' }}>{resto.serie.nom}</td>
        <td>
          <ButtonGroup>
            <a size="sm" color="primary" className="btn btn-primary" href={`/resto/${resto.restoid}`}>Edit</a>
            <Button size="sm" color="danger" onClick={() => { this.remove(resto.restoid); window.location.reload(); }}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <a size="sm" className="btn btn-success" tag={Link} href="/resto/new">Add resto</a>
          </div>
          <Table className="mt-4" style={{ color: 'black' }}>
            <thead>
              <tr>
                <th width="30%" style={{ color: 'white' }}>#</th>
                <th width="30%" style={{ color: 'white' }}>Name</th>
                <th width="30% " style={{ color: 'white' }}>Address</th>
                <th width="30%" style={{ color: 'white' }}>Zone</th>
                <th width="30%" style={{ color: 'white' }}>City</th>
                <th width="30%" style={{ color: 'white' }}>Serie</th>
                <th width="40%" style={{ color: 'white' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restoList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default RestoList;
