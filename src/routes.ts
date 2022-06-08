import { Application } from 'express';

import users from './routes/UserRoute';
import files from './routes/FilRoute';

export const routes = (app: Application) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    app.use('/api/users',users);
    app.use('/api/files',files);

    app.use('*', async (req, res, next) => {
        res.status(404).json({ message: "Route not especified" });
    });
};