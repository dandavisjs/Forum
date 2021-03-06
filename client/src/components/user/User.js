import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../actions/profile' 

const User =({match,getUser,loading, profile}) => {
    useEffect(()=>{
        getUser(match.params.username)
    },[])
    
    return loading || profile === null ? (
        <span>LOADING</span>
    ) : (
        <div>
            <span>test</span> 
            <h2>{profile.user_name}</h2>
        </div>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth,
    profile: state.profile.profile
});

export default connect(mapStateToProps, { getUser })(User);