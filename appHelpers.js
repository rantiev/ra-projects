module.exports = {
	validation: {
		minMaxLength: function (m) {
			return [function (v) {
				return v.length >= 2 && v.length <= 50;
			}, m]
		},
		email: function (m) {
			return [function (v) {
				return /^\w+@[A-Za-z_]+\.[A-za-z]{2,6}$/.test(v) && v.length <= 60;
			}, m]
		},
		password: function (m) {
			return [function (v) {
				return v.length >= 6 && v.length <= 60;
			}, m]
		}
	}
};