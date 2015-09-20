module.exports = {
	port: 3000,
	sessionsSecretToken: 'Something strange-happens-here_this_summer_sometimes!!!!!////===++-',
	strings: {
		user: {
			registration: {
				success: 'You have registered successfully',
				unknownError: 'There are some errors, You have not registered succesfully!',
			},
			update: {
				success: 'User has been updated!',
				failure: 'User has\'t been updated!'
			},
			login: {
				success: 'User was logged In!',
				failure: 'User wasn\'t logged In!'
			},
			notObtained1: 'User wesn\'t obtained!',
			notObtainedN: 'Users weren\'t obtained!',
			notRemoved: 'User hasn\'t been removed successfully',
			removed: 'User removed successfully',
			invalidEmail: 'Invalid Email',
			invalidFname: 'Invalid First Name',
			invalidLname: 'Invalid Last Name',
			invalidImage: 'Invalid Image',
			invalidPassword: 'Invalid Password',
			invalidConfirmPasswod: 'Invalid Confirm Password field'
		},
		project: {
			create: {
				success: 'Project was created!',
				failure: 'Project wasn\'t created!'
			},
			update: {
				success: 'Project was updated!',
				failure: 'Project wasn\'t updated!'
			},
			remove: {
				success: 'Project was removed!',
				failure: 'Project wasn\'t removed!'
			},
			notObtained1: 'Project wasn\'t obtained!',
			notObtainedN: 'Projects weren\'t obtained!'
		},
		ticket: {
			create: {
				success: 'Ticket was created!',
				failure: 'Ticket wasn\'t created!'
			},
			update: {
				success: 'Ticket was updated!',
				failure: 'Ticket wasn\'t updated!'
			},
			remove: {
				success: 'Ticket was removed!',
				failure: 'Ticket wasn\'t removed!'
			},
			notObtained1: 'Ticket wasn\'t obtained!',
			notObtainedN: 'Tickets weren\'t obtained!',
			emptySettings: 'Settings is empty'
		}
	}
};