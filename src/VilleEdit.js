import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class VilleEdit extends Component {

    emptyItem = {
        villeid: '',
        nom: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const ville = await (await fetch(`http://localhost:8080/ville/Byid/${this.props.match.params.id}`)).json();
            this.setState({item: ville});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('http://localhost:8080/ville' + (item.villeid ? '/' + item.villeid : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/villes');
    }

    render() {
        const {item} = this.state;
        const title = <h2 style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}} > {item.villeid ? 'Edit Ville' : 'Add Ville'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container >
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nom" style={{fontfamily: 'Arial', fontsize: '16px',fontweight: 'bold', color: '#fff',    backgroundcolor: '#f58220', padding: '10px',borderradius: '5px'}} >Name</Label>
                        <Input type="text" name="nom" id="nom" value={item.nom || ''}
                               onChange={this.handleChange} autoComplete="nom"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" >Save</Button>{' '}
                        <Button color="secondary" href={"/villes"}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(VilleEdit);