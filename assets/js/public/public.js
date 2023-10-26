const MentList = [
	{
		name: "All",
		png_path: "/assets/img/all.png",
		href: "/online?game_strategy=All",
	},
	{
		name: "Action",
		png_path: "/assets/img/Action.png",
		href: "/online?game_strategy=Action",
	},
	{
		name: "Adventure",
		png_path: "/assets/img/Adventure.png",
		href: "#!/online?game_strategy=Adventure",
	},
	{
		name: "Relaxing",
		png_path: "/assets/img/Relaxing.png",
		href: "/online?game_strategy=Relaxing",
	},
	{
		name: "Puzzle",
		png_path: "/assets/img/Puzzle.png",
		href: "/online?game_strategy=Puzzle",
	},
	{
		name: "Racing",
		png_path: "/assets/img/Racing.png",
		href: "/online?game_strategy=Racing",
	},
	{
		name: "Shooter",
		png_path: "/assets/img/Shooter.png",
		href: "/online?game_strategy=Shooter",
	},
	{
		name: "Strategy",
		png_path: "/assets/img/Strategy.png",
		href: "/online?game_strategy=Strategy",
	},
];

const FooterList = [
	{
		name: "Home",
		img_src: "/assets/img/home.svg",
		// route: "a[href=/]",
		route: "/demo",
	},
	{
		name: "Category",
		img_src: "/assets/img/category.svg",
		// route: "a[href=/category?game_strategy=All]",
		route: "/category?game_strategy=All",
	},
	{
		name: "MY",
		img_src: "/assets/img/my.svg",
		// route: "a[href=/about]",
		route: "/about",
	},
];
// 画布
let bsOffcanvas;

// 加载插件
const i18nextInstance = i18next.use(i18nextHttpBackend);

i18nextInstance.init({
	lng: "en", // 设置默认语言
	resources: translations, // 使用缓存或者空对象
});

// --------------------------------
// 得到url参数
function getUrlParams(name) {
	// name：预期的字段
	let search = m.route.get();
	let obj = {};
	if (search === "" || search === undefined || !search.includes("?")) {
		return null;
	} else {
		let _searchs = search.split("?")[1].split("&");
		_searchs.forEach((item) => {
			obj[item.split("=")[0]] = item.split("=")[1];
		});
		if (obj.hasOwnProperty(name)) {
			return obj[name];
		} else {
			return null;
		}
	}
}

// 获取lng
function get_lng() {
	let lng = getUrlParams("lang");
	if (lng == null) {
		let local_lng = localStorage.getItem("lng");
		if (local_lng == null) {
			lng = "en";
		} else {
			lng = local_lng;
		}
	} else {
		localStorage.setItem("lng", lng);
	}
	return lng;
}

// --------------------------------
// local change language
const LocalChangeLanguge = {
	selectedLang: get_lng(), // 初始化语言
	langPng: `/assets/img/${get_lng()}.png`,

	// 处理选择语言
	selectLanguage: function (lang, ele, vnode) {
		LocalChangeLanguge.selectedLang = lang;
		LocalChangeLanguge.langPng = `/assets/img/${lang}.png`;
		localStorage.setItem("lng", lang);
		// 多语言切换-调用
		myi18n(() => {}, lang);
		// 切换
		$(".dropdown-item.active").removeClass("active");
		$(ele).addClass("active");
		$(".dropdown-toggle").text(lang);

		// 重新渲染特定组件 games
		let path = m.parsePathname(m.route.get()).path;
		// if (path === "/") {
		// 	m.mount(document.querySelector("#games"), GamesComponent);
		// 	m.mount(document.querySelector("#games2"), GamesComponent2);
		// } else if (path.includes("/detail")) {
		// 	m.mount(document.querySelector("#gamedetail"), GameDetail);
		// } else if (path.includes("/online")) {
		// 	m.mount(document.querySelector("#online"), {
		// 		view: function () {
		// 			return m(Online, { changlanguage: true });
		// 		},
		// 	});
		// }

		console.log("lang===>", LocalChangeLanguge.selectedLang);
	},
	oncreate: function () {
		$(".dropdown-item.active").removeClass("active");
		$(".dropdown-item").each((_, element) => {
			if ($(element).text() == get_lng()) {
				$(element).addClass("active");
				$(".dropdown-toggle").text(get_lng());
			}
		});
	},
	view: (vnode) =>
		m(".btn-group", [
			m(
				"button",
				{
					class: "btn dropdown-toggle",
					type: "button",
					"data-bs-toggle": "dropdown",
					"aria-expanded": "false",
					style: {
						backgroundImage: `url(${LocalChangeLanguge.langPng})`,
					},
				},
				LocalChangeLanguge.selectedLang
			),
			m("ul.dropdown-menu", [
				m(
					"li",
					m(
						"span.dropdown-item.active[data-lang=en]",
						{
							onclick: function () {
								LocalChangeLanguge.selectLanguage("en", this);
							},
						},
						"en"
					)
				),
				m("li", m("hr.dropdown-divider")),
				m(
					"li",
					m(
						"span.dropdown-item[data-lang=pl]",
						{
							onclick: function () {
								LocalChangeLanguge.selectLanguage("pl", this);
							},
						},
						"pl"
					)
				),
				m("li", m("hr.dropdown-divider")),
				m(
					"li",
					m(
						"span.dropdown-item[data-lang=ar]",
						{
							onclick: function () {
								LocalChangeLanguge.selectLanguage("ar", this);
							},
						},
						"ar"
					)
				),
			]),
			// m(LoginUser, {}),
		]),
};

// lazyimage
const LazyImage = {
	oncreate: () => {
		echo.init({
			offset: 100, // 0 表示图像在视口中可见时立即加载您的图像
			throttle: 250, // 延迟加载图片的时间间隔
		});
		echo.render(); // 初始化后立即加载在视口内的图片
	},
	view: (vnode) => {
		let src = "/assets/img/default_game.png";
		if (vnode.attrs.name == "new") {
			src = "/assets/img/news.webp";
		} else if (vnode.attrs.name == "banner") {
			src = "/assets/img/default_banner.webp";
		}
		return m("img.lazy.echo", {
			"data-echo": vnode.attrs.src,
			src: src,
			style: vnode.attrs.style,
			class: vnode.attrs.class,
		});
	},
};


// header Component
const HeaderComponent = {
	oncreate: function () {
		bsOffcanvas = new bootstrap.Offcanvas("#navbarSupportedContent");
	},
	view: function (vnode) {
		return m("header", [
			m("div", { class: "row fixed-top" }, [
				m(
					"div",
					{ class: "col-4" },
					m("nav", { class: "navbar" }, [
						m("div", { class: "container-fluid" }, [
							m(
								"button",
								{
									class: "navbar-toggler",
									type: "button",
									"data-bs-toggle": "offcanvas",
									"data-bs-target": "#navbarSupportedContent",
									"aria-controls": "navbarSupportedContent",
									"aria-expanded": "false",
									"aria-label": "Toggle navigation",
								},
								m("span", { class: "navbar-toggler-icon" })
							),
							m(
								"div",
								{
									class: "offcanvas offcanvas-start",
									id: "navbarSupportedContent",
									tabindex: "-1",
									"aria-labelledby": "offcanvasNavbarLabel",
								},
								[
									m("div", { class: "offcanvas-header" }, [
										m(
											"h5",
											{ class: "offcanvas-title" },
											""
										),
										m(
											"button",
											{
												class: "btn-close",
												type: "button",
												"data-bs-dismiss": "offcanvas",
												"aria-label": "Close",
											},
											""
										),
									]),
									m(
										"div",
										{ class: "offcanvas-body" },
										m(
											"ul",
											{
												class: "navbar-nav me-auto mb-2 mb-lg-0 list-group list-group-flush",
											},
											MentList.map(function (menu) {
												return m(
													"li",
													{
														class: "nav-item category-item list-group-item",
													},
													[
														m(
															`a[href=${menu.href}]`,
															{
																class: "nav-link active",
																oncreate:
																	m.route
																		.link,
																onclick:
																	function () {
																		$(
																			".navbar-nav .nav-link.category-item-active"
																		).removeClass(
																			"category-item-active"
																		);
																		$(
																			this
																		).addClass(
																			"category-item-active"
																		);
																		// 关闭画布
																		bsOffcanvas.hide();
																	},
															},
															m(
																"img",
																{
																	class: "rounded ",
																	src: menu.png_path,
																},
																null
															),
															m(
																"span",
																{
																	class: "menu-item-title",
																},
																menu.name
															),
															m(
																"img",
																{
																	class: "rounded chevron-right",
																	src: "/assets/img/chevron-right.svg",
																},
																null
															)
														),
													]
												);
											})
										)
									),
								]
							),
						]),
					])
				),
				m(
					"div",
					{ class: "col-4 text-center" },
					m(
						"a",
						{ href: "/" },
						m(
							"img",
							{
								class: "rounded logo",
								src: "/assets/img/logo.svg",
							},
							null
						)
					)
				),
				m(
					"div",
					{
						class: "col-4 text-center",
						style: { paddingLeft: "0px" },
					},
					[m(LocalChangeLanguge)]
				),
			]),

			// PubModal
			// m(PubModal, {}),
			// UnsubModal
			// m(UnsubModal, {}),
		]);
	},
};

// footer Component
const FooterComponent = {
	view: function (vnode) {
		return m("footer", [
			m(
				"div",
				{
					class: "row d-flex flex-wrap justify-content-between align-items-center py-2 fixed-bottom border-top",
				},
				FooterList.map((footer, index) => {
					return m(
						"div",
						{ class: "col-4 text-center align-items-center" },
						m(
							// footer.route,
							"div",
							{
								// oncreate: m.route.link,
								class: "footer-item",
								onclick: function () {
									console.log("footer--->",footer)
									m.route.set(footer.route);
								},
							},
							[
								m("img", { src: footer.img_src }),
								m("span", {}, footer.name),
							]
						)
					);
				})
			),
		]);
	},
};