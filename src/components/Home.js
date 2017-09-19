import React from "react";
import { inject, observer } from "mobx-react";

const Home = ({ store }) => <div className="page">
	<b>Home component:</b>
	<p>{store.testVal}</p>
</div>;

export default inject("store")(observer(Home));