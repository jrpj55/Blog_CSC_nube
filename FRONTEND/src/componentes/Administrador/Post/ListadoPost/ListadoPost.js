import React, { useState, useEffect } from 'react';
import { apiBlog } from '../../../../api';
import { Loader, Pagination } from 'semantic-ui-react';
import { map, size } from 'lodash';
import './ListadoPost.scss';
import { ElementoPost } from '../../../Administrador/Post';

const blogController = new apiBlog();

export function ListadoPost(props) {
  const { reload, onReload } = props;
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState(null);

  //Estado de la pagina donde estamos y hacia donde vamos
  const [page, setPage] = useState(1);

  //este useEffect se tiene que acTualizar cada vez que se cambie de página  }, [page]);
  useEffect(() => {
    (async () => {
      try {
        const response = await blogController.getPosts(page);
        setPosts(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload]);

  //función para cambiar pagina
  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!posts) return <Loader active inline="centered" />;
  if (size(posts) === 0) return 'No hay ningún Blog';

  return (
    <div className="list-post">
      {map(posts, (post) => (
        <ElementoPost key={post._id} post={post} onReload={onReload} />
      ))}
      {/*Aca añadimos La paginación*/}
      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
