const style = {
  error: {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
}

const Error = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div style={style.error}>
      {error}
    </div>
  )
}

export default Error;