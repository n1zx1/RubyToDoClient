import React, { Component } from 'react'
import './ComponentsStyle/Header.css'
import { Navbar, Container, Button } from 'react-bootstrap'
import './/ComponentsStyle/Header.css'
import { setCookie } from '../Connection/setCookie.js'
import swal from 'sweetalert';
import { sendRequest } from '../Connection/sendRequest'
import { LoadProjects } from '../App'


var parent
export default class Header extends Component {
    constructor(props) {
        super(props)
        parent = props.parent
    }
    render() {
        return (
            <>
                <Navbar fixedtop="true" collapseOnSelect expand="md" bg="danger" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <i className="fas fa-list-alt"></i>
                    Team ToDo List
                </Navbar.Brand>
                        <div className="headerButtons">
                            <Button inline="true" variant="light" onClick={addtodo}><i className="fas fa-plus"></i>Add Team</Button>
                            <Button inline="true" variant="light" onClick={userdedit}>Edit User</Button>
                            <Button inline="true" variant="light" onClick={userdelete}>Delete User</Button>
                            <Button inline="true" variant="light" onClick={exit}>Exit</Button>
                        </div>
                    </Container>
                </Navbar>
            </>
        );
    }
}

 


function userdedit() {
    swal(
        {
        text: "Введите ник юзера для его редактирования",
        content: {
            element:  "input",
            attributes: {placeholder: "Ivan"}
        },
        
        button: {
            text: "ОК",
            closeModal: true,
        }
        }        
    )
    .then((content) =>{
        if (content != null){
            swal({
                text: "Введите новый ник юзера",
                content: {
                    element: "input",
                    attributes: { placeholder: "Ivan" }
                },
            })
            .then((content) =>{
                if (content != null){
                    swal({
                        title: "Юзер был изменён",
                        icon: "success"
                    })
                }
                else{
                    alert('Введите ник!')
                }
                    
            }) 
        }
        else{
            alert('Введите ник!')
        }
            
    }) 
}     

function userdelete() {
    swal({
        text: "Введите ник юзера для его удаления",
        content: {
            element:  "input",
            attributes: {placeholder: "Ivan"}
        },
        button: {
            text: "ОК",
            closeModal: true,
        }
    })
    .then((content) =>{
        if (content != null){
            swal({
                title: "Юзер был удалён",
                icon: "success"
            })
        }
        else{
            alert('Введите ник!')
        }
            
    }) 
}     

function exit() {
    setCookie('token', '', {
        'max-age': -1
    })
    localStorage.clear()
    setCookie('isLogined', 'false')
    parent.setState({ logined: false })

}

function addtodo() {
    swal({
        text: "Введите название списка задач",
        content: {
            element:  "input",
            attributes: {placeholder: "Team A"}
        },
        button: {
            text: "ОК",
            closeModal: true,
        }
    })
        .then(text => {
            if (!text) {
                swal.close();
            }
            else {
                sendNewProject(text)
            }
        })
}

function sendNewProject(text) {
    sendRequest('POST', 'https://n1zx1.pythonanywhere.com/api/projects/', {
        'name': text
    })
        .then(() => {
            swal({
                title: "Проект был добавлен",
                icon: "success"
            })
            localStorage.setItem('isLoaded', 'false')
            LoadProjects(parent)
        })
}