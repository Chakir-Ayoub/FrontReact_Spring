import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class SpecialiteListe extends Component {

    constructor(props) {
        super(props);
        this.state = {specialites: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/specialite')
            .then(response => response.json())
            .then(data => this.setState({specialites: data}));
    }
    async remove(id) {
        await fetch(`http://localhost:8080/specialite/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedspecialites = [...this.state.specialites].filter(i => i.id !== id);
            this.setState({specialites: updatedspecialites});
        });
    }
    
    render() {
        const { specialites, isLoading } = this.state;
      
        if (isLoading) {
          return <p>Loading...</p>;
        }
      
        const specialiteList = specialites.map(specialite => {
          return (
            <tr style={{borderBlockColor: 'black' }} key={specialite.id}>
              <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{specialite.specialiteid}</td>
              <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{specialite.nom}</td>
              <td>
                <ButtonGroup>
                  <a size="sm" color="primary" className="btn btn-primary" href={"/specialite/" + specialite.specialiteid}>Edit</a>
                  <Button size="sm" color="danger" onClick={() => { this.remove(specialite.specialiteid); window.location.reload(); }}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        });
      
        return (
          <div>
            <AppNavbar />
            <Container fluid>
              <div className="float-right">
                <a size="sm" className="btn btn-success" tag={Link} href={"/specialite/new"}>Add Specialite</a>
              </div>
              <Table className="mt-4" style={{ textAlign: 'center', color: 'black' }}>
                <thead>
                  <tr>
                    <th width="30%" style={{ color: 'white' }}>#</th>
                    <th width="30%" style={{ color: 'white' }}>NAME</th>
                    <th width="40%" style={{ color: 'white' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {specialiteList}
                </tbody>
              </Table>
            </Container>
          </div>
        );
      }
      
}
export default SpecialiteListe;