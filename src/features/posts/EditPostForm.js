import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'

export const EditPostsForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(state =>
    state.post.find(post => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`qposts/${postId}`)
    }
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <lable htmlFor="postTitle">Post Title:</lable>
        <input 
          type="text" 
          id="postTitle" 
          name="postTitle" 
          placeholder="What's on your mind ?" 
          value={title} 
          onChange={onTitleChanged}
        />
        <lable htmlFor="postContent">Content:</lable>
        <input  
          id="postContent" 
          name="postContent" 
          value={content} 
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}