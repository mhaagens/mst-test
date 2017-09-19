module.exports = {
    "parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},
    "plugins": ["flowtype-errors"],
	"rules": {
        "flowtype-errors/show-errors": 2
    },
    "env": {
        "browser": true,
        "node": true
    }
};