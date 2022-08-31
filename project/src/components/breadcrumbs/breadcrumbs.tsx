import React from 'react';

type PathItem = {
  title: string,
  path: string
}

type BreadcrumbsProps = {
  pathItems: PathItem[]
};


function Breadcrumbs({pathItems}: BreadcrumbsProps): JSX.Element {

  const result = pathItems.map(({title, path}, index) => (
    <li className="breadcrumbs__item" key={title}>
      {index === pathItems.length - 1 && pathItems.length > 1 ? <a className="breadcrumbs__link">{title}</a> :
        <a href={path} className="breadcrumbs__link">{title}</a>}
    </li>
  ));

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {result}
      </ul>
    </nav>
  );
}

Breadcrumbs.defaultProps = {pathItems: [{title: 'Home', path: '/'}]};

export default Breadcrumbs;
