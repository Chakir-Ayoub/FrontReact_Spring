import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ZoneList extends Component {

    constructor(props) {
        super(props);
        this.state = {zones: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/zone')
            .then(response => response.json())
            .then(data => this.setState({zones: data}));
    }
    async remove(id) {
        await fetch(`http://localhost:8080/zone/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedzones = [...this.state.zones].filter(i => i.id !== id);
            this.setState({zones: updatedzones});
        });
    }
    
    render() {
        const {zones, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const ZoneList = zones.map(zone => {
            return <tr key={zone.id}>
                <td style={{whiteSpace: 'nowrap'}}>{zone.zoneid}</td>
                <td>{zone.nom}</td>
                <td>{zone.ville.nom}</td>
                <td>
                    <ButtonGroup>
                        <a size="sm" color="primary" class="btn btn-primary" href={"/zones/" + zone.zoneid}>Edit</a>
                        <Button size="sm" color="danger" onClick={() =>{this.remove(zone.zoneid);  window.location.reload();}}>Delete</Button>
                    </ButtonGroup>
                </td>

            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <a size="sm" class="btn btn-success" tag={Link} href={"/zone/new"}>Add Zone</a>
                    </div>
                    <h3>zones</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">#</th>
                            <th width="30%">NAME</th>
                            <th width="30%">City</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ZoneList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default ZoneList;