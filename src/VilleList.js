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
            return (
                <tr style={{borderBlockColor: 'black' }} key={ville.id} >
                    <td style={{whiteSpace: 'nowrap',color:'white'}}>{ville.villeid}</td>
                    <td style={{whiteSpace: 'nowrap',color:'white'}}>{ville.nom}</td>
                    <td>
                        <ButtonGroup>
                            <a size="sm" color="primary" className="btn btn-primary" href={"/villes/" + ville.villeid}>Edit</a>
                            <Button size="sm" color="danger" onClick={() =>{this.remove(ville.villeid);  window.location.reload();}}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });
    
        return (
            <div>
                <AppNavbar/>
                <div >
                        <a size="sm" className="btn btn-success" tag={Link} href={"/villes/new"}>Add Ville</a>
                    </div>
                <Container fluid className="d-flex justify-content-between align-items-center mt-5">

                    <Table class="mt-4" style={{textAlign:'center',color:'black'}}>
                        <thead>
                            <tr>
                                <th width="30%" style={{color:'white'}}>#</th>
                                <th width="30%" style={{color:'white'}}>NAME</th>
                                <th width="40%" style={{color:'white'}}>Actions</th>
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
