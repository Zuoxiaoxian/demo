let Cat = {
    list: [],
    loadList: function(url) {
        return m.request({
            method: "GET",
            url: url,
            withCredentials: true,
        })
        .then(function(result) {
            Cat.list = result.data
        })
    }
}