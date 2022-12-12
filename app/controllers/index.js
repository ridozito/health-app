'use strict';

const fs = require('fs')
const path = require('path')
const Router = require('koa-router');

module.exports = function initModules(app) {
    const modulesName = fs.readdirSync(__dirname)
    const modules = [];
    modulesName.map((modName) => {
        if ('index.js' === modName) return
        const mod = path.resolve(__dirname, `${modName}`)
        if (fs.lstatSync(mod).isDirectory())modules .push(mod);
    })
    const versions = []
    modules.map((mod) => {
        const router = require(`${mod}/router`);
        const routes = router.default;
        const baseUrl = router.baseUrl;
        const instance = new Router({ prefix: baseUrl })

        routes.map((config) => {
            const {
                method = '',
                route = '',
                handlers = []
            } = config;
            const lastHandler = handlers.pop();

            instance[method.toLowerCase()](route, ...handlers, async function (ctx) {
                return lastHandler(ctx);
            });

            app.use(instance.routes())
            app.use(instance.allowedMethods())
        })

    })
}