import {useEffect, useState} from "react";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import UserView from "../../../models/UserView";
import {User} from "./cards/User";

export const ManageUsers = () => {

    const [users, setUsers] = useState<UserView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const baseUrl: string = "http://localhost:8080/api/admin/users/all";

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedUsers: UserView[] = [];

            for (const key in responseData) {
                loadedUsers.push({
                    userID: responseData[key].userID,
                    username: responseData[key].username,
                    password: responseData[key].password,
                    roleID: responseData[key].roleID,
                    card: Boolean(responseData[key].card),
                    fname: responseData[key].fname,
                    lname: responseData[key].lname,
                    address: responseData[key].address
                });
            }

            // Remove first user (guest user profile)
            loadedUsers.splice(0,1);

            setUsers(loadedUsers);
            setIsLoading(false);
        };
        fetchUsers().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}...</p>
            </div>
        )
    }

    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header'>
                    Registered Users
                </div>
                <div className='card-body'>
                    <div>
                        {users.length > 0 ?
                            <>
                                <div className='list-group'>
                                    {users.map((user, index) => (
                                        <User user={user} key={index}/>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                                <div className='m-5'>
                                    <h5>No users</h5>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};