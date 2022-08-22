import CSS from 'csstype'

function LoadingScreen(): JSX.Element {
  const style:CSS.Properties  = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000',
    opacity:0.5
  }

  return (
    <div style={style}>
      <p>Loading ...</p>
    </div>
  );
}

export default LoadingScreen;

