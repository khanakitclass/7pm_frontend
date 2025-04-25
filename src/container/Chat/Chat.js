import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { CHAT_URL } from '../../utils/baseURL';

function Chat(props) {
  const socket = useMemo(() => io(CHAT_URL), []);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [to, setTo] = useState('');
  const [group, setGroup] = useState('');

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client connect at: ", socket.id);
    })

    socket.on("welcome", (msg) => {
      console.log(msg);
    })

    socket.on("receive_msg", (msg) => {
      console.log(msg);

      setMessages((prev) => [...prev, msg]);
    })
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
    socket.emit("message", { message, to });
  }

  const handleGroupSubmit = (event) => {
    event.preventDefault();

    socket.emit("join_group", group);

  }

  console.log(message);

  return (
    <div className="container-fluid contact py-5">
      <div className="container py-5">
        <div className="p-5 bg-light rounded">
          <div className="row g-4">
            <div className="col-12">
              <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                <h1 className="text-primary">Chat</h1>
                <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
              </div>
            </div>

            <form onSubmit={(event) => handleGroupSubmit(event)}>
              <input name='to' placeholder='Enter group name' onChange={(e) => setGroup(e.target.value)} />
              <input type="submit" />
            </form>

            <form onSubmit={(event) => handleSubmit(event)}>
              <input name='to' placeholder='Enter contact person' onChange={(e) => setTo(e.target.value)} />
              <input name="message" placeholder='Enter message' onChange={(e) => setMessage(e.target.value)} />

              <input type="submit" />
            </form>

            {
              messages?.map((m) => (
                <span>{m}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>

  );
}

export default Chat;