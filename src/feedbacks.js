const { combineRgb } = require('@companion-module/base');
const { MX_0606 } = require('./matrix');

module.exports = async function (self) {
	let feedbacks = {};

    feedbacks.routing_state = {
        name: 'Routing State',
        type: 'boolean',
        label: 'Routing State',
        description: 'Indicate if the route is active',
        defaultStyle: {
            bgcolor: combineRgb(0, 204, 102), // Green
            color: combineRgb(0, 0, 0), // Black
        },
        options: [
            {
                id: 'source',
                type: 'number',
                label: 'Source',
                default: 1,
                min: 1,
                max: MX_0606,
            },
            {
                id: 'destination',
                type: 'number',
                label: 'Destination',
                default: 1,
                min: 1,
                max: MX_0606,
            },
        ],
        callback: (feedback) => {
            let opt = feedback.options;
            self.log('debug', 'routing_state updating ')
           
            if (opt.source === self.routingTable[opt.destination-1]) {
                return true
            } else {
                return false
            }
        },
    }

    self.setFeedbackDefinitions(feedbacks);
}