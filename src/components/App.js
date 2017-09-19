import React from "react";
import { compose, mapProps } from "recompose";
import PropTypes from "prop-types";
import { types, getSnapshot, applySnapshot } from "mobx-state-tree";
import { inject, observer } from "mobx-react";
import { Route, Link, withRouter } from "react-router-dom";
import universal from "react-universal-component";
import Perimeter from "react-perimeter";
import DevTools from "mobx-react-devtools";
import { saveState } from "utils";

const Home = universal(
	props => import(/* webpackChunkName: "home" */ "components/Home"),
	{
		loading: () => null
	}
);

const state = types.model({
	testVal: types.string
}).actions(self => ({
	updateTestVal(e) {
		self.testVal = e.target.value
	}
})).create({
	testVal: "Hello from local component state"
});

const App = ({ state, store }) => {
	return (
		<div className="wrapper">
			<DevTools />
			<Perimeter onBreach={() => Home.preload()} padding={60}>
				<Link to="/test">Testroute</Link>
			</Perimeter>
			<input
				type="text"
				onChange={e => state.updateTestVal(e)}
				value={state.testVal}
			/>
			<input
				type="text"
				onChange={store.updateTestVal}
				value={store.testVal}
			/>
			<Route path="/test" component={Home} />
			<b>Local component state with MST:</b>
			<p>{state.testVal}</p>
			<b>Global store with MST:</b>
			<p>{store.testVal}</p>
		</div>
	);
};

export default compose(mapProps(() => ({ state: state })))(
	withRouter(inject("store")(observer(App)))
);

if (module.hot) {
	saveState(module, state);
}
