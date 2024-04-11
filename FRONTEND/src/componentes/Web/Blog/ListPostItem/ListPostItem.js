import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { ENV } from '../../../../utils';
import './ListPostItem.scss';

export function ListPostItem(props) {
  const { post } = props;
  const date = new Date(post.created_at);

  return (
    <Link className="list-post-item" to={`/blog/${post.path_blog}`}>
      <Image src={`${ENV.BASE_PATH}/${post.miniature_blog}`} fluid />
      <h2>{post.titulo_blog}</h2>
      <span>
        {DateTime.fromISO(date.toISOString())
          .setLocale('es')
          .toFormat("dd 'de' LLLL 'del' yyyy")}
      </span>
    </Link>
  );
}
