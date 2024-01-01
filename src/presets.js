const { combineRgb } = require('@companion-module/base');
const { MX_0606 } = require('./matrix');

module.exports = async function (self) {
	let presets = [];

    // ###################### Single Destinations ######################

    for (let dest = 0; dest < MX_0606; dest++) {
        
        presets.push({
            type: 'button',
            category: 'Set Destination',
            name: ' Set Destination ' + (dest+1),
            style: {
                text: 'Set Destination ' + (dest+1),
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'route',
                            options: {
                                source: 0,
                                destination: dest,
                            },
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: "routing_state",
                    options: {
                        source: 1,
                        destination: dest+1
                    },
                    style: {
                        bgcolor: combineRgb(0, 204, 102),
						color: combineRgb(0, 0, 0),
                    },
                }
            ]
        });

        // ###################### Single Destinations - Multistep ######################

        let actionSteps = [];
        for (let step = 0; step < MX_0606; step++) {
            actionSteps.push({
                down: [
                    {
                        actionId: 'route',
                        options: {
                            source: step,
                            destination: dest,
                        },
                    }
                ],
                up: []
            });
        }

        presets.push({
            type: 'button',
            category: 'Set Destination Multistep',
            name: ' Set Destination ' + (dest+1),
            style: {
                text: 'Dest ' + (dest+1) + '\\n$(mx-0606-pp:Destination_' + (dest+1) + ')',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0)
            },
            steps: actionSteps,
            feedbacks: []
        });
    }
  
    self.setPresetDefinitions(presets);

}