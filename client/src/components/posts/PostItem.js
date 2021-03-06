import React from 'react'
import {Link} from 'react-router-dom'
import { ArrowUp,ArrowDown } from 'react-feather';

export default function PostItem({post: {id,title,body,created_at,author}}) {
    
    return (
        <div className="post main-body" style={{display:'grid', gridTemplateColumns:'40px 1fr', gridGap:'10px'}}>
            <div style={{backgroundColor:'#f0f2ff', display: 'flex', flexDirection:'column', alignItems:'center', paddingTop:8}}>
                
                <ArrowUp/>
                •
                <ArrowDown/>
            </div>
            <div>
                <div style={{fontSize:'0.9rem', color:'#4c4d52'}}>Posted by <Link to={`/u/${author}`}>{author}</Link> • {created_at}</div>
                    <h3><Link to={`/posts/${id}`}>{title}</Link></h3>
                    <p>{body}</p>
                    <div>
                        
                        <Link to={'/'}>Comments</Link>
                        <Link to={'/'}>Share</Link>
                        <Link to={'/'}>Save</Link>
                    </div>
            </div>
        </div>
            
    )
}
