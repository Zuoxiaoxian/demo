// Cat 
const CatComponent = {
    oninit: function(vnode){
        Cat.loadList("http://127.0.0.1/api/cats")
    },
    view: (vnode) => {
        return m(
            "div",
            {
                class: "list-group"
            },
            Cat.list.map((cat, index)=>{
                return m(
                    "li",
                    {
                        class: "list-group-item"
                    },
                    cat.birth + ": " + cat.name
                )
            })
            
        )
    }
}

const Index = {
    view: (vnode) => {
        const index_html = i18nextInstance.t("index", {
			returnObjects: true,
			lng: `${get_lng()}`,
		});
        return [
            m("h1", index_html.h1),
            m(LazyImage, {
                src:null,
                style: {
                    width: "64px",
                    borderRadius: "10px",
                },
                name: "",
            }),
            m(CatComponent)
        ]
    }
}