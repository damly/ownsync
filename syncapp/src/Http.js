var http = {
    host: 'http://192.168.31.111:8083',
    token: '',
    defaultCallback:() => {},
    toForm: obj => {
        let form = new FormData();
        for ( let key in obj ) {
            form.append(key, obj[key]);
        }

        return form;
    },
    post: (api, params, success, fail = this.defaultCallback) => {
        let url = http.host + api;
        console.log('post', url);
        fetch(url, {
            method: 'POST',
            headers: {
                'token': http.token
            },
            body: http.toForm(params)
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(url, responseData);
                success(responseData)
            })
            .catch((error) => {
                fail(error)
            })
    }
};

module.exports = http;