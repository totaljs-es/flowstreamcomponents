const tester = require('../tester');

// tester.autoClose = false; // Use "done" or "builder.done()" to manually end tester
// tester.autoCloseDuration = 5 * 1000; // 5 seconds

// tester.directory = './components';

tester(async function(builder, done) {
	// Pass filename as first argument otherwise filename of this file will be automatically assigned
	await builder.test('example-increment', async function(test, next) {

		// Output messages from component
		test.output = function(msg) {
			// msg - Message instance from flowstream
			// test.ok();
			// test.fail();
		};

		// Changing component status
		test.status = function(newStatus) {
			console.log('[LOG] Component\'s new status is' + newStatus);
		};

		// Reference to flow instance of component
		// test.instance 

		// Trigger component's trigger event
		test.trigger(1);

		// Change component's configuration
		test.configure({ increment: 5 });

		// Change component's configuration without triggering configure function
		test.configure({ increment: 5 }, true);

		// Any output based on input "number" will be flagged as success
		// Use "await" so test bellow wont interupt or modify configuration of this test
		await test.input('number');

		// Set config.increment to -10 and sends 10 into input "number". Output 0 is expected
		test.configure({ increment: -10 });

		test.input('number', 10, function(msg) {
			test.ok(msg.data === 0, '"-10 + 10 = 0"');

			// Resolve this test and go to next "builder.test"
			next();
		});

	});

	builder.test('counter', function(test) {
		setTimeout(() => {
			// Test was successful
			test.ok();

			// End tester and show results in console
			done();
		}, 1000);
	});

});