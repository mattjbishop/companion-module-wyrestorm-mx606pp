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
    ]}
}