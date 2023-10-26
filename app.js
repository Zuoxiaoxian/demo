// i18n
function myi18n(fun, defaultlng = "") {
	let lng = "";
	if (defaultlng === "") {
		lng = get_lng();
	} else {
		lng = defaultlng;
	}
	// header - footer - toast
	i18nextInstance.loadLanguages("", (err, t) => {
		// header
		const menuList = i18nextInstance.t("header.menuList", {
			returnObjects: true,
			lng: `${lng}`,
		});
		menuList.forEach((value, index) => {
			$(".nav-item a .menu-item-title").eq(index).text(value);
		});

		const login = i18nextInstance.t("header.login", {
			returnObjects: true,
			lng: `${lng}`,
		});
		$("#loginModal .modal-header h1").text(login.title);
		$("#loginModal .modal-body form .col-form-label").text(login.subtitle);
		$("#loginModal .modal-footer button").text(login.button);
		$("#loginModal .modal-body .username_prefix input").attr(
			"placeholder",
			login.placeholder
		);

		// header > toast
		const header_toast = i18nextInstance.t("header.toast", {
			returnObjects: true,
			lng: `${lng}`,
		});
		toast = header_toast;

		// footer
		const footer = i18nextInstance.t("footer", {
			returnObjects: true,
			lng: `${lng}`,
		});
		footer.footerList.forEach((value, index) => {
			$("footer span").eq(index).text(value);
		});
	});
	if (defaultlng !== "") {
	}
	fun();
}

$(()=>{
    "use strict"
    let root = document.body

    // 路由前缀
    m.route.prefix = "";

    // 路由
    m.route(root, "/demo", {
        "/demo": {
            render: function() {
                return m(Layout, {myi18n}, m(Index))
            },
        },
        "/about": {
            render: function() {
                return m(Layout, {myi18n}, m(About))
            },
        },
        "/category": {
            render: function() {
                return m(Layout, {myi18n}, m(Category))
            },
        },
    }) 
})