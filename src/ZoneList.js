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
        const { zones, isLoading } = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const zoneList = zones.map(zone => {
            return (
                <tr style={{borderBlockColor: 'black' }} key={zone.id}>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{zone.zoneid}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{zone.nom}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{zone.ville.nom}</td>
                    <td>
                        <ButtonGroup>
                            <a size="sm" color="primary" className="btn btn-primary" href={"/zone/" + zone.zoneid}>Edit</a>
                            <Button size="sm" color="danger" onClick={() => { this.remove(zone.zoneid); window.location.reload(); }}>Delete</Button>
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
                        <a size="sm" className="btn btn-success" tag={Link} href={"/zone/new"}>Add Zone</a>
                    </div>
                    <Table className="mt-4" style={{ textAlign: 'center', color: 'black' }}>
                        <thead>
                            <tr>
                                <th width="30%" style={{ color: 'white' }}>#</th>
                                <th width="30%" style={{ color: 'white' }}>NAME</th>
                                <th width="30%" style={{ color: 'white' }}>City</th>
                                <th width="40%" style={{ color: 'white' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zoneList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
    
}
export default ZoneList;