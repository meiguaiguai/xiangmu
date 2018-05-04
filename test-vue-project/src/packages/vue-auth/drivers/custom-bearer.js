/*eslint-disable*/
module.exports = {

    request: function (req, token) {
        let tokenHeader = {}
        tokenHeader[this.options.tokenName] = 'Bearer ' + token 
        this.options.http._setHeaders.call(this, req, tokenHeader)
    },

    response: function (res) {
        let headers = this.options.http._getHeaders.call(this, res)
        let token = headers[this.options.tokenName]

        if (token) {
            token = token.split(/Bearer\:?\s?/i)

            return token[token.length > 1 ? 1 : 0].trim()
        }
    }
}
