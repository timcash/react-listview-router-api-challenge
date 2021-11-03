import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import './ReviewItem.css'

const fetchCommentsForItem = async itemId => {
  const response = await fetch(`/api/comments?itemId=${itemId}`)

  if (response.status !== 200) {
    const text = await response.text()
    throw new Error(text)
  }

  return await response.json()
}

const ReviewItem = ({ }) => {
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [itemId, setItemId] = useState(params.itemId)

  useEffect(() => { fetchComments() }, [itemId])

  const fetchComments = async () => {
    setLoading(true)

    try {
      const fetchComments = await fetchCommentsForItem(itemId)
      setLoading(false)
      setComments(fetchComments)
    } catch (err) {
      setLoading(false)
      setComments([])
      console.error(err)
    }
  }

  return (
    <div className="item">
      <h3>Item {itemId}:</h3>
      <div className="item__stage-area">
        {itemId}
      </div>
      <div className="item__comment-area">
        <h3>Comments:</h3>
        {loading && <div className="comments__loading">Loading...</div>}
        {!loading && comments.map(comment => (<div className="comment" key={comment.id}>
          <h3>{comment.id}</h3>
          <div>{comment.text}</div>
          <div>{comment.userId}</div></div>)
        )}
      </div>
    </div>
  )
}

export default ReviewItem
