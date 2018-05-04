import $ajax from 'axios'

//404  400 200{101 102}
export default defaultGetData

function defaultGetData(config, params, headers) {
    if (!config.url) {
        console.error('require url')
        return false
    }
    if (!config.method) {
        console.error('require method')
        return false
    }
    return new Promise((resolve, reject) => {
        config.method = config.method.toUpperCase()
        let ajaxConfig = {
            method: config.method,
            url: config.url
        }
        if (params) {
            if (config.method !== 'GET') {
                ajaxConfig.data = params
            } else if (config.method === 'GET') {
                ajaxConfig.params = params
            }
        }
        if (headers) {
            ajaxConfig.headers = headers
        }
        $ajax(ajaxConfig)
            .then(res => {
                if (res.data.errorMessage) {
                    console.error(res.data.errorMessage)
                    res.data.statusCode = res.status
                    reject(res.data)
                    if (typeof this.options.errorFunction === "function") {
                        this.options.errorFunction(res)
                    }
                } else {
                    resolve(res.data)
                    if (typeof this.options.successFunction === "function") {
                        this.options.successFunction(res)
                    }
                }
            })
            .catch(error => {
                reject(error)
                if (typeof this.options.apiErrorFunction === "function") {
                    this.options.apiErrorFunction(error)
                }
            })
    })
}
