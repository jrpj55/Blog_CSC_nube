import React from 'react';
import { Container, Button } from 'semantic-ui-react';
//import { Menu } from '../../../api';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Icon } from '../../../assets';
import { socialData } from '../../../utils';
import './BarraSuperior.scss';

//const menuController = new Menu();

export function BarraSuperior() {
  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__left">
          <Link to="/" className="logo">
            <Icon.LogoWhite />
          </Link>
          <div className="menu">
            <a href="/">Home</a>
          </div>
          <div className="menu">
            <a href="/blog">Blog</a>
          </div>
        </div>
        <div>
          {map(socialData, (social) => (
            <Button
              key={social.type}
              as="a"
              target="_blank"
              href={social.link}
              color={social.type}
              icon={social.type}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
