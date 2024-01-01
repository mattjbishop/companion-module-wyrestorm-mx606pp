const api = require('./api')

const CHANNEL_CHOICES = [
	{ id: '0', label: '1' },
	{ id: '1', label: '2' },
	{ id: '2', label: '3' },
	{ id: '3', label: '4' },
	{ id: '4', label: '5' },
	{ id: '5', label: '6' },
]

module.exports = function (self) {
	self.setActionDefinitions({  
		route: {
			name: 'Route',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 0,
					choices: CHANNEL_CHOICES,
				},
				{
					type: 'dropdown',
					label: 'Destination',
					id: 'destination',
					default: 0,
					choices: CHANNEL_CHOICES,
				},
			],
			callback: async (event) => {
				let cmd = 'cir ' + event.options.destination + event.options.source;
				self.log('debug','routing input ' + event.options.source + ' to output ' + event.options.destination + ' command is ' + cmd);
				api.sendCommand(self, cmd);
			},
		},

	})
}