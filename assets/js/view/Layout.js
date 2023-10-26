const Layout = {
	oncreate: function (vnode) {
		vnode.attrs.myi18n(function () {});
	},
	view: (vnode) => {
		return m("main.layout", [
			m(HeaderComponent),
			m("section", { class: "contenter" }, vnode.children),
			m(FooterComponent),
		]);
	},
};