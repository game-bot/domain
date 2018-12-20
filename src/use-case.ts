// const debug = require('debug')('gamebot:domain');

export abstract class UseCase<DATA, RESULT, OPTIONS> {

    async execute(data: DATA, options?: OPTIONS): Promise<RESULT> {
        // const name = this.constructor.name;
        // debug(`start executing of use case ${name}`);

        const idata = await this.initData(data);
        const vdata = await this.validateData(idata);
        const result = await this.innerExecute(vdata, options);
        // debug(`end execution of use case ${name}`);
        
        return result;
    }

    protected initData(data: DATA): Promise<DATA> {
        return Promise.resolve(data);
    }

    protected validateData(data: DATA): Promise<DATA> {
        return Promise.resolve(data);
    }

    protected abstract innerExecute(data: DATA, options?: OPTIONS): Promise<RESULT>
}