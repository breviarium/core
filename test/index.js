import test from 'ava';
import listen from './_listen';
import request from 'request-promise';
import { send } from '../lib';

test('send(200, <String>)', async (t) => {
    const fn = async (req, res) => {
            send(res, 200, 'w00t');
        },
        url = await listen(fn),
        res = await request(url);
    t.deepEqual(res, 'w00t');
});
