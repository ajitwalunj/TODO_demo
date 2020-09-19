import React from "react";
import { saveToStorage, storedList } from '../util/localstorage';
import { Card, CardHeader, CardBody, CardTitle, Label, Input, Button, Row, Col, CardFooter, FormGroup, Table } from 'reactstrap';
import axios from 'axios';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            errmsg: '',
            successmsg: '',
            tasks: []
        };
    };

    componentDidMount = () => {
        if (!storedList('token')) this.generateToken();
        this.getAllTasks();
    };

    handleChange = (e) => {
        this.setState({ task: e.target.value.replace(/^\s+/g, '') });
    };

    addTask = () => {
        const state = this.state;
        if (!state.task) return this.setState({ errmsg: 'Please enter valid task.' }, () => setTimeout(this.clearMessage, 3000));
        axios.post('http://localhost:5000/api/task', { name: state.task }, { headers: { Authorization: storedList('token') } })
            .then(response => {
                this.getAllTasks();
                this.clearTextField();
                this.setState({ successmsg: response.data.message });
                setTimeout(this.clearMessage, 3000);
            }).catch(error => {
                this.setState({ errmsg: error.response.data.message });
                setTimeout(this.clearMessage, 3000);
            })
    };

    generateToken = () => {
        axios.post('http://localhost:5000/api/generate_token', { username: 'ajit_walunj' }, { headers: { Authorization: storedList('token') } })
            .then(response => {
                Object.keys(response.data).forEach(key => {
                    saveToStorage(key, response.data[key]);
                });
            }).catch(error => {
                this.setState({ errmsg: error.response.data.message });
                setTimeout(this.clearMessage, 3000);
            })
    };

    getAllTasks = () => {
        axios.get('http://localhost:5000/api/task', { headers: { Authorization: storedList('token') } })
            .then(response => {
                this.setState({ tasks: response.data });
            }).catch(error => {
                this.setState({ errmsg: error.response.data.message });
                setTimeout(this.clearMessage, 3000);
            })
    };

    deleteTask = (id) => {
        axios.delete(`http://localhost:5000/api/task?id=${id}`, { headers: { Authorization: storedList('token') } })
            .then(response => {
                this.getAllTasks();
                this.setState({ successmsg: response.data.message });
                setTimeout(this.clearMessage, 3000);
            }).catch(error => {
                this.setState({ errmsg: error.response.data.message });
                setTimeout(this.clearMessage, 3000);
            })
    };


    clearMessage = () => {
        this.setState({
            errmsg: '',
            successmsg: ''
        })
    }
    clearTextField = () => {
        this.setState({
            errmsg: '',
            successmsg: ''
        })
    }

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md='12'>
                            {this.state.errmsg ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}><b>Error : </b>{this.state.errmsg}</div> : null}
                            {this.state.successmsg ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px' }}><b>Success : </b>{this.state.successmsg}</div> : null}
                        </Col>
                        <Col md='6'>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag='h3'>Todo App</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Label>Task :</Label>
                                    <FormGroup>
                                        <Input
                                            placeholder='Please enter task'
                                            name='task'
                                            value={this.state.task}
                                            type='text'
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <Button color='success' onClick={this.addTask}>Add</Button>
                                </CardBody>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md='6'>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag='h3'>Added tasks :</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Sr.No.</th>
                                                <th>Task</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.tasks.length ? this.state.tasks.map((task, i) => {
                                                return <tr key={i} >
                                                    <th>{i + 1}</th>
                                                    <td>{task.name}</td>
                                                    <td><Button color='danger' onClick={() => this.deleteTask(task.id)} size='sm'>X</Button></td>
                                                </tr>
                                            }) : <tr >
                                                    <th>-</th>
                                                    <td>-</td>
                                                    <td>-</td>
                                                </tr>}
                                        </tbody>
                                    </Table >
                                </CardBody>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Todo;