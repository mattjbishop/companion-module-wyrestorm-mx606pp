const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		let self = this;

		return [
        {
            type: 'textinput',
            id: 'host',
            label: 'Target IP',
            width: 8,
            regex: Regex.IP,
        },
        {
            type: 'textinput',
            id: 'port',
            label: 'Target Port',
            width: 4,
            default: 23,
            regex: Regex.PORT,
        },
        {
            type: 'static-text',
            id: 'intervalInfo',
            width: 12,
            label: 'Update Interval',
            value: 'Please enter the amount of time in milliseconds to poll the matrix for status. Set to 0 to disable.',
        },
        {
            type: 'textinput',
            id: 'interval',
            label: 'Update Interval',
            width: 3,
            default: 5000
        },
    ]}
}