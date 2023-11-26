import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteUser, fetchUsers, updateUser } from '../../store/reducers/user';

export default function Home() {
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState({
        active: false,
        user: {}
    })

    const users = useSelector((state) => state.users?.users)
    const loading = useSelector((state) => state.users?.loading)

    useEffect(() => {
        dispatch(fetchUsers(1))
    }, [])

    const handlePageChange = (page) => {
        if (page?.url) {
            const numPage = page?.url?.split('=')[1]
            dispatch(fetchUsers(numPage))
        }
    }

    const actionUpdateUser = (user) => {
        const payload = {
            ...user,
            name: isEdit.user?.name,
            current_page: users?.current_page ?? 1
        }
        dispatch(updateUser(payload))
        setTimeout(() => {
            dispatch(fetchUsers(users.current_page))
        }, 1000)
        setIsEdit({
            active: false,
            user: {}
        })
    }

    const editUpdateUser = (user) => {
        setIsEdit({
            active: true,
            user
        })
    }

    const handleChange = (e) => {
        setIsEdit({
            active: true,
            user: {
                ...isEdit.user,
                name: e.target.value
            }
        })
    };

    const actionDeleteUser = (userId) => {
        dispatch(deleteUser(userId))
        setTimeout(() => {
            dispatch(fetchUsers(users.current_page))
        }, 1000)
    }

    return (
        <div className='container min-h-screen mx-auto flex flex-row justify-center items-start'>
            <div className='flex flex-col gap-4 my-auto'>
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className='border border-slate-600 px-4 py-2'>No</th>
                            <th className='border border-slate-600 px-4 py-2'>Name</th>
                            <th className='border border-slate-600 px-4 py-2'>Email</th>
                            <th className='border border-slate-600 px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users?.data?.map((user, i) => (
                            <tr key={user?.id}>
                                <td className='border border-slate-600 px-4 py-2'>{ i + 1 }</td>
                                <td className='border border-slate-600 px-4 py-2'>
                                    { isEdit.active && isEdit.user?.id == user?.id ? (
                                        <input className='rounded-md py-2 px-2 bg-slate-200' onChange={handleChange} placeholder={user?.name} />
                                    ) :  <p>{ user?.name }</p> } 
                                </td>
                                <td className='border border-slate-600 px-4 py-2'>{ user?.email }</td>
                                <td className='border border-slate-600 px-4 py-2'>
                                    <div className='flex flex-row gap-4'>
                                        { isEdit.active && isEdit.user?.id == user?.id ? (
                                            <button disabled={loading} onClick={() => actionUpdateUser(user)} className={`px-4 py-2 ${loading ? 'bg-slate-600' : 'bg-blue-600'} rounded-md text-white`}>Update</button>
                                        ) : (
                                            <button disabled={loading} onClick={() => editUpdateUser(user)} className={`px-4 py-2 ${loading ? 'bg-slate-600' : 'bg-green-600'} rounded-md text-white`}>Edit</button>
                                        )  }
                                        <button disabled={loading} onClick={() => actionDeleteUser(user.id)} className={`px-4 py-2 ${loading ? 'bg-slate-600' : 'bg-red-600'} rounded-md text-white`}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
                <div className='flex flex-row gap-2'>
                    {users?.links?.map((page, i) => {
                        return (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded-md bg-slate-300`}
                                onClick={() => handlePageChange(page)}
                                disabled={page.active}
                            >
                                {page?.label == '&laquo; Previous' ? 'Previous' : page?.label == 'Next &raquo;' ? 'Next' : page?.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

