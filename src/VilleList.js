import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class VilleList extends Component {

    constructor(props) {
        super(props);
        this.state = {villes: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/ville')
            .then(response => response.json())
            .then(data => this.setState({villes: data}));
    }
    async remove(id) {
        await fetch(`http://localhost:8080/ville/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedvilles = [...this.state.villes].filter(i => i.id !== id);
            this.setState({villes: updatedvilles});
        });
    }
    
    render() {
        const {villes, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const clientList = villes.map(ville => {
            return <tr key={ville.id}>
                <td style={{whiteSpace: 'nowrap'}}>{ville.villeid}</td>
                <td>{ville.nom}</td>
                <td>
                    <ButtonGroup>
                        <a size="sm" color="primary" class="btn btn-primary" href={"/villes/" + ville.villeid}>Edit</a>
                        <Button size="sm" color="danger" onClick={() =>{this.remove(ville.villeid);  window.location.reload();}}>Delete</Button>
                    </ButtonGroup>
                </td>

            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <a size="sm" class="btn btn-success" tag={Link} href={"/villes/new"}>Add Ville</a>
                    </div>
                    <h3>villes</h3>
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
export default VilleList;