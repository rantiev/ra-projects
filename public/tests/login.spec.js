describe('login test', function() {

	beforeEach(function(){
		browser.get('http://localhost:3000');
	});

	it('user should see login form', function() {
		expect(element(by.css('#raFormInputEmail')).isPresent()).toEqual(true);
		expect(element(by.css('#raFormInputPassword')).isPresent()).toEqual(true);
		expect(element(by.css('[type="submit"]')).isPresent()).toEqual(true);
	});

	it('user should see projects page after login', function() {
		var emailField = element(by.css('#raFormInputEmail'));
		var passField = element(by.css('#raFormInputPassword'));
		var submit = element(by.css('[type="submit"]'));

		emailField.sendKeys('admin@gmail.com');
		passField.sendKeys('123123123');

		submit.click();

		/*return browser.driver.wait(function() {
			return browser.driver.getCurrentUrl().then(function(url) {
				return /projects/.test(url);
			});
		}, 10000);*/

		expect(element(by.css('.navbar-nav a[href="/logout"]')).getText()).toEqual('Logout');

	});

	it('user should see login form after logout', function() {
		element(by.css('.navbar-nav a[href="/logout"]')).click();
		expect(element(by.css('#raFormInputEmail')).isPresent()).toEqual(true);
		expect(element(by.css('#raFormInputPassword')).isPresent()).toEqual(true);
		expect(element(by.css('[type="submit"]')).isPresent()).toEqual(true);
	});
});

describe('registration test', function() {

	beforeEach(function(){
		browser.get('http://localhost:3000/#/registration');
	});

	it('user should see registration form', function() {
		expect(element(by.model('raFormInputImage')).isPresent()).toEqual(true);
		expect(element(by.model('raFormInputEmail')).isPresent()).toEqual(true);
		expect(element(by.model('raFormInputFirstName')).isPresent()).toEqual(true);
		expect(element(by.model('raFormInputLastName')).isPresent()).toEqual(true);
		expect(element(by.model('raFormInputPassword')).isPresent()).toEqual(true);
		expect(element(by.model('raFormInputPasswordConfirm')).isPresent()).toEqual(true);
		expect(element(by.model('raFormInputRememberMe')).isPresent()).toEqual(true);
		expect(element(by.css('[type="submit"]')).isPresent()).toEqual(true);
	});

});