import React, { useState, useEffect } from 'react';
import { map } from 'lodash';
import { Loader, Pagination } from 'semantic-ui-react';
import { apiBlog } from '../../../../api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ListPostItem } from '../../../../componentes/Web/Blog';
import './ListPosts.scss';

const postController = new apiBlog();

export function ListPosts() {
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPosts(page, 4);
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
  }, [page]);

  if (!posts) return <Loader active inline="centered" />;

  const changePage = (_, data) => {
    const newPage = data.activePage;
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    //renderizar los posts
    <div className="list-posts-web">
      <div className="list">
        {map(posts, (post) => (
          <div key={post._id} className="item">
            <ListPostItem post={post} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
