import React from 'react';
import '../App.css';
import TopHeader from '../Components/Header/TopHedaer'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'

library.add(faPhone, faEnvelope)
const Users = ()=> {
    return <div>    <TopHeader />

    <h1>Users account page</h1>
    </div>
}

export default Users;