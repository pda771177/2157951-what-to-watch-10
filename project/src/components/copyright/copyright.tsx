type CopyrightProps = {
  text?: string
};

function Copyright({text}: CopyrightProps): JSX.Element {

  return (
    <div className="copyright">
      <p>{text}</p>
    </div>
  );
}
Copyright.defaultProps = {text: '© 2019 What to watch Ltd.'};

export default Copyright;
