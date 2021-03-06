/* eslint-disable no-console */
import { Server as server } from 'http';
const DEV = process.env.NODE_ENV === 'development';

export default function serve(fn, { onError = null } = {}) {
    return server((req, res) => {
        run(req, res, fn, onError || sendError);
    });
}

export async function run(req, res, fn, onError) {
    try {
        await fn(req, res);
    } catch (err) {
        await onError(req, res, err);
    }
}

export function send(res, code, obj = null) {
    res.statusCode = code;
    if (obj === null) {
        return res.end();
    }

    let str;
    if (typeof obj === 'object') {
        if (DEV) {
            str = JSON.stringify(obj, null, 2);
        } else {
            str = JSON.stringify(obj);
        }
        res.setHeader('Content-Type', 'application/json');
    } else {
        str = obj;
    }
    res.setHeader('Content-Length', Buffer.byteLength(str));
    res.end(str);
}

export function sendError(req, res, { statusCode, message, code, stack, payload }) {
    if (statusCode) {
        send(res, statusCode, DEV ? stack : (code ? { message, code } : message));
    } else {
        send(res, 500, DEV ? stack : (code ? { message: 'Internal Server Error', code } : 'Internal Server Error'));
    }
    console.error(`\u001b[31m${req.url}\u001b[39m ${statusCode} ${code} ${message}`);
    if (payload) {
        console.error(JSON.stringify(payload, null, 2));
    }
    console.error(stack);
}
