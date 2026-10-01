import http from 'node:http';
import path from 'node:path';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';
import { AccessToken } from 'livekit-server-sdk';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const PORT = process.env.SERVER_PORT || 4000;
const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';
const STREAMER_URL = process.env.STREAMER_URL || 'http://localhost:3001';

const allowedOrigins = [WEB_URL, STREAMER_URL];

interface ServerToClientEvents {
  'online:count': (count: number) => void;
}

const app = express();

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const server = http.createServer(app);

const io = new Server<{}, ServerToClientEvents>(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

let broadcastTimer: NodeJS.Timeout | null = null;

const broadcastOnlineCount = (): void => {
  if (broadcastTimer) return;
  broadcastTimer = setTimeout(() => {
    io.emit('online:count', io.engine.clientsCount);
    broadcastTimer = null;
  }, 300);
};

io.on('connection', (socket) => {
  console.log(`[Socket] Connected: ${socket.id}`);
  broadcastOnlineCount();

  socket.on('disconnect', () => {
    console.log(`[Socket] Disconnected: ${socket.id}`);
    broadcastOnlineCount();
  });
});

app.get('/api/livekit/token', async (req, res) => {
  const room = (req.query.room as string) || 'main-room';
  const username = (req.query.username as string) || `user-${Math.floor(Math.random() * 1000)}`;

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    res.status(500).json({ error: 'LiveKit API keys are missing in .env' });
    return;
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username });
  at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true });

  const token = await at.toJwt();
  res.json({ token, room, username });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', onlineViewers: io.engine.clientsCount });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
