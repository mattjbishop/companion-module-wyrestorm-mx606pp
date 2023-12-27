const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {

    initTCP: function(self) {
        self.log('debug','initTCP called');
	
		if (self.socket !== undefined) {
			self.socket.destroy();
			delete self.socket;
		}
	
		if (self.config.host) {
			self.socket = new TCPHelper(self.config.host, self.config.port);
	
			self.socket.on('error', function (err) {
				module.exports.handleError(self, err);
			});
	
			self.socket.on('connect', function () {
				self.updateStatus(InstanceStatus.Ok);
				self.log('debug',"yes, we are Connected");
			});

			self.socket.on('data', function (d) {
				let oldHasData = self.has_data = true;
				let data = String(d);
				let msg;
	
				// Debug received packet
				self.log('debug','Packet received: ' + data);
			})
        } else {
			self.updateStatus(InstanceStatus.BadConfig)
		}
    },

    handleError: function(self, err) {
		let error = err.toString();
		let printedError = false;
	
		Object.keys(err).forEach(function(key) {
			if (key === 'code') {
				if (err[key] === 'ECONNREFUSED') {
					error = 'Unable to communicate with Device. Connection refused. Is this the right IP address?';
					self.log('error', error);
					self.updateStatus(InstanceStatus.ConnectionFailure);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
				else if (err[key] === 'ETIMEDOUT') {
					error = 'Unable to communicate with Device. Connection timed out. Is it still online?';
					self.log('error', error);
					self.updateStatus(InstanceStatus.ConnectionFailure);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
			}
		});
	
		if (!printedError) {
			self.updateStatus(InstanceStatus.ConnectionFailure);
			self.log('error', `Error: ${error}`);
		}	
	},

    sendCommand: function(self, cmd) {
		if (cmd !== undefined) {	
			/*
				* create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
				* sending a string assumes 'utf8' encoding
				* which then escapes character values over 0x7F
				* and destroys the 'binary' content
			*/
			const sendBuf = Buffer.from(cmd + '\n', 'latin1');

			self.log('debug','Sending: ' + cmd);
			if (self.socket !== undefined && self.socket.isConnected) {
				self.log('debug','sending to ' + self.config.host + ': ' + sendBuf.toString());
				self.socket.send(sendBuf);
			}
			else {
				self.log('debug','Socket not connected :(');
				module.exports.initTCP(self);
			}
		}
	}
}