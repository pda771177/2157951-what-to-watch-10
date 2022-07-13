type UserBlockProps = {
  imgAvatarSrc?: string
};

function UserBlock({imgAvatarSrc}: UserBlockProps): JSX.Element {

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={imgAvatarSrc} alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link">Sign out</a>
      </li>
    </ul>
  );
}
UserBlock.defaultProps = {imgAvatarSrc: 'img/avatar.jpg'};

export default UserBlock;
