import { Container, Typography } from '@mui/material'
import Comment from './Comment'

interface CommentListProps{
    comments: Array<Object>
    activation: (comment: object) => boolean
    loadComments: () => Promise<void>,
    title: string
}

const CommentList:React.FC<CommentListProps> = ({
    comments,
    activation,
    loadComments,
    title
}) => {

  const commentFiltered = comments.length > 0 ? comments.filter(comment => activation(comment)) : []

  return (
    <>
      {commentFiltered.length > 0 ? (<>
        <Typography
          sx={{marginTop: 2}}
          variant='h5'
        >
          {title}
        </Typography>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {commentFiltered.map((comment:any) => {
              return <Comment id={comment.id} {...comment} loadComments={loadComments}/>
          })}
        </Container></>) : (<></>)
        }
    </>
  )
}

export default CommentList
