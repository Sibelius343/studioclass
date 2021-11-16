const UserComments = ({ userData }) => {
  if (!userData) return null;

  const user = userData.getUser;

  return (
    <>
      <h2>
        {user.username}
      </h2>
      <h3>
        Joined: {user.dateJoined}
      </h3>
      <ul>
        {user.comments.map(c => (
          <li key={c.id}>
            {c.content}
            <br />
            Posted about {c.tags.reduce((str, t) => {
              if (str === '') return t.content;
              return str + ', ' + t.content; 
            }, '')} 
            <br />
            For post {c.post.title} by {c.post.user.username}
            <br />
            On: {c.commentDate}
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserComments;