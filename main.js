const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')
const UpdateActions = require('./src/actions')
const UpdateConfigFields = require('./src/config')
const UpdateFeedbacks = require('./src/feedbacks')
const UpdateVariableDefinitions = require('./src/variables')

const api = require('./src/api')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
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
	}

	async configUpdated(config) {
		this.config = config;
		
		this.updateStatus(InstanceStatus.Connecting);

		this.updateActions(); // export actions
		this.updateFeedbacks(); // export feedbacks
		this.updateVariableDefinitions(); // export variable definitions

		this.initTCP();
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

	initTCP() {
		api.initTCP(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
