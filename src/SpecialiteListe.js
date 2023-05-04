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
        const {specialites, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const clientList = specialites.map(specialite => {
            return <tr key={specialite.id}>
                <td style={{whiteSpace: 'nowrap'}}>{specialite.specialiteid}</td>
                <td>{specialite.nom}</td>
                <td>
                    <ButtonGroup>
                        <a size="sm" color="primary" class="btn btn-primary" href={"/specialite/" + specialite.specialiteid}>Edit</a>
                        <Button size="sm" color="danger" onClick={() =>{this.remove(specialite.specialiteid);  window.location.reload();}}>Delete</Button>
                    </ButtonGroup>
                </td>

            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <a size="sm" class="btn btn-success" tag={Link} href={"/specialites/new"}>Add specialite</a>
                    </div>
                    <h3>specialites</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">#</th>
                            <th width="30%">NAME</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default SpecialiteListe;