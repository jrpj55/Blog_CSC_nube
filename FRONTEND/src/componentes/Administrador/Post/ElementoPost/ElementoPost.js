import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { apiBlog } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { BasicModal } from '../../../ComponenteCompartido';
import { FormularioPost } from '../../../Administrador/Post';
import './ElementoPost.scss';

const blogController = new apiBlog();

export function ElementoPost(props) {
  const { post, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await blogController.deletePost(accessToken, post._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="post-item">
        <div className="post-item__info">
          <span className="post-item__info-title">{post.titulo_blog}</span>
          <span className="post-item__info-path">{post.path_blog}</span>
        </div>

        <div>
          <Button as={Link} icon to={`/blog/${post.path_blog}`} target="_blank">
            <Icon name="eye" />
          </Button>
          <Button icon primary onClick={onOpenCloseModal}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Editar Blog"
        size="large"
      >
        <FormularioPost
          onClose={onOpenCloseModal}
          onReload={onReload}
          post={post}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Eliminar ${post.titulo_blog}?`}
        size="mini"
      />
    </>
  );
}
