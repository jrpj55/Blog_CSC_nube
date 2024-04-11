import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { apiComentarios } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ElementosComentario } from '../ElementosComentario';
import './ListadoComentario.scss';

const ComentaController = new apiComentarios();

export function ListadoComentario() {
  const [comments, setComments] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const { accessToken } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await ComentaController.getComentarios(
          accessToken,
          page
        );

        setComments(response.docs);
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

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  //Si comentarios no tiene contenido
  if (!comments) return <Loader active inline="centered" />;
  if (size(comments) === 0) return 'No hay comentarios Registrados';

  return (
    <div className="list-emails">
      {map(comments, (TablaComentarios) => (
        <ElementosComentario
          key={TablaComentarios._id}
          TablaComentarios={TablaComentarios}
          onReload={onReload}
        />
      ))}

      <div className="list-emails__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={false}
          firstItem={false}
          lastItem={false}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
