import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class RestoList extends Component {

    constructor(props) {
        super(props);
        this.state = {restos: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/resto')
            .then(response => response.json())
            .then(data => this.setState({restos: data}));
    }
    async remove(id) {
        await fetch(`http://localhost:8080/resto/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedrestos = [...this.state.restos].filter(i => i.id !== id);
            this.setState({restos: updatedrestos});
        });
    }
    
    render() {
        const {restos, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const clientList = restos.map(resto => {
            return <tr key={resto.id}>
                <td style={{whiteSpace: 'nowrap'}}>{resto.restoid}</td>
                <td>{resto.nom}</td>
                <td>{resto.adresse}</td>
                <td>{resto.zone.nom}</td>
                <td>{resto.zone.ville.nom}</td>
                <td>{resto.serie.nom}</td>
                <td>
                    <ButtonGroup>
                        <a size="sm" color="primary" class="btn btn-primary" href={"/resto/" + resto.restoid}>Edit</a>
                        <Button size="sm" color="danger" onClick={() =>{this.remove(resto.restoid);  window.location.reload();}}>Delete</Button>
                    </ButtonGroup>
                </td>

            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <a size="sm" class="btn btn-success" tag={Link} href={"/resto/new"}>Add resto</a>
                    </div>
                    <h3>restos</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">#</th>
                            <th width="30%">NAME</th>
                            <th width="30%">Adresse</th>
                            <th width="30%">Zone</th>
                            <th width="30%">City</th>
                            <th width="30%">Serie</th>
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
export default RestoList;