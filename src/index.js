require("viewport-units-buggyfill").init();
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { applySnapshot, getSnapshot } from "mobx-state-tree";
import { AppContainer } from "react-hot-loader";

import "styles/App";
import App from "components/App";
import RootStore from "stores/root_store";

const store = RootStore.create({
	testVal: "Hello from Root Store"
})

const renderApp = Component => {
	render(
		<AppContainer>
			<BrowserRouter>
				<Provider store={store}>
					<Component />
				</Provider>
			</BrowserRouter>
		</AppContainer>,
		document.getElementById("root")
	);
};

renderApp(App);

if (module.hot) {
	module.hot.accept(["components/App", "stores/root_store"], () => {
		renderApp(App);
	});

	if (module.hot.data && module.hot.data.store) {
		applySnapshot(store, module.hot.data.store);
	}
	module.hot.dispose(data => {
		data.store = getSnapshot(store);
	});
}
