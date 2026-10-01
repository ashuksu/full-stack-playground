import http from 'node:http';
import path from 'node:path';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const PORT = process.env.SERVER_PORT || 4000;
const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';
const STREAMER_URL = process.env.STREAMER_URL || 'http://localhost:3001';

const app = express();

app.use(cors({ origin: [WEB_URL, STREAMER_URL] }));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [WEB_URL, STREAMER_URL],
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

io.on('connection', (socket) => {
  console.log(`[Socket] Connected: ${socket.id}`);
  io.emit('online:count', io.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log(`[Socket] Disconnected: ${socket.id}`);
    io.emit('online:count', io.engine.clientsCount);
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', onlineViewers: io.engine.clientsCount });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
