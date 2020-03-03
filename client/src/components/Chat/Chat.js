import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { __esModule } from 'react-router-dom/cjs/react-router-dom.min';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = `localhost:5000`;

  useEffect(() => {
    // location comes from react router (we get URL back)
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    //
    socket.emit('join', { name, room }, ({ error }) => {
      console.log(error);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
