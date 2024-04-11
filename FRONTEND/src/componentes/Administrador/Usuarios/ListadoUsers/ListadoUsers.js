import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { apiUsers } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ElementoUsers } from '../ElementoUsers';

const userController = new apiUsers();

export function ListadoUsers(props) {
  const { usersActive, reload, onReload } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);

        const response = await userController.getUsers(
          accessToken,
          usersActive
        );
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [usersActive, reload]);

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) return 'No hay ningun usuario';

  return map(users, (user) => (
    <ElementoUsers key={user._id} user={user} onReload={onReload} />
  ));
}
