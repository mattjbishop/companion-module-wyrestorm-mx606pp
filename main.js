const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')
const UpdateActions = require('./src/actions')
const UpdateConfigFields = require('./src/config')
const UpdateFeedbacks = require('./src/feedbacks')
const UpdatePresets = require('./src/presets')
const UpdateVariableDefinitions = require('./src/variables')

const api = require('./src/api')
const { MX_0606 } = require('./src/matrix')

class ModuleInstance extends InstanceBase {

	messageBuffer = Buffer.from('')

	constructor(internal) {
		super(internal)

		this.INTERVAL = null;
		this.routingTable = new Array(MX_0606);
	}

	async init(config) {
		this.configUpdated(config);
	}
	
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroying wyrestorm');

		if (this.socket !== undefined) {
			this.socket.destroy();
		}

		if (this.INTERVAL) {
			clearInterval(this.INTERVAL);
			this.INTERVAL = null;
		}
	}

	async configUpdated(config) {
		this.config = config;
		
		this.updateStatus(InstanceStatus.Connecting);

		this.updateActions(); // export actions
		this.updateFeedbacks(); // export feedbacks
		this.updateVariableDefinitions(); // export variable definitions
		this.updatePresets(); // export presets

		this.initTCP();
		this.setupInterval();
	}

	// Return config fields for web config
	getConfigFields() {
		return UpdateConfigFields.getConfigFields(this)
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}

	initTCP() {
		api.initTCP(this)
	}

	setupInterval() {
		api.setupInterval(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)