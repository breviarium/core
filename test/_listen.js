import brevis from '../lib';

export default async (fn, options) => {
    const server = brevis(fn, options);
    return new Promise((resolve, reject) => {
        server.listen((err) => {
            if (err) {
                return reject(err);
            }
            const { port } = server.address();
            resolve(`http://localhost:${port}`);
        });
    });
};
