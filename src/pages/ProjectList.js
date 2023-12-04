import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import Swal from 'sweetalert2'
function ProjectList() {
    const [projectList, setProjectList] = useState([]);
    const [userList, setUserList] = useState([]);  // Separate state for user data
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const fetchData = async () => {
        try {
            const responseProject = await axios.get('http://192.168.1.16:8686/get-news.php');
            const responseUser = await axios.get('http://192.168.1.16:8686/get-users.php');

            setProjectList(responseProject.data);
            setUserList(responseUser.data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };
    useEffect(() => {
        // Fetch data on mount
        fetchData();

        // Set up an interval to fetch data every 3 seconds
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // The empty dependency array ensures the effect runs once on mount


    const handleLogout = () => {
        // You can implement your actual logout logic here
        console.log('Logout logic here');
        // Redirect to the home page after logout
        navigate('/');
    };
    //delete


    const handleDeleteRecord = async (id) => {
        try {
            const response = await fetch(`http://192.168.1.16:8686/delete_news.php/?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Additional headers if needed
                },
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa bản news Success!',
                    showConfirmButton: false,
                    timer: 2000
                })
                setMessage(data.message);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setMessage('An error occurred while processing your request.');
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <h2 className="text-center mt-3 mb-3">Project Manager</h2>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className="card">
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList.map((project, key) => (
                                    <tr key={key}>
                                        <td>{project.id}</td>
                                        <td>{project.title}</td>
                                        <td>{project.content}</td>
                                        <td>
                                            {/* <Link to={`/show/${project.id}`} className="btn btn-outline-info mx-1">
                                                Show
                                            </Link> */}
                                            <Link to={`/edit/${project.id}`} className="btn btn-outline-success mx-1">
                                                Edit
                                            </Link>
                                            {/* Add your delete logic here */}
                                            <button
                                                onClick={() => handleDeleteRecord(project.id)}
                                                className="btn btn-outline-danger mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h2 className="text-center mt-3 mb-3">User</h2>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>password</th>
                                    <th width="240px">role</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((project, key) => (
                                    <tr key={key}>
                                        <td>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.email}</td>
                                        <td>{project.password}</td>
                                        <td>{project.role}</td>
                                        <td>
                                            {/* <Link to={`/show/${project.id}`} className="btn btn-outline-info mx-1">
                                                Show
                                            </Link> */}
                                            <Link to={`/edit/${project.id}`} className="btn btn-outline-success mx-1">
                                                Edit
                                            </Link>
                                            {/* Add your delete logic here */}
                                            <button
                                                className="btn btn-outline-danger mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectList;
