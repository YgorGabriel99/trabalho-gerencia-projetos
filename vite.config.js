import express from 'express';
import http from "http";
import url from "url";
import path from "path";
import { Server } from "socket.io";
import { createServer as createViteServer } from 'vite';

async function createServer() {
    const app = express()
    // Create Vite server in middleware mode
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom', // don't include Vite's default HTML handling middlewares,
    })
    // Use vite's connect instance as middleware
    app.use(vite.middlewares)

    
    
}

createServer()
