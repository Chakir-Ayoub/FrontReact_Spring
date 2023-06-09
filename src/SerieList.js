import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class SerieList extends Component {

    constructor(props) {
        super(props);
        this.state = {series: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/serie')
            .then(response => response.json())
            .then(data => this.setState({series: data}));
    }

    async remove(id) {
        await fetch(`http://localhost:8080/serie/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedseries = [...this.state.series].filter(i => i.id !== id);
            this.setState({series: updatedseries});
        });
    }
    
    render() {
        const {series, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const serieList = series.map(serie => {
            return (
                <tr style={{borderBlockColor: 'black' }} key={serie.id}>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{serie.serieid}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{serie.nom}</td>
                    <td>
                        <ButtonGroup>
                            <a size="sm" color="primary" className="btn btn-primary" href={"/serie/" + serie.serieid}>Edit</a>
                            <Button size="sm" color="danger" onClick={() => { this.remove(serie.serieid); window.location.reload(); }}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <a size="sm" className="btn btn-success" style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}}  tag={Link} href={"/serie/new"}>Add serie</a>
                    </div>
                    <Table className="mt-4" style={{ textAlign: 'center', color: 'black' }}>
                        <thead>
                            <tr>
                                <th width="30%" style={{ color: 'white' }}>#</th>
                                <th width="30%" style={{ color: 'white' }}>Name</th>
                                <th width="40%" style={{ color: 'white' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serieList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default SerieList;
