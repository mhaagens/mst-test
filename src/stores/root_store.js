import { types } from "mobx-state-tree";

const RootStore = types.model("RootStore", {
	testVal: types.string
}).actions(self => ({
	updateTestVal(e) {
		self.testVal = e.target.value;
	}
}));

export default RootStore;