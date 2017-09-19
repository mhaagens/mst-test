import { getSnapshot, applySnapshot } from "mobx-state-tree";

export const saveState = (module, store) => {
	if (module.hot.data && module.hot.data.store) {
		applySnapshot(store, module.hot.data.store);
	}
	module.hot.dispose(data => {
		data.store = getSnapshot(store);
	});
};
