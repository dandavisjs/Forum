import React, {useEffect,Fragment, useState} from 'react'

import { useParams, useHistory, Link} from "react-router-dom";
import { connect } from 'react-redux'
import { getPost } from '../../actions/post';
import Description from '../category/Description'
import { ArrowUp,ArrowDown } from 'react-feather';
import { Bold, Italic, Link as LinkIcon, Code} from 'react-feather';

import api from '../../utils/api'

const Post = ({ getPost, post: { post,loading  } }) => {
    const [edit,setEdit] = useState(false)
    const [postBody,setPostBody] = useState('')
    let history = useHistory();
    const { id } = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            try {
                getPost(id)
            }catch(err){
                console.log(err);
            }
        }
        fetchData()
    },[id])

    const toggleEdit = () => {
        edit === false ? setPostBody(post.body) : setPostBody('')
        setEdit(!edit)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatePost = await api.put(`/posts/${id}`, {
            body: postBody
        });
        history.go(0)
    };

    return loading || post === null ? (
        <span>LOADING</span>
    ) : (
        <Fragment>
            <div style={{display:'flex', flexDirection:'column', gap: 15}}>
                <div className="main-body" style={{display:'grid', gridTemplateColumns:'40px 1fr', gridGap:'10px'}}>
                    <div style={{backgroundColor:'#f0f2ff', display: 'flex', flexDirection:'column', alignItems:'center', paddingTop:8}}>
                        
                        <ArrowUp/>
                        •
                        <ArrowDown/>
                    </div>
                    <div>
                        <div style={{fontSize:'0.9rem', color:'#4c4d52'}}>Posted by <Link to={`/u/${post.author}`}>{post.author}</Link> • {post.created_at}</div>
                            <h3><Link to={`/posts/${id}`}>{post.title}</Link></h3>
                            {edit ? <textarea style={{width:"98%",}} value={postBody} onChange={(e) => {setPostBody(e.target.value)}}/> : <p>{post.body}</p>}
                            {edit ? <div style={{display:'flex', justifyContent:'flex-end'}}><button style={{color:'black',backgroundColor:'transparent ',border:'none'}} onClick={toggleEdit}>Cancel</button> <input type="submit" value="Edit" onClick={post.body === postBody ? toggleEdit :handleSubmit}/></div>:
                            <div>
                                <Link to={'/'}>Comments</Link>
                                <Link to={'/'}>Share</Link>
                                <Link to={'/'}>Save</Link>
                                <Link to={'/'} onClick={toggleEdit}>Edit</Link>
                            </div>}
                    </div>
                </div>
                <form >
                    <textarea style={{display: 'flex', minHeight: 80,  padding:0, height: 120,borderBottomLeftRadius:0, borderBottomRightRadius:0, width: '100%'}} name="comment-textarea" ></textarea>
                    <div className="textarea-buttons">
                        <div>
                            <Bold />
                            <Italic />
                            <LinkIcon />
                            <Code />
                        </div>
                        <input type="submit" value="Comment" />
                    </div>
                </form>
                <div>
                    <hr color="#E4E8FF" size="1"/>
                </div>
            </div>
            <div  className="sidebar"><Description/></div>
        </Fragment>
    )
}


const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);