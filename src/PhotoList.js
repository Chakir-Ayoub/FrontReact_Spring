import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class photoList extends Component {

    constructor(props) {
        super(props);
        this.state = {photos: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/photo')
            .then(response => response.json())
            .then(data => this.setState({photos: data}));
    }
    async remove(id) {
        await fetch(`http://localhost:8080/photo/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedphotos = [...this.state.photos].filter(i => i.id !== id);
            this.setState({photos: updatedphotos});
        });
    }
    
    render() {
        const { photos, isLoading } = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const photoList = photos.map(photo => {
            return (
                <tr style={{borderBlockColor: 'black' }} key={photo.id}>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{photo.photoid}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{photo.url}   <img src={photo.url} alt="Photo" style={{ width: '10%', height: '100%' }} />
</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{photo.resto.nom}</td>
                    <td>
                        <ButtonGroup>
                            <a size="sm" color="primary" className="btn btn-primary" href={"/photo/" + photo.photoid}>Edit</a>
                            <Button size="sm" color="danger" onClick={() => { this.remove(photo.photoid); window.location.reload(); }}>Delete</Button>
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
                        <a size="sm" className="btn btn-success" tag={Link} href={"/photo/new"}>Add photo</a>
                    </div>
                    <Table className="mt-4" style={{ textAlign: 'center', color: 'black' }}>
                        <thead>
                            <tr>
                                <th width="30%" style={{ color: 'white' }}>#</th>
                                <th width="30%" style={{ color: 'white' }}>Url</th>
                                <th width="30%" style={{ color: 'white' }}>Resto</th>
                                <th width="40%" style={{ color: 'white' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {photoList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
    
}
export default photoList;