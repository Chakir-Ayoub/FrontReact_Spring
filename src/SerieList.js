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
    
        const clientList = series.map(serie => {
            return <tr key={serie.id}>
                <td style={{whiteSpace: 'nowrap'}}>{serie.serieid}</td>
                <td>{serie.nom}</td>
                <td>
                    <ButtonGroup>
                        <a size="sm" color="primary" class="btn btn-primary" href={"/serie/" + serie.serieid}>Edit</a>
                        <Button size="sm" color="danger" onClick={() =>{this.remove(serie.serieid);  window.location.reload();}}>Delete</Button>
                    </ButtonGroup>
                </td>

            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <a size="sm" class="btn btn-success" tag={Link} href={"/series/new"}>Add serie</a>
                    </div>
                    <h3>series</h3>
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
export default SerieList;