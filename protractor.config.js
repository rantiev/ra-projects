exports.config = {
	framework: 'jasmine2',
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	specs: ['./public/tests/*.spec.js']
}