import { Container, Typography } from '@mui/material'
import Comment from './Comment'

interface CommentListProps{
    comments: Array<Object>
    loadComments: () => Promise<void>,
    title: string
}

const CommentList:React.FC<CommentListProps> = ({
    comments,
    loadComments,
    title
}) => {

  return (
    <>
      {comments.length > 0 ? (<>
        <Typography
          sx={{marginTop: 2}}
          variant='h5'
        >
          {title}
        </Typography>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {comments.map((comment:any) => {
              return <Comment id={comment.id} key={comment.id} {...comment} loadComments={loadComments}/>
          })}
        </Container></>) : (<></>)
        }
    </>
  )
}

export default CommentList
